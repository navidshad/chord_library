<template>
  <v-app class="rtl">
    <!-- NAVBAR -->
    <v-app-bar app>
      <v-btn v-if="!isLogin" :loading="pending" to="/auth/login">
        {{ $t("auth.sign-in") }}
      </v-btn>

      <v-btn v-if="isLogin" @click="activeSidebar = !activeSidebar" icon>
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <nuxt-link to="/search" class="mx-2">
        {{ $t("search.label") }}
      </nuxt-link>

      <nuxt-link to="/artist/all" class="mx-2">
        {{ $t("artist.artists") }}
      </nuxt-link>

      <nuxt-link to="/" class="mx-2">
        {{ $t("navbar.home") }}
      </nuxt-link>
    </v-app-bar>

    <!-- SIDEBAR -->
    <v-navigation-drawer v-if="user" v-model="activeSidebar" app absolute>
      <!-- Admin section -->
      <v-expansion-panel v-if="user && user.type === 'administrator'">
        <v-expansion-panel-header>
          <v-icon>mdi-terminal</v-icon>
          <v-expansion-panel-content>
            {{ $t("navbar.admin.title") }}
          </v-expansion-panel-content>
        </v-expansion-panel-header>

        <v-list>
          <v-list-item to="/admin/artists">
            <v-list-item-icon>
              <v-icon>mdi-account-music</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t("navbar.admin.artists") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/admin/genres">
            <v-list-item-icon>
              <v-icon>mdi-music-note</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t("navbar.admin.genres") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/admin/song/list">
            <v-list-item-icon>
              <v-icon>mdi-playlist-music</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t("navbar.admin.songs") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- Chord Settings -->
          <v-list-item to="/admin/chords">
            <v-list-item-icon>
              <v-icon>mdi-guitar-electric</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t("navbar.admin.chords") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-expansion-panel>

      <!-- Settings -->
      <v-list v-if="user && user.type == 'administrator'">
        <v-list-item-group>
          <template #prepend>
            <v-list-item>
              <v-icon>mdi-terminal</v-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ $t("navbar.settings.title") }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <!-- Backup -->
          <v-list-item to="/settings/backup">
            {{ $t("navbar.settings.backup") }}
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-list>
        <v-list-item to="/about-us">
          {{ $t("aboutus") }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- CONTENT -->
    <div class="page-content">
      <Nuxt />
    </div>

    <dialog-presentor />
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      activeSidebar: false,
      pending: false,
    };
  },
  created() {
    if (!this.isLogin) {
      this.pending = true;
      this.$store.dispatch("auth/loginWithLastSession").finally((_) => {
        this.pending = false;
      });
    }
  },
  computed: {
    isLogin() {
      // return authService.isLogin
      return this.$store.getters["auth/isLogin"];
    },
    user() {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<style lang="scss">
.page-content {
  @apply px-4 pt-16;
}
// html {
//   font-family:
//     'Source Sans Pro',
//     -apple-system,
//     BlinkMacSystemFont,
//     'Segoe UI',
//     Roboto,
//     'Helvetica Neue',
//     Arial,
//     sans-serif;
//   font-size: 16px;
//   word-spacing: 1px;
//   -ms-text-size-adjust: 100%;
//   -webkit-text-size-adjust: 100%;
//   -moz-osx-font-smoothing: grayscale;
//   -webkit-font-smoothing: antialiased;
//   box-sizing: border-box;
// }

// *,
// *::before,
// *::after {
//   box-sizing: border-box;
//   margin: 0;
// }

// .button--green {
//   display: inline-block;
//   border-radius: 4px;
//   border: 1px solid #3b8070;
//   color: #3b8070;
//   text-decoration: none;
//   padding: 10px 30px;
// }

// .button--green:hover {
//   color: #fff;
//   background-color: #3b8070;
// }

// .button--grey {
//   display: inline-block;
//   border-radius: 4px;
//   border: 1px solid #35495e;
//   color: #35495e;
//   text-decoration: none;
//   padding: 10px 30px;
//   margin-left: 15px;
// }

// .button--grey:hover {
//   color: #fff;
//   background-color: #35495e;
// }
</style>
