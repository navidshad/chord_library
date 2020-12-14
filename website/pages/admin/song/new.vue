<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center flex-row-reverse">
      <h2 class="text-lg">{{ $t('song.new-song') }}</h2>
      <vs-button :loading="pending" @click="create">{{
        $t('create')
      }}</vs-button>
    </div>

    <chord-picker class="mt-4"></chord-picker>

    <card class="p-4 mt-4 flex flex-wrap">
      <div class="w-full lg:w-1/3 lg:pr-4">
        <vs-input
          class="mt-4"
          block
          :label="$t('song.title')"
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
      <chord-editor class="w-full mt-4 lg:w-2/3 lg:mt-0" v-model="form.content" />
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
          database: 'tab',
          collection: 'song',
          doc: this.form,
        })
        .then((newSong) => this.$router.push('/admin/song/' + newSong._id))
        .catch(({ error }) => {
          notifier.toast({
            label: 'Create song error',
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