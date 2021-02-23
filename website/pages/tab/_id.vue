<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center flex-row-reverse mb-4">
      <h2 class="text-lg">{{ song.title }}</h2>
      <h3 class="text-sm">{{ $t('song.rhythm') + ' ' + song.rhythm }}</h3>
    </div>

    <client-only placeholder="Loading transpose...">
      <Transpose
        :chords="song.chords"
        :sections="song.sections"
        @transposed="onReceivedTranspose"
      />
    </client-only>

    <card class="p-4 mt-4">
      <tabview :key="componentKey" :sections="transposedSections" />
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
        transposedSections: song.sections,
      }
    } else {
      error("This song dosen't found")
    }
  },
  data() {
    return {
      transposedSections: [],
      componentKey: '',
    }
  },
  computed: {
    id() {
      this.$route.params.id
    },
  },
  methods: {
    onReceivedTranspose(sections) {
      this.transposedSections = sections
      this.componentKey = new Date().getUTCMilliseconds()
    },
  },
}
</script>

<style>
</style>