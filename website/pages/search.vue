<template>
  <div class="flex flex-col items-center">
    <div class="flex">
      <vs-button
        icon
        @click="search"
        :disabled="!(phrase.length > 2)"
        :loading="pending"
      >
        <i class="bx bx-search"></i>
      </vs-button>
      <vs-input v-model="phrase" :placeholder="$t('search.label')"> </vs-input>
    </div>
    <grid-songs v-if="list.length" :list="list" title="" />
    <div v-else dir="rtl" class="mt-16 max-w-sm text-gray-600">
      {{ $t("search.help") }}
    </div>
  </div>
</template>

<script>
import { dataProvider } from "@modular-rest/client";

export default {
  data() {
    return {
      list: [],
      phrase: "",
      pending: false,
    };
  },

  methods: {
    async search() {
      if (!this.phrase.length) return;

      this.pending = true;

      await dataProvider
        .find({
          database: "tab",
          collection: "song",
          query: { $text: { $search: this.phrase } },
          populates: ["genres", { path: "artists", select: "name" }],
          options: { sort: "-_id" },
        })
        .then((docs) => (this.list = docs))
        .finally((_) => (this.pending = false));
    },
  },
};
</script>