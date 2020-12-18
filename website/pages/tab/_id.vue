<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center flex-row-reverse">
      <h2 class="text-lg">{{ song.title }}</h2>
    </div>

    <client-only placeholder="Loading transpose...">
      <Transpose
        :chords="song.chords"
        :originalContent="song.content"
        @transposed="transposedContent = $event"
      />
    </client-only>

    <card class="p-4 mt-4">
      <div v-html="transposedContent" />
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
      return {
        song,
        transposedContent: song.content,
      }
    } else {
      error("This song dosen't found")
    }
  },
  data() {
    return {
      transposedContent: '',
    }
  },
  mounted() {},
  computed: {
    id() {
      this.$route.params.id
    },
  },
}
</script>

<style>
</style>