<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center flex-row-reverse">
      <h2 class="text-lg">{{ chord.title }}</h2>
    </div>
    
    <card class="p-4 mt-4">
      <div v-html="chord.content" />
    </card>
  </div>
</template>

<script>
import { dataProvider } from '@mres/web'

export default {
  async asyncData({ error, params }) {
    let chord = await dataProvider
      .findOne({
        database: 'chord',
        collection: 'song',
        query: { _id: params.id },
        populates: ['artists', 'genres'],
      })
      .catch(() => null)

    if (chord) {
      return { chord }
    } else {
      error("This chord dosen't found")
    }
  },
  computed: {
    id() {
      this.$route.params.id
    },
  },
  computed: {
    lines() {
        this.chord.content.split('\n\n')
    }
  },
}
</script>

<style>
</style>