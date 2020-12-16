<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center flex-row-reverse">
      <h2 class="text-lg">{{ $t('song.songs') }}</h2>
    </div>

    <!-- Content -->
    <div class="mt-8 flex flex-wrap justify-between">
      <card-song
        v-for="(song, i) in list"
        :key="i"
        :song="song"
        :to="'/tab/' + song._id"
      />
    </div>
  </div>
</template>

<script>
import { dataProvider } from '@modular-rest/client'

export default {
  name: 'GridSongs',

  props: {
    query: Object,
    queryOption: Object,
  },
  data() {
    return {
      list: [],
      pending: false,
    }
  },

  created() {
    this.find()
  },

  computed: {
    findOption() {
      return {
        database: 'tab',
        collection: 'song',
        query: this.query || {},
        populates: ['genres', { path: 'artists', select: 'name' }],
        options: this.queryOption || {
          sort: '-_id',
        },
      }
    },
  },

  methods: {
    find() {
      this.pending = true
      dataProvider
        .find(this.findOption)
        .then((list) => (this.list = list))
        .finally(() => (this.pending = false))
    },
  },
}
</script>

<style>

</style>