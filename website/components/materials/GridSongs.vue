<template>
  <div :style="{ width: '100%' }">
    <!-- Header -->
    <div class="flex justify-between items-center flex-row-reverse">
      <h2 class="text-lg">{{ this.title }}</h2>
    </div>

    <!-- Content -->
    <div
      class="mt-8 items-center grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-4"
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