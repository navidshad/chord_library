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

    <vs-select
      class="mt-6"
      :value="keySignature"
      @input="keySignature = $event"
      label-placeholder="Key Signature"
    >
      <vs-option label="major" value="major">major</vs-option>
      <vs-option label="minor" value="minor">minor</vs-option>
    </vs-select>

    <sequence-presentor class="mt-2" :slots="signatures" :active="activeTable">
      <card-chord-table
        v-for="(signature, i) in signatures"
        allowChoose
        :key="i"
        :table="tables[i]"
        :slot="signature"
        :value="selecteds"
        @input="
          selecteds = $event
          selectKeySignature()
        "
      />
    </sequence-presentor>
  </div>
</template>

<script>
import { dataProvider } from '@modular-rest/client'
export default {
  props: {
    closeModal: Function,
    value: Object,
  },
  data() {
    return {
      tables: [],
      activeTable: '',
      selecteds: [],
      keySignature: '',
    }
  },
  watch: {
    value: {
      immediate: true,
      handler({ keySignature, list }) {
        if (list) this.selecteds = list
        if (keySignature) this.keySignature = keySignature
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
    selectKeySignature() {
      if (!this.selecteds.length) return

      let firstChord = this.selecteds[0]
      this.keySignature = firstChord.column == 'major' ? 'major' : 'minor'
    },
    submitChords() {
      this.$emit('input', {
        keySignature: this.keySignature,
        list: this.selecteds,
      })
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