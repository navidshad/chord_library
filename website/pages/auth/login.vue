<template>
  <shape-section hero>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <!-- <template>
              <div class="text-muted text-center mb-3">
                <small>Sign in with</small>
              </div>
              <div class="btn-wrapper text-center">
                <base-button type="neutral">
                  <img slot="icon" src="img/icons/common/github.svg" />
                  Github
                </base-button>

                <base-button type="neutral">
                  <img slot="icon" src="img/icons/common/google.svg" />
                  Google
                </base-button>
              </div>
            </template> -->
            <template>
              <div class="text-center text-muted mb-4">
                <small>{{ $t("auth.with-credentials") }}</small>
              </div>
              <form role="form">
                <base-input
                  alternative
                  class="mb-3"
                  addon-left-icon="ni ni-email-83"
                  :placeholder="$t('auth.accountID')"
                  v-model="accountID"
                />

                <base-input
                  alternative
                  type="password"
                  addon-left-icon="ni ni-lock-circle-open"
                  :placeholder="$t('auth.password')"
                  v-model="password"
                />

                <base-checkbox v-model="rememberMe">
                  {{ $t("auth.remember-me") }}
                </base-checkbox>
                <div class="text-center">
                  <base-button type="primary" class="my-4" @click="login">{{
                    $t("auth.sign-in")
                  }}</base-button>
                </div>
              </form>
            </template>
          </card>
          <div class="row mt-3">
            <div class="col-6">
              <a href="#" class="text-light">
                <small>{{ $t("auth.forgot-password") }}</small>
              </a>
            </div>
            <div class="col-6 text-right">
              <a href="#" class="text-light">
                <small>{{ $t("auth.create-new-account") }}</small>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </shape-section>
</template>

<script>
export default {
  data() {
    return {
      accountID: "",
      password: "",
      rememberMe: false,
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("auth/login", {
          idType: "email",
          id: this.accountID,
          password: this.password,
        })
        .then(() => {});
    },
  },
};
</script>

<style>
</style>