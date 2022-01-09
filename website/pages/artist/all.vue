<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center flex-row-reverse">
      <h2 class="text-lg">{{ $t('artist.artists') }}</h2>
    </div>

    <!-- Content -->
    <div class="mt-8 flex flex-wrap justify-between">
      <card-artist
        v-for="(artist, i) in list"
        :key="i"
        :artist="artist"
        :to="'/artist/' + artist._id"
      />
    </div>
  </div>
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