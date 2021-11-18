<template>
  <div class="content-sidebar" style="flex-wrap: nowrap">
    <div class="col">
      <div class="row" style="margin-top: 2em">
        <div id="app">
          <div
            id="image-wrapper"
            :style="{ backgroundImage: `url(${this.image_url})` }"
            @mousedown="startDrawingBox"
            @mousemove="changeBox"
            @mouseup="stopDrawingBox"
          >
            <Box
              v-if="drawingBox.active"
              :b-width="drawingBox.width"
              :b-height="drawingBox.height"
              :b-top="drawingBox.top"
              :b-left="drawingBox.left"
            />
            <Box
              v-for="(box, i) in boxes"
              :key="i"
              :bTop="box.top"
              :bLeft="box.left"
              :bLabel="box.label"
              :bWidth="box.width"
              :bHeight="box.height"
              :bActive="i === activeBoxIndex"
              :on-select="makeBoxActive"
              :bIndex="i"
              :on-delete="removeBox"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="col">
      <ObjectLabelHeader />
      <ObjectLabelSidebar
        :boxes="boxes"
        :project="project"
        @onSave="onSave($event)"
        @onSkip="initState"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import ObjectLabelHeader from "pages/laberu/objectlabel/ObjectLabelHeader.vue";
import ObjectLabelSidebar from "pages/laberu/objectlabel/ObjectLabelSidebar.vue";
import Box from "components/Box.vue";
import { useRoute, useRouter } from "vue-router";
import { StateInterface, useStore } from "src/store";
import { useQuasar } from "quasar";
import { pick } from "lodash";
import { ExecException } from "child_process";
import { IProject } from "src/store/module-project/state";
import { IUser } from "src/store/module-users/state";
import { IImageData, ITaskImage } from "src/store/module-task-image/state";

interface Boxes {
  top: number;
  left: number;
  label: string;
  width: number;
  height: number;
}

const getCoursorLeft = (e: any) => {
  let vertical = 0;
  // if (window.innerWidth <= 1920 && window.innerWidth > 1600) vertical = 202;
  // else if (window.innerWidth <= 1600 && window.innerWidth > 1360)
  //   vertical = 218;
  // else if (window.innerWidth <= 1360 && window.innerWidth > 1250)
  //   vertical = 250 + (1360 - window.innerWidth) / 2;
  // else if (window.innerWidth <= 1250 && window.innerWidth > 1024)
  //   vertical = 200;
  // else if (window.innerWidth <= 1024 && window.innerWidth > 800) vertical = 320;

  return e.pageX - 55;
};

const getCoursorTop = (e: any) => {
  return e.pageY - 71;
};

export default defineComponent({
  components: { Box, ObjectLabelSidebar, ObjectLabelHeader },
  data: () => ({
    windowSize: window.innerHeight + "+" + window.innerWidth,
    windowWide: window.innerWidth,
    drawingBox: {
      active: false,
      top: 0,
      left: 0,
      height: 0,
      width: 0,
    },
    boxes: [] as Boxes[],
    activeBoxIndex: null,

    project: {},
    user: {},
    taskImage: {},
    imageData: {},
    image_url: ref<string>(),
    startedAt: new Date(),
  }),
  mounted() {
    this.project = computed(() =>
      this.$store.state.moduleProjects.projects.find(
        (project) => project._id == this.$route.query.project_id
      )
    );
    this.user = computed(() => this.$store.state.moduleAuth.user);

    this.initState();
  },
  methods: {
    async initState() {
      try {
        this.$q.loading.show();

        this.boxes = [];

        const resp = await this.$store.dispatch(
          "moduleTaskImage/getTaskImage",
          {
            user_id: (this.user as IUser)._id,
            project_id: (this.project as IProject)?._id,
          }
        );

        if (!resp) {
          this.$q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "Task image not avaliable for you",
          });
          this.$router.go(-1);
          return;
        }

        this.taskImage = computed(
          () => this.$store.state.moduleTaskImage.task_image
        );
        this.imageData = computed(
          () => this.$store.state.moduleTaskImage.image_data
        );

        this.startedAt = new Date();
        this.image_url = `${(this.project as IProject)?.base_image_url}/${
          (this.taskImage as ITaskImage).shortcode
        }.${(this.project as IProject)?.image_type}`;
      } catch (error) {
        throw new Error((error as ExecException).message);
      } finally {
        this.$q.loading.hide();
      }
    },
    async onSave(data: any) {
      const size = {
        width: (this.imageData as IImageData).labelling.width,
        height: (this.imageData as IImageData).labelling.height,
      };

      const result = data.map((x: any) => ({
        size,
        detection: x,
      }));

      const taskSuccess = ref({
        shortcode: (this.taskImage as ITaskImage).shortcode,
        result: {
          labelling: result,
        },
        task_id: (this.taskImage as ITaskImage)._id,
        user_id: (this.user as IUser)._id,
        project_id: (this.project as IProject)?._id,
        custom: {
          user_id: (this.user as IUser)._id,
          group_id: this.$route.query.group_id
            ? this.$route.query.group_id
            : null,
        },
        startedAt: this.startedAt,
      });

      try {
        this.$q.loading.show();
        await this.$store.dispatch(
          "moduleTaskSuccess/createTaskSuccess",
          taskSuccess.value
        );
        await this.initState();
      } catch (error) {
        console.log(error);
      } finally {
        this.$q.loading.hide();
      }
    },
    startDrawingBox(e: any) {
      this.drawingBox = {
        width: 0,
        height: 0,
        top: getCoursorTop(e),
        left: getCoursorLeft(e),
        active: true,
      };
    },
    changeBox(e: any) {
      if (this.drawingBox.active) {
        this.drawingBox = {
          ...this.drawingBox,
          width: getCoursorLeft(e) - this.drawingBox.left,
          height: getCoursorTop(e) - this.drawingBox.top,
        };
      }
    },
    stopDrawingBox() {
      if (this.drawingBox.active) {
        if (this.drawingBox.width > 5) {
          this.boxes.push({
            ...pick(this.drawingBox, ["width", "height", "top", "left"]),
          } as any);
        }
        this.drawingBox = {
          active: false,
          top: 0,
          left: 0,
          height: 0,
          width: 0,
        };
      }
    },
    makeBoxActive(i: any) {
      this.activeBoxIndex = i;
    },
    removeBox(i: any) {
      this.boxes = this.boxes.filter((elem, index) => {
        return index !== i;
      });
      this.activeBoxIndex = null;
    },
  },
});
</script>

<style lang="scss" scoped></style>
