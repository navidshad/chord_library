<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center flex-row-reverse">
      <h2 class="text-lg">{{ $t('song.songs') }}</h2>
      <vs-button to="/admin/new-song">{{ $t('add') }}</vs-button>
    </div>

    <!-- Content -->
    <card class="p-8 mt-4">
      
    </card>
  </div>
</template>

<script>
import { dataProvider } from '@mres/web'
import notifier from '../../utilities/notifier'

export default {
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
    showAddForm() {},
    showEditForm(row) {},
    showRemoveDialog(row) {
      let find = this.find
      let database = this.database
      let collection = this.collection

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
              query: { _id: row._id },
            })
            .then(find)
            .catch((result) => {
              notifier.toast({
                label: `Update ${collection} error`,
                description: result.error,
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