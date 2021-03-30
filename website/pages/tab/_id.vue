<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center flex-row-reverse mb-4">
      <h2 class="text-lg">{{ song.title }}</h2>
      <div dir="rtl">
        <h3 class="text-sm">{{ $t('song.rhythm') + ' ' + song.rhythm }}</h3>
        <h3 class="text-sm text-right">
          {{ $t('song.vocal-from') + ' ' }}
          <span dir="ltr">{{ vocalNote.note }}</span>
        </h3>
      </div>
    </div>

    <client-only placeholder="Loading transpose...">
      <Transpose
        :chords="song.chords"
        :sections="song.sections"
        @transposed="onReceivedTranspose"
      />

      <AutoScroll />
    </client-only>

    <card class="p-4 mt-4">
      <tabview :key="componentKey" :sections="transposedSections" />
    </card>
    <div class="empty"></div>
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
        vocalNote: song.chords.vocalNote,
      }
    } else {
      error("This song dosen't found")
    }
  },
  data() {
    return {
      transposedSections: [],
      componentKey: '',
      vocalNote: {},
    }
  },
  computed: {
    id() {
      this.$route.params.id
    },
  },
  methods: {
    onReceivedTranspose({ sections, vocalNote }) {
      this.transposedSections = sections
      this.componentKey = new Date().getUTCMilliseconds()
      this.vocalNote = vocalNote
    },
  },
}
</script>

<style scoped>
.empty{
  height: 50px;

}
</style>