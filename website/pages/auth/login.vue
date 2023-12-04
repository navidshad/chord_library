<template>
  <div>
    <v-card class="p-16">
      <v-row>
        <v-col class="text-center text-muted mb-4">
          <small>{{ $t("auth.with-credentials") }}</small>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="form.id"
            :label="$t('auth.accountID')"
            prepend-icon="bx bx-user"
            append-icon=""
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="form.password"
            :label="$t('auth.password')"
            prepend-icon="bx bx-lock-open-alt"
            :type="'password'"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="mt-4">
          <v-btn block :loading="pending" @click="login">
            {{ $t("auth.sign-in") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <v-row class="flex flex-row-reverse justify-between items-end mt-2 px-2">
      <v-col>
        <nuxt-link to="/auth/forgot-password">
          <small>{{ $t("auth.forgot-password") }}</small>
        </nuxt-link>
      </v-col>
      <v-col>
        <nuxt-link to="/auth/register">
          <small>{{ $t("auth.create-new-account") }}</small>
        </nuxt-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Login",
  layout: "hero",
  data() {
    return {
      form: {
        idType: "email",
        id: "",
        password: "",
      },
      pending: false,
      rememberMe: false,
    };
  },
  methods: {
    login() {
      this.pending = true;

      this.$store
        .dispatch("auth/login", this.form)
        .then(() => {
          this.$router.push("/");
        })
        .finally(() => (this.pending = false));
    },
  },
};
</script>

<style></style>
