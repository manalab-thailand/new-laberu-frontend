<template>
  <div class="content-sidebar" style="flex-wrap: nowrap">
    <div class="col">
      <div class="row" style="margin-top: 2em">
        <div id="app">
          <div
            :style="{
              height: `${imageSize.height}px`,
              width: `${imageSize.width}px`,
              'max-width': '64vw',
              position: 'relative',
            }"
            @mousedown="startDrawingBox"
            @mousemove="changeBox"
            @mouseup="stopDrawingBox"
          >
            <div
              :style="{
                backgroundImage: `url(${image_url})`,
                'background-repeat': 'no-repeat',
                'background-size': '100% 100%',
                position: 'relative',
                height: '100%',
              }"
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
    </div>
    <div class="col">
      <ObjectLabelSidebar
        :boxes="boxes"
        :project="project"
        :taskImage="taskImage"
        :imageData="imageData"
        :imageSize="imageSize"
        @onSave="onSave($event)"
        @onSkip="initState"
      />
    </div>
  </div>

  <q-dialog
    v-model="dialog"
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="bg-primary text-white">
      <q-card-section>
        <div class="text-h6">Alert</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Your screen is not up to our Platform standards. </q-card-section
      ><q-card-section class="q-pt-none flex-row justify-center cursor-pointer">
        <div @click="this.$router.go(-1)" class="fancy-link">
          Back to Home Page
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import ObjectLabelSidebar from "pages/laberu/objectlabel/ObjectLabelSidebar.vue";
import Box from "components/Box.vue";
import { pick } from "lodash";
import { ExecException } from "child_process";
import { IProject } from "src/store/module-project/state";
import { IUser } from "src/store/module-users/state";
import { IImageData, ITaskImage } from "src/store/module-task-image/state";
import moment from "moment";

interface Boxes {
  top: number;
  left: number;
  label: string;
  width: number;
  height: number;
}

const getCoursorLeft = (e: any) => {
  let vertical = 0;
  return e.pageX - 56;
};

const getCoursorTop = (e: any) => {
  return e.pageY - 78;
};

export default defineComponent({
  components: { Box, ObjectLabelSidebar },
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
    imageSize: {
      width: null as any,
      height: null as any,
    },
    project: {},
    user: {},
    taskImage: {},
    imageData: {},
    image_url: ref<string>(),
    startedAt: new Date(),
    dialog: ref(false),
    maximizedToggle: ref(true),
    intervalSession: ref(),
  }),
  mounted() {
    this.project = computed(() =>
      this.$store.state.moduleProjects.projects.find(
        (project) => project._id == this.$route.query.project_id
      )
    );
    this.user = computed(() => this.$store.state.moduleAuth.user);

    this.imageSize.width = computed(() =>
      (this.$q.screen.width * 0.64).toFixed(2)
    );
    this.imageSize.height = computed(() =>
      (this.$q.screen.height * 0.64).toFixed(2)
    );

    const screenSize = computed(() => this.$q.screen.width);

    watch(screenSize, (val) => {
      if (val < 1000) {
        this.dialog = true;
      } else {
        this.dialog = false;
      }
    });

    if (!this.screenValidation()) {
      this.dialog = true;
    } else {
      this.initState();
    }
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

        this.intervalSessionExpire();
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

      this.clearSessionExpire();

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
    screenValidation() {
      if (window.screen.width < 1000) {
        return false;
      }
      return true;
    },
    intervalSessionExpire() {
      const sessionExpire = moment().add("minute", 15);

      this.intervalSession = setInterval(() => {
        const diffSessionExpire = moment(sessionExpire).diff(
          moment(),
          "second"
        );
        if (diffSessionExpire <= 0) {
          clearInterval(this.intervalSession);
          this.$router.go(-1);
        }
      }, 1000 * 60 * 0.5);
    },
    clearSessionExpire() {
      clearInterval(this.intervalSession);
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
  beforeUnmount() {
    this.clearSessionExpire();
  },
});
</script>

<style lang="scss" scoped></style>
