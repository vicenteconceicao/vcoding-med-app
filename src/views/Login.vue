<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-0" color="transparent">
        <v-container>
          <v-row align="center" justify="center" class="mb-8">
            <div class="title">Bem vindo(a)</div>
          </v-row>
          <v-row align="center" justify="center" class="mb-8">
            <v-avatar color="primary" size="100">
              <img alt="Avatar" src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" />
            </v-avatar>
          </v-row>
          <v-form>
            <v-text-field v-model="username" label="Usuário" append-icon="mdi-account" type="text"></v-text-field>
            <v-text-field
              v-model="password"
              label="Senha"
              :type="show1 ? 'text' : 'password'"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-form>
        </v-container>
        <v-card-actions>
          <v-btn @click="login" rounded block depressed color="primary" class="elevation-8">Entrar</v-btn>
        </v-card-actions>
      </v-card>
      <v-container>
        <v-btn text small block>Esqueceu Usuário/Senha?</v-btn>
        <v-btn text small block>Não tem uma conta? Cadastre-se</v-btn>
      </v-container>
    </v-col>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-snackbar top v-model="snackbar">
      {{ text }}
      <v-btn color="pink" text @click="snackbar = false">Fechar</v-btn>
    </v-snackbar>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      snackbar: false,
      text: "",
      username: "",
      password: "",
      show1: false,
      loading: false,
      rules: {
        required: value => !!value || "Favor informe o e-mail.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },

  methods: {
    ...mapActions(["setUser"]),

    login() {
      this.loading = true;

      let body = {
        username: this.username,
        password: this.password
      };

      this.$http
        .post("authenticate", body)
        .then(res => {
          let user = {
            name: res.data.name,
            avatar: "https://lorempixel.com/200/200/"
          };
          this.setUser(user);
          this.$http.defaults.headers.common[
            "Authorization"
          ] = `bearer ${res.data.token}`;
          this.$router.push("/");
        })
        .catch(error => {
          delete this.$http.defaults.headers.common["Authorization"];
          this.loading = false;
          this.text = error.response.data.message;
          this.snackbar = true;
        });
    }
  }
};
</script>

<style lang="scss">
</style>