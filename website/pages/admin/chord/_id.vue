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
    <card class="p-4 mt-4">
      <vs-input
        class="my-4"
        block
        :label="$t('chord.title')"
        v-model="form.title"
      />
      <div class="my-6 flex items-center flex-row-reverse">
        <select-artist
          block
          :label="$t('artist.artists')"
          v-model="form.artists"
        />
        <select-genre
          class="mr-4"
          block
          :label="$t('genre.genres')"
          v-model="form.genres"
        />
      </div>
      <chord-editor v-model="form.content" />
    </card>
  </div>
</template>

<script>
import { dataProvider } from '@mres/web'
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