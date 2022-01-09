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
    <grid-songs v-if="songs.length" :list="songs" title="" />
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
      songs: [],
      phrase: "",
      pending: false,
    };
  },

  methods: {
    async search() {
      if (!this.phrase.length) return;
      this.songs = [];

      this.pending = true;

      await dataProvider
        .find({
          database: "tab",
          collection: "song",
          query: { $text: { $search: this.phrase } },
          populates: ["genres", { path: "artists", select: "name" }],
          options: { sort: "-_id" },
        })
        .then((docs) => this.filterSearchResultSong(docs, this.phrase))
        .finally((_) => (this.pending = false));
    },

    addSong(song) {
      let isAdded = this.songs.findIndex((s) => s._id == song._id);
      if (isAdded == -1) this.songs.push(song);
    },

    filterSearchResultSong(docs = [], phrase = "") {
      for (let i = 0; i < docs.length; i++) {
        const song = docs[i];

        //
        // Search in title
        if (song.title.includes(phrase)) {
          this.addSong(song);
        }

        //
        // Search in artists
        // for (
        //   let artistIndex = 0;
        //   artistIndex < song.artists.length;
        //   artistIndex++
        // ) {
        //   const artist = song.artists[artistIndex];
        //   if (artist.name.includes(phrase)) {
        //     this.addSong(song);
        //   }
        // }

        //
        // Search in lyric
        for (
          let sectionIndex = 0;
          sectionIndex < song.sections.length;
          sectionIndex++
        ) {
          const section = song.sections[sectionIndex];

          // search line bye line
          for (
            let lineIndex = 0;
            lineIndex < section.lines.length;
            lineIndex++
          ) {
            const line = section.lines[lineIndex];
            if (line.text.includes(phrase)) {
              this.addSong(song);
            }
          }
        }
      }
    },
  },
};
</script>