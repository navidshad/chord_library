<template>
  <div>
    <v-select
      :loading="pending"
      :label="label"
      :placehoder="placehoder"
      :items="list"
      v-model="tempValue"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: { default: () => [] },

    label: String,
    placehoder: String,
    pending: { type: Boolean, default: false },
  },
  data() {
    return {
      tempValue: "",
      list: [
        "C",
        "D",
        "E",
        "F",
        "G",
        "A",
        "B",
        "C#",
        "D#",
        "E#",
        "F#",
        "G#",
        "A#",
        "B#",
        "Eb",
        "Ab",
        "Bb",
        "Db",
      ],
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (!value) return;
        this.tempValue = value;
      },
    },
    tempValue(value) {
      this.$emit("input", value);
    },
  },
};
</script>