<template>
  <vs-card class="card-song" @click="push">
    <template #title>
      <h2>{{ song.title }}</h2>
    </template>
    <template #text>
      <div class="flex justify-between">
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
    </template>
    <template #img>
      <img v-if="song.image" :src="thumbnailLink" />
      <div
        v-else
        class="w-full"
        :style="{ background: getRandomColor(), height: '200px' }"
      ></div>
    </template>
    <template #interactions>
      <vs-button
        v-if="allowRemove"
        icon
        danger
        tranparent
        @click="$emit('remove')"
      >
        <i class="bx bx-trash-alt"></i>
      </vs-button>
    </template>
  </vs-card>
</template>

<script>
import { fileProvider } from '@modular-rest/client'

export default {
  name: 'card-song',
  props: {
    song: Object,
    allowRemove: Boolean,
    to: String,
  },
  computed: {
    thumbnailLink() {
      return fileProvider.getFileLink(this.song.image.fileName)
    },
  },
  methods: {
    getRandomColor() {
      var letters = '0123456789ABCDEF'
      var color = '#'
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    },
    push() {
      if (this.to) this.$router.push(this.to)
    },
  },
}
</script>

<style>
.card-song {
  width: 250px;
  margin: 10px;
}
</style>