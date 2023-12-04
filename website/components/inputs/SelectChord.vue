<template>
  <div>
    <v-select
      :items="list"
      :label="label"
      :loading="pending"
      item-text="title"
      item-value="_id"
      v-model="tempValue"
    />
  </div>
</template>

<script>
import { dataProvider } from "@modular-rest/client";
import notifier from "../../utilities/notifier";

export default {
  props: {
    value: { default: () => [] },
    label: String,
    placehoder: String,
    list: { type: Array, default: () => [] },
    pending: { type: Boolean, default: false },
  },
  data() {
    return {
      tempValue: "",
    };
  },
  watch: {
    // value: {
    //   immediate: true,
    //   deep: true,
    //   handler(newValue) {
    //     this.tempValue = newValue
    //   },
    // },
    tempValue(value) {
      if (this.multiple) {
        this.$emit(
          "input",
          value.filter((item) => item.length > 0)
        );
      } else this.$emit("input", value);
    },
  },
};
</script>
