<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center flex-row-reverse">
      <h2 class="text-lg">{{ $t('song.edit-song') }}</h2>
      <div class="flex">
        <vs-button :loading="pending" @click="update">{{
          $t('update')
        }}</vs-button>
        <vs-button transparent icon blank :href="'/tab/' + id">
          <i class="bx bx-desktop"></i>
        </vs-button>
      </div>
    </div>

    <chord-picker
      class="mt-4"
      :value="form.chords"
      @input="form.chords = $event"
    />

    <card class="p-4 mt-4 flex space-x-4">
      <chord-editor class="w-1/2 pt-10" v-model="form.content" />
      <div class="w-1/2 pr-4">
        <div>
          <vs-input
            class="mt-4"
            block
            :label="$t('song.title')"
            v-model="form.title"
          />
          <div class="flex justify-between w-full">
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
        </div>
        <tab-viewport class="mt-6" :content="form.content" />
      </div>
    </card>
  </div>
</template>

<script>
import { dataProvider } from '@modular-rest/client'
import notifier from '../../../utilities/notifier'

export default {
  middleware: ['auth'],
  async asyncData({ params, error }) {
    let data = await dataProvider
      .findOne({
        database: 'tab',
        collection: 'song',
        query: { _id: params.id },
      })
      .catch(({ error }) => null)

    if (data) {
      delete data._id
      return {
        form: data,
      }
    } else error("Song doesn't found")
  },
  data() {
    return {
      pending: false,
      form: {
        title: '',
        artists: [],
        genres: [],
        chords: {
          keySignature: '',
          list: [],
        },
        content: 'enter something',
      },
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
  },
  methods: {
    update() {
      this.pending = true
      dataProvider
        .updateOne({
          database: 'tab',
          collection: 'song',
          query: { _id: this.id },
          update: this.form,
        })
        // .then(() => this.$router.push('/admin/song'))
        .catch(({ error }) => {
          notifier.toast({
            label: 'Update song error',
            description: JSON.stringify(error),
            type: 'error',
          })
        })
        .finally(() => (this.pending = false))
    },
  },
}
</script>

<style>
</style>