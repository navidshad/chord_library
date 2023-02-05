<template>
  <div>
    <div class="py-8 px-4">
      <h2 class="text-lg font-bold">{{ title }}</h2>
      <p class="text-base text-gray-500">{{ description }}</p>
    </div>
    <div class="flex items-center justify-between">
      <v-btn
        v-for="(action, i) in actions"
        :key="i"
        :loading="action.pending"
        v-bind="action.button"
        @click="onActionClicked(action)"
      >
        {{ action.label }}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    actions: { type: Array, default: () => [] },
    pending: Boolean,
  },
  methods: {
    onActionClicked(action) {
      this.$emit("actionClick", action);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  min-width: 356px;
}

.rtl {
  .card {
    direction: rtl;
  }
}
</style>