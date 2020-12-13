<template>
  <div class="flex flex-col">
    <div class="lg:flex lg:space-x-5">
      <select-chord-type
        class="mt-6 lg:w-1/2"
        block
        :label="$t('chord.select-type')"
        v-model="form.type"
      />
      <select-chord-degree
        class="mt-6 lg:w-1/2"
        block
        :label="$t('chord.select-degree')"
        v-model="form.degree"
      />
    </div>

    <vs-table class="mt-6">
      <!-- THead -->
      <template slot="thead">
        <vs-tr>
          <vs-th v-for="(column, i) in columns" :key="i">
            {{ column }}
          </vs-th>
        </vs-tr>
      </template>

      <!-- TBody -->
      <template slot="tbody">
        <vs-tr v-for="(fieldsRow, rowIndex) in form.rows" :key="rowIndex">
          <vs-td v-for="(column, columnIndex) in columns" :key="columnIndex">
            <select-chord
              :list="chords"
              :pending="chordPending"
              v-model="form.rows[rowIndex][column]"
            />
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>

    <div class="mt-4">
      <vs-button v-if="!edit" @click="create">{{ $t('create') }}</vs-button>
      <vs-button v-else @click="update">{{ $t('update') }}</vs-button>
    </div>
  </div>
</template>

<script>
import { dataProvider } from '@modular-rest/client'
import notifier from '../../utilities/notifier'

export default {
  props: {
    database: { type: String, required: true },
    collection: { type: String, required: true },
    /**
     * Define wheather or not this form
     * is an edit form.
     */
    edit: Boolean,
    /**
     * The document to edit it
     * when edit is true.
     */
    id: String,
  },

  data() {
    return {
      form: {
        type: '',
        degree: '',
        rows: this.createTableArray(),
      },
      chords: [],
      chordPending: false,
      columns: ['major', 'naturalMinor', 'harmonicMinor', 'melodicMinor'],
      pending: false,
    }
  },

  watch: {
    id: {
      immediate: true,
      handler(value) {
        if (this.edit) {
          this.pending = true
          dataProvider
            .findOne({
              database: this.database,
              collection: this.collection,
              query: { _id: value },
            })
            .then((doc) => {
              delete doc._id
              this.form = doc
            })
            .finally(() => (this.pending = false))
        }
      },
    },
  },

  created() {
    this.getChordList()
  },

  methods: {
    update() {
      this.pending = true
    },

    createTableArray(x = 4, y = 7) {
      let lines = []
      for (let i = 0; i < y; i++) {
        lines.push({
          major: '',
          naturalMinor: '',
          harmonicMinor: '',
          melodicMinor: '',
        })
      }
      return lines
    },

    create() {
      this.pending = true
      dataProvider
        .insertOne({
          database: this.database,
          collection: this.collection,
          doc: this.form,
        })
        .then(() => {
          this.$emit('created')
          this.$emit('close')
        })
        .catch((result) => {
          notifier.toast({
            label: `Create ${this.collection} error`,
            description: result.error,
            type: 'error',
          })
        })
        .finally(() => (this.pending = false))
    },

    update() {
      this.pending = true

      dataProvider
        .updateOne({
          database: this.database,
          collection: this.collection,
          query: { _id: this.id },
          update: this.form,
        })
        .then(() => {
          this.$emit('updated')
          this.$emit('close')
        })
        .catch((result) => {
          notifier.toast({
            label: `Update ${this.collection} error`,
            description: result.error,
            type: 'error',
          })
        })
        .finally(() => (this.pending = false))
    },

    getChordList() {
      this.chordPending = true
      dataProvider
        .find({
          database: 'chord',
          collection: 'chord',
          query: {},
        })
        .then((list) => (this.chords = list))
        .finally(() => (this.chordPending = false))
    },
  },
}
</script>

<style>
</style>