<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center flex-row-reverse">
      <h2 class="text-lg">{{ $t('chord.new-chord') }}</h2>
      <vs-button :loading="pending" @click="create">{{
        $t('create')
      }}</vs-button>
    </div>

    <card class="p-4 mt-4 flex flex-wrap">
      <div class="w-1/3 pr-4">
        <vs-input
          class="mt-4"
          block
          :label="$t('chord.title')"
          v-model="form.title"
        />
        <select-artist
          class="mt-6"
          block
          :label="$t('artist.artists')"
          v-model="form.artists"
        />
        <select-genre
          class="mt-6"
          block
          :label="$t('genre.genres')"
          v-model="form.genres"
        />
      </div>
      <chord-editor class="w-2/3" v-model="form.content" />
    </card>
  </div>
</template>

<script>
import { dataProvider } from '@modular-rest/client'
import notifier from '../../../utilities/notifier'

export default {
  middleware: ['auth'],
  data() {
    return {
      pending: false,
      form: {
        title: '',
        artists: [],
        genres: [],
        content: '',
      },
    }
  },
  methods: {
    create() {
      this.pending = true
      dataProvider
        .insertOne({
          database: 'chord',
          collection: 'song',
          doc: this.form,
        })
        .then((newSong) => this.$router.push('/admin/chord/' + newSong._id))
        .catch(({ error }) => {
          notifier.toast({
            label: 'Create chord error',
            description: JSON.stringify(error),
            typr: 'error',
          })
        })
        .finally(() => (this.pending = false))
    },
  },
}
</script>

<style>
</style>