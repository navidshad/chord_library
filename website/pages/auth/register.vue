<template>
  <div>
    <sequence-presentor :slots="['email', 'code', 'password']" :active="page">
      <v-card class="p-16" slot="email">
        <v-container>
          <v-row>
            <v-col class="text-center text-muted mb-4">
              <small>{{ $t("auth.create-new-account") }}</small>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="accountID"
                :label="$t('auth.accountID')"
                prepend-icon="bx bx-user"
                append-icon=""
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="mt-4">
              <v-btn block :loading="pending" @click="register">
                {{ $t("auth.submit") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>

      <v-card class="p-16" slot="code">
        <v-container>
          <v-row>
            <v-col class="text-center text-muted mb-4">
              <small>{{ $t("auth.verify-code") }}</small>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="code"
                :label="$t('auth.code')"
                prepend-icon="bx bx-user"
                append-icon=""
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="mt-4">
              <v-btn block :loading="pending" @click="verifyID">
                {{ $t("auth.submit") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>

      <v-card class="p-16" slot="password">
        <v-container>
          <v-row>
            <v-col class="text-center text-muted mb-4">
              <small>{{ $t("auth.choose-password") }}</small>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="password"
                :label="$t('auth.password')"
                prepend-icon="bx bx-lock-open-alt"
                :type="'password'"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="mt-4">
              <v-btn block :loading="pending" @click="submitPassword">
                {{ $t("auth.submit") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </sequence-presentor>

    <v-row class="flex flex-row-reverse justify-between items-end mt-2 px-2">
      <v-col>
        <nuxt-link to="/auth/forgot-password">
          <small>{{ $t("auth.forgot-password") }}</small>
        </nuxt-link>
      </v-col>
      <v-col>
        <nuxt-link to="/auth/login">
          <small>{{ $t("auth.sign-in") }}</small>
        </nuxt-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Register",
  layout: "hero",
  data() {
    return {
      accountID: "",
      code: "",
      password: "",
      page: "email",
      pending: false,
      rememberMe: false,
    };
  },
  methods: {
    register() {
      this.pending = true;

      this.$store
        .dispatch("auth/submitIdentity", {
          idType: "email",
          id: this.accountID,
        })
        .then(() => {
          this.page = "code";
        })
        .finally(() => (this.pending = false));
    },

    verifyID() {
      this.pending = true;

      this.$store
        .dispatch("auth/verifyId", {
          id: this.accountID,
          code: this.code,
        })
        .then(() => {
          this.page = "password";
        })
        .finally(() => (this.pending = false));
    },

    submitPassword() {
      this.pending = true;

      this.$store
        .dispatch("auth/submitPassword", {
          id: this.accountID,
          code: this.code,
          password: this.password,
        })
        .then(() => {
          this.$router.push("/auth/login");
        })
        .finally(() => (this.pending = false));
    },
  },
};
</script>

<style></style>
