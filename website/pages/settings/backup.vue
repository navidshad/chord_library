<template>
  <v-container class="page">
    <v-container>
      <p>
        By tapping opposite button, a new backup will be generated, then it will
        be shown on the table.
      </p>
      <v-btn color="primary" :loading="pendingBackup" @click="createBackup"
        >Create new Backup</v-btn
      >
    </v-container>

    <v-container class="w-full">
      <BackupUploader @uploaded="getList" />
    </v-container>

    <v-simple-table :loading="loadingList">
      <template v-slot:default>
        <thead>
          <tr>
            <th>Title</th>
            <th>Size</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(file, i) in list" :key="i">
            <td>
              <a :href="getLink(file.title)">
                {{ file.title }}
              </a>
            </td>
            <td>
              {{ file.size }}
            </td>
            <td class="flex">
              <v-btn @click="restore(file.title)">Restore</v-btn>
              <v-btn color="red" @click="removeBackup(file.title)" dark>
                Remove
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import { is } from "@babel/types";
import notifier from "~/utilities/notifier";

export default {
  middleware: ["auth"],
  data() {
    return {
      loadingList: false,
      pendingBackup: false,
    };
  },
  computed: {
    list() {
      return this.$store.getters["backup/list"];
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    getLink(title) {
      let url = process.env.BASE_URL + "/backup-files/" + title;
      return url;
    },
    getList() {
      this.loadingList = true;
      this.$store.dispatch("backup/getList").finally((_) => {
        this.loadingList = true;
      });
    },
    createBackup() {
      this.pendingBackup = true;
      this.$store.dispatch("backup/createNewBackup").finally((_) => {
        this.pendingBackup = false;
        this.getList();
      });
    },
    removeBackup(title) {
      const isAllowed = confirm(`Do you want to remove ${title} backup file?`);
      if (!isAllowed) return;

      this.$store.dispatch("backup/removeBackupfile", title).finally((_) => {
        this.getList();
      });
    },
    restore(title) {
      const isAllowed = confirm(
        `Do you want to restore ${title} file? it will emove current data on database.`
      );
      if (!isAllowed) return;

      this.$store
        .dispatch("backup/restoreBackupFile", title)
        .then((_) => {
          notifier.toast({
            label: `Backup file restored`,
            description: title,
            type: "info",
          });
        })
        .catch((body) => {
          notifier.toast({
            label: `Restore failed`,
            description: JSON.stringify(body),
            type: "error",
          });
        });
    },
  },
};
</script>

<style lang="scss">
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
