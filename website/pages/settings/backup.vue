  <template>
  <div class="page">
    <div class="container">
      <p>
        By tapping opposit button a new backup will be generate, then will be
        shown on the table.
      </p>
      <v-btn color="primary" :loading="pendingBackup" @click="createBackup"
        >Create new Backup</v-btn
      >
    </div>
    <v-simple-table :loading="loadingList">
      <template v-slot:default>
        <thead>
        <tr>
          <th> Title </th>
            <th> Size </th>
            <th> options </th>
          </tr>
        </thead>
        <tbody>
          <tr :key="i" v-for="(file, i) in list" :data="tr">
            <td>
              <a :href="getLink(file.title)">
                {{ file.title }}
              </a>
            </td>
            <td>
              {{ file.size }}
            </td>
            <td>
              <v-btn color="primary" @click="removeBackup(file.title)">remove</v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

  <script>
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
      this.$store.dispatch("backup/removeBackfile", title).finally((_) => {
        this.getList();
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