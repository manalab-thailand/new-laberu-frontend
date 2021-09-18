<template>
  <div class="history-sidebar">
    <q-list dense bordered padding class="rounded-borders">
      <q-item>
        <q-item-section>
          <q-item-label overline>History</q-item-label>
        </q-item-section>
      </q-item>
      <log-list
        v-for="(listItem, index) in logItems"
        :key="index"
        :item="listItem"
        :style="{ backgroundColor: randomColor(listItem.id) }"
      />
    </q-list>
  </div>
</template>

<script>
import logList from "components/log-list.vue";
export default {
  components: {
    logList,
  },
  data: () => ({
    logItems: [
      {
        id: 0,
        short_code: "session-1605786693-11109",
        date: "22/12/2021",
      },
      {
        id: 1,
        short_code: "session-1605786693-11109",
        date: "22/12/2021",
      },
      {
        id: 2,
        short_code: "session-1605786693-11109",
        date: "22/12/2021",
      },
      {
        id: 3,
        short_code: "session-1605786693-11109",
        date: "22/12/2021",
      },
      {
        id: 4,
        short_code: "session-1605786693-11109",
        date: "22/12/2021",
      },
    ],
    colorCache: {},
  }),
  methods: {
    randomColor(id) {
      const r = () => Math.floor(256 * Math.random());

      return (
        this.colorCache[id] ||
        (this.colorCache[id] = `rgb(${r()}, ${r()}, ${r()})`)
      );
    },
  },
};
</script>

<style scoped></style>
