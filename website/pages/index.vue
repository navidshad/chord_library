<template>
  <grid-songs :list="list" :title="$t('song.songs')" justify="center" />
</template>

<script>
import { dataProvider } from "@modular-rest/client";

export default {
  async asyncData({}) {
    const list = [];

    await dataProvider
      .find({
        database: "tab",
        collection: "song",
        query: {},
        populates: ["genres", { path: "artists", select: "name" }],
        options: { sort: "-_id" },
      })
      .then((docs) => list.concat(docs))
      .catch((err) => console.log(err));

    return {
      list,
    };
  },

  data() {},

  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
  },
};
</script>
