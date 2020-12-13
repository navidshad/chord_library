<template>
  <card class="p-4" :style="{'max-width':'550px'}">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h3>{{ table.degree.major + ' ' + table.degree.minor }}</h3>
      <span>{{ table.type.title }}</span>

      <div class="flex">
        <vs-button icon transparent @click="$emit('edit')">
          <i class="bx bxs-edit"></i>
        </vs-button>
        <vs-button icon transparent @click="$emit('remove')">
          <i class="bx bx-trash-alt"></i>
        </vs-button>
      </div>
    </div>

    <!-- Table -->
    <vs-table class="mt-6">
      <!-- THead -->
      <template slot="thead">
        <vs-tr>
          <vs-th v-for="(column, i) in columns" :key="i">
            {{ column }}
          </vs-th>
        </vs-tr>
      </template>

      <!-- TBody -->
      <template slot="tbody">
        <vs-tr v-for="(row, rowIndex) in table.rows" :key="rowIndex">
          <vs-td v-for="(column, columnIndex) in columns" :key="columnIndex">
            {{ row[column].title }}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </card>
</template>

<script>
export default {
  props: {
    table: Object,
  },
  data() {
    return {
      columns: ['major', 'naturalMinor', 'harmonicMinor', 'melodicMinor'],
    }
  },
}
</script>

<style>
</style>