<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center flex-row-reverse">
      <h2 class="text-lg">{{ $t('chord.edit-chord') }}</h2>
      <div class="flex">
        <vs-button :loading="pending" @click="update">{{
          $t('update')
        }}</vs-button>
        <vs-button transparent icon blank :href="'/chord/' + id">
          <i class="bx bx-desktop"></i>
        </vs-button>
      </div>
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
  async asyncData({ params, error }) {
    let data = await dataProvider
      .findOne({
        database: 'chord',
        collection: 'song',
        query: { _id: params.id },
      })
      .catch(({ error }) => null)

    if (data) {
      delete data._id
      return {
        form: data,
      }
    } else error("Chord doesn't found")
  },
  data() {
    return {
      pending: false,
      form: {
        title: '',
        artists: [],
        genres: [],
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
          database: 'chord',
          collection: 'song',
          query: { _id: this.id },
          update: this.form,
        })
        // .then(() => this.$router.push('/admin/chord'))
        .catch(({ error }) => {
          notifier.toast({
            label: 'Update chord error',
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