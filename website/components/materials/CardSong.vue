<template>
  <v-card @click="push">
    <v-img v-if="song.image" :src="thumbnailLink"></v-img>
    <v-card-title dir="rtl">
      <NuxtLink :to="to">
        <h2 class="text-right">{{ "آکورد " + song.title }}</h2>
      </NuxtLink>
    </v-card-title>
    <v-card-text dir="rtl">
      <div
        class="
          flex flex-col
          items-start
          justify-between
          h-32
          w-32
          md:w-40
          lg:w-48
          xl:w-48
        "
      >
        <div class="flex flex-wrap">
          <span v-for="(artist, i) in song.artists" :key="i">{{
            artist.name
          }}</span>
        </div>
        <div class="flex flex-wrap">
          <span v-for="(genre, i) in song.genres" :key="i">{{
            genre.title
          }}</span>
        </div>
      </div>
    </v-card-text>
    <!--<template #img>
      <div class="w-full w-56" :style="{ background: getRandomColor() }">
        <img v-if="song.image" :src="thumbnailLink" />
      </div>
    </template>-->
    <v-card-actions>
      <v-btn
        v-if="allowRemove"
        icon
        color="error"
        text
        @click="$emit('remove')"
      >
        <i class="bx bx-trash-alt"></i>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { fileProvider } from "@modular-rest/client";

export default {
  name: "card-song",
  props: {
    song: Object,
    allowRemove: Boolean,
    to: String,
  },
  computed: {
    thumbnailLink() {
      return fileProvider.getFileLink(this.song.image);
    },
  },
  methods: {
    getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    push() {
      if (this.to) this.$router.push(this.to);
    },
  },
};
</script>

<style lang="scss">
.card-song {
  /* width: 250px; */
  // margin: 10px;
}
</style>