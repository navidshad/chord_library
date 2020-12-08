<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center flex-row-reverse">
      <h2 class="text-lg">{{ $t('chord.chords') }}</h2>
      <vs-button to="/admin/chord/new">{{ $t('chord.new-chord') }}</vs-button>
    </div>

    <!-- Content -->
    <div class="mt-8 flex flex-wrap justify-between">
      <card-chord
        v-for="(chord, i) in list"
        allowRemove
        :key="i"
        :chord="chord"
        :to="'/admin/chord/' + chord._id"
        @remove="showRemoveDialog(chord)"
      />
    </div>
  </div>
</template>

<script>
import { dataProvider } from '@mres/web'
import notifier from '../../../utilities/notifier'

export default {
  name: 'Chords',
  middleware: ['auth'],
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
        database: 'chord',
        collection: 'song',
        query: {},
        populates: ['genres', { path: 'artists', select: 'name' }],
        options: {
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

    showRemoveDialog(chord) {
      let find = this.find
      let database = 'chord'
      let collection = 'chord'

      notifier.showAlertDialog({
        title: this.$t('database.remove-title'),
        description: this.$t('database.remove-question'),
        actions: ['yes', 'no'],
        onAction(label, action, close) {
          if (label == 'no') {
            close()
            return
          }
          action.pending = true
          dataProvider
            .removeOne({
              database: database,
              collection: collection,
              query: { _id: chord._id },
            })
            .then(find)
            .catch(({ error }) => {
              notifier.toast({
                label: `Update ${collection} error`,
                description: JSON.stringify(error),
                type: 'error',
              })
            })
            .finally(close)
        },
      })
    },
  },
}
</script>

<style>
</style>