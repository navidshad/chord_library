<template>
  <grid-artists :list="list" :title="$t('artist.artists')" />
</template>

<script>
import { dataProvider } from "@modular-rest/client";

export default {
  async asyncData({}) {
    let list = [];

    await dataProvider
      .find({
        database: "tab",
        collection: "artist",
        query: {},
        options: { sort: "-_id" },
      })
      .then((docs) => (list = docs));

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
  methods: {},
};
</script>