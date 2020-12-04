<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center flex-row-reverse">
      <h2 class="text-lg">{{ title }}</h2>
      <vs-button @click="activeForm = true">{{ $t('add') }}</vs-button>
    </div>

    <!-- Content -->
    <card class="p-8 mt-4">
      <vs-table>
        <!-- Search -->
        <template slot="header">
          <vs-input border block placeholder="Search" type="search" />
        </template>

        <!-- THead -->
        <template slot="thead">
          <vs-tr>
            <vs-th v-for="(field, i) in fields" :key="i">
              {{ field.key }}
            </vs-th>
          </vs-tr>
        </template>

        <!-- TBody -->
        <template slot="tbody">
          <vs-tr v-for="(row, i) in list" :key="i">
            <vs-td v-for="(field, i) in fields" :key="i">
              {{ row[field.key] }}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </card>

    <!-- Ceate/Edit form -->
    <vs-dialog prevent-close :value="activeForm" @input="activeForm = $event">
      <collection-form
        :database="database"
        :collection="collection"
        :fields="fields"
      />
    </vs-dialog>
  </div>
</template>

<script>
import { DataProvider } from '@mres/web'
const dataProvider = DataProvider.getInstance()

export default {
  props: {
    title: String,
    database: { type: String, required: true },
    collection: { type: String, required: true },
    /**
     * An array of
     * {type, title, key, placeholder, icon}
     */
    fields: { type: Array, default: () => [] },
  },

  data() {
    return {
      list: [],
      pending: false,
      activeForm: false,
    }
  },

  created() {
    this.find()
  },

  computed: {
    findOption() {
      return {
        database: this.database,
        collection: this.collection,
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
  },
}
</script>

<style>
</style>