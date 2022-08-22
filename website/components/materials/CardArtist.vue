<template>
  <v-card class="card-artist" @click="push">
    <v-img
      class="w-full"
      :style="{
        background: getRandomColor(),
        height: '250px',
        width: '250px',
      }"
      v-if="artist.image"
      :src="thumbnailLink"
    >
    </v-img>
    <v-card-title>
      <NuxtLink :to="to">
        <h2>{{ "آکورد های " + artist.name }}</h2>
      </NuxtLink>
    </v-card-title>
    <v-card-text>
      <div class="flex justify-between">
        <!-- <div class="flex flex-wrap">
          <span v-for="(artist, i) in artist.artists" :key="i">{{
            artist.name
          }}</span>
        </div> -->
        <!-- <div class="flex flex-wrap">
          <span v-for="(genre, i) in artist.genres" :key="i">{{
            genre.title
          }}</span>
        </div> -->
      </div>
    </v-card-text>
    <v-card-actions>
      <!-- <v-btn
        v-if="allowRemove"
        icon
        color="error"
        text
        @click="$emit('remove')"
      >
        <i class="bx bx-trash-alt"></i>
      </v-btn> -->
    </v-card-actions>
  </v-card>
</template>

<script>
import { fileProvider } from "@modular-rest/client";

export default {
  name: "card-artist",
  props: {
    artist: Object,
    allowRemove: Boolean,
    to: String,
  },
  computed: {
    thumbnailLink() {
      return fileProvider.getFileLink(this.artist.image);
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
.card-artist {
  /* width: 250px; */
  margin: 10px;

  .vs-card {
    background: none !important;
  }
}
</style>