<template>
  <div>
    <!-- NAVBAR -->
    <vs-navbar>
      <vs-button slot="left" flat v-if="!isLogin" to="/auth/login">
        {{ $t('auth.sign-in') }}
      </vs-button>

      <vs-button
        slot="left"
        v-if="isLogin"
        @click="activeSidebar = !activeSidebar"
        flat
        icon
      >
        <i class="bx bx-menu"></i>
      </vs-button>

      <vs-navbar-item to="/">{{ $t('navbar.home') }}</vs-navbar-item>
    </vs-navbar>

    <!-- SIDEBAR -->
    <vs-sidebar 
      :open.sync="activeSidebar"
      absolute
    >
    
    </vs-sidebar>

    <!-- CONTENT -->
    <div class="page-content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeSidebar: false,
    }
  },
  computed: {
    isLogin() {
      // return authService.isLogin
      return this.$store.getters['auth/isLogin']
    },
  },
}
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
