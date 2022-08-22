<template>
  <div :style="{ width: '100%' }">
    <!-- Header -->
    <div class="flex justify-between items-center flex-row-reverse">
      <h2 class="text-lg">{{ this.title }}</h2>
    </div>

    <!-- Content -->
    <div
      class="mt-8 flex flex-wrap gap-4 justify-end items-center"
      :class="['justify-' + justify]"
    >
      <card-song
        v-for="(song, i) in list"
        :key="i"
        :song="song"
        :to="'/tab/' + song._id"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "GridSongs",

  props: {
    title: String,
    list: Array,
    pending: Boolean,
    justify: { type: String, default: "end" },
  },
};
</script>

<style>
</style>