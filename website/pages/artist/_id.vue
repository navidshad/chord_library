<template>
  <div>
    <grid-songs :list="list" :title="artist.name" />
  </div>
</template>

<script>
import { dataProvider } from "@modular-rest/client";

export default {
  async asyncData({ params }) {
    let list = [];
    let artistId = params.id;

    let artist = await dataProvider.findOne({
      database: "tab",
      collection: "artist",
      query: { _id: artistId },
    });

    await dataProvider
      .find({
        database: "tab",
        collection: "song",
        query: { artists: { $all: [artistId] } },
        populates: ["genres", { path: "artists", select: "name" }],
        options: { sort: "-_id" },
      })
      .then((docs) => (list = docs));

    return {
      list,
      artistId,
      artist,
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