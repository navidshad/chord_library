<template>
  <div>
    <v-btn-toggle block v-model="page">
      <v-btn value="table" depressed color="primary">{{
        $t("chord.table")
      }}</v-btn>
      <v-btn value="type" depressed color="primary">{{
        $t("chord.type")
      }}</v-btn>
      <v-btn value="chord" depressed color="primary">{{
        $t("chord.chord")
      }}</v-btn>
      <v-btn value="keySignature" depressed color="primary">{{
        $t("chord.keySignature")
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
        collection="keysignature"
        :fields="keySignatureFields"
        :title="$t('chord.keySignature')"
      />

      <chord-table-collection slot="table" />
    </sequence-presentor>
  </div>
</template>

<script>
import SelectChordType from "../../components/inputs/SelectChordType";

export default {
  middleware: ["auth"],
  data() {
    return {
      page: "table",
      typeFields: [
        {
          key: "title",
          type: "string",
        },
        {
          key: "description",
          type: "string",
        },
      ],
      chordFields: [
        {
          key: "title",
          type: "string",
        },
        {
          key: "type",
          inputComponent: SelectChordType,
          mutate: (row) => row.type.title,
        },
      ],
      keySignatureFields: [
        {
          key: "major",
          type: "string",
        },
        {
          key: "minor",
          type: "string",
        },
        {
          key: "description",
          type: "string",
        },
      ],
    };
  },
};
</script>