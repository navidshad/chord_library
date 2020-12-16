<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center flex-row-reverse">
      <h2 class="text-lg">{{ song.title }}</h2>
    </div>
    
    <card class="p-4 mt-4">
      <div v-html="song.content" />
    </card>
  </div>
</template>

<script>
import { dataProvider } from '@modular-rest/client'

export default {
  async asyncData({ error, params }) {
    let song = await dataProvider
      .findOne({
        database: 'tab',
        collection: 'song',
        query: { _id: params.id },
        populates: ['artists', 'genres'],
      })
      .catch(() => null)

    if (song) {
      return { song }
    } else {
      error("This song dosen't found")
    }
  },
  computed: {
    id() {
      this.$route.params.id
    },
  },
  computed: {
    lines() {
        this.song.content.split('\n\n')
    }
  },
}
</script>

<style>
</style>