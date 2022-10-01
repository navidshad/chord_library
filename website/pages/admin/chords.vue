<template>
  <div>
    <v-btn-toggle block>
      <v-btn depressed color="primary" :active-class="page == 'table'" @click="page = 'table'">{{
        $t('chord.table')
      }}</v-btn>
      <v-btn depressed color="primary" :active-class="page == 'type'" @click="page = 'type'">{{
        $t('chord.type')
      }}</v-btn>
      <v-btn depressed color="primary" :active-class="page == 'chord'" @click="page = 'chord'">{{
        $t('chord.chord')
      }}</v-btn>
      <v-btn depressed color="primary" :active-class="page == 'keySignature'" @click="page = 'keySignature'">{{
        $t('chord.keySignature')
      }}</v-btn>
    </v-btn-toggle>

    <sequence-presentor
      class="mt-4"
      :slots="['type', 'chord', 'keySignature', 'table']"
      :active="page"
    >
      <collection-viewer
        slot="type"
        database="chord"
        collection="type"
        :fields="typeFields"
        :title="$t('chord.type')"
      />

      <collection-viewer
        slot="chord"
        database="chord"
        collection="chord"
        :fields="chordFields"
        :title="$t('chord.chord')"
        :populates="['type']"
        :sort="'title'"
      />

      <collection-viewer
        slot="keySignature"
        database="chord"
        collection="keySignature"
        :fields="keySignatureFields"
        :title="$t('chord.keySignature')"
      />

      <chord-table-collection slot="table" />
    </sequence-presentor>
  </div>
</template>

<script>
import SelectChordType from '../../components/inputs/SelectChordType'

export default {
  middleware: ['auth'],
  data() {
    return {
      page: 'table',
      typeFields: [
        {
          key: 'title',
          type: 'string',
        },
        {
          key: 'description',
          type: 'string',
        },
      ],
      chordFields: [
        {
          key: 'title',
          type: 'string',
        },
        {
          key: 'type',
          inputComponent: SelectChordType,
          mutate: (row) => row.type.title,
        },
      ],
      keySignatureFields: [
        {
          key: 'major',
          type: 'string',
        },
        {
          key: 'minor',
          type: 'string',
        },
        {
          key: 'description',
          type: 'string',
        },
      ],
    }
  },
}
</script>