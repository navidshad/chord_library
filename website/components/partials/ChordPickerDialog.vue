<template>
  <div v-if="tables.length">
    <div class="flex justify-between">
      <vs-button flat @click="submitChords">{{ $t('select') }}</vs-button>
      <vs-button-group>
        <vs-button
          flat
          v-for="(signature, i) in signatures"
          :key="i"
          :active="activeTable == signature"
          @click="activeTable = signature"
          >{{ signature }}</vs-button
        >
      </vs-button-group>
    </div>
    <sequence-presentor class="mt-6" :slots="signatures" :active="activeTable">
      <card-chord-table
        v-for="(signature, i) in signatures"
        :key="i"
        :table="tables[i]"
        :slot="signature"
        allowChoose
        v-model="selecteds"
      />
    </sequence-presentor>
  </div>
</template>

<script>
import { dataProvider } from '@modular-rest/client'
export default {
  props: {
    closeModal: Function,
    value: Array,
  },
  data() {
    return {
      tables: [],
      activeTable: '',
      selecteds: [],
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (value) this.selecteds = value
      },
    },
  },
  computed: {
    signatures() {
      return this.tables.map((table) => {
        return table.keySignature.major + '-' + table.keySignature.minor
      })
    },
  },
  created() {
    this.getTables()
  },
  methods: {
    submitChords() {
      this.$emit('input', this.selecteds)
      this.closeModal()
    },
    getTables() {
      dataProvider
        .find({
          database: 'chord',
          collection: 'table',
          populates: [
            'keySignature',
            'type',
            'rows.major',
            'rows.naturalMinor',
            'rows.harmonicMinor',
            'rows.melodicMinor',
          ],
          query: {},
        })
        .then((tables) => (this.tables = tables))
        .then(() => (this.activeTable = this.signatures[0]))
    },
  },
}
</script>

<style>
</style>