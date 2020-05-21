<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-0" color="transparent">
        <v-container>
          <v-row align="center" justify="center" class="mb-8">
            <div class="title">Bem vindo(a)</div>
          </v-row>
          <v-row align="center" justify="center" class="mb-8">
            <v-icon size="100" color="primary">mdi-account-circle</v-icon>
          </v-row>
          <v-form v-model="isValid">
            <v-text-field @keyup.enter="$refs.password.focus()" :rules="[rules.required]" v-model="username" label="Usuário" append-icon="mdi-account" type="text"></v-text-field>
            <v-text-field
              :rules="[rules.required]"
              v-model="password"
              label="Senha"
              :type="show1 ? 'text' : 'password'"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
              @keyup.enter="login"
              ref="password"
            ></v-text-field>
          </v-form>
        </v-container>
        <v-card-actions>
          <v-btn :disabled="!isValid" @click="login" block  color="primary" class="elevation-8">Entrar</v-btn>
        </v-card-actions>
      </v-card>
      <v-container>
        <v-btn text small block>Esqueceu Usuário/Senha?</v-btn>
        <v-btn text small block>Não tem uma conta? Cadastre-se</v-btn>
      </v-container>
    </v-col>
    <v-snackbar top v-model="snackbar">
      {{ text }}
      <v-btn color="primary" text @click="snackbar = false">Fechar</v-btn>
    </v-snackbar>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
import { userKey } from "@/config/global";

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
      isValid: false,
      rules: {
        required: value => !!value || "Campo obrigatório!",
      }
    };
  },
  methods: {
    ...mapActions(["setUser", "setLoading"]),

    login() {
      this.setLoading(true);
      let body = {
        username: this.username,
        password: this.password
      };
      this.$http
        .post("authenticate", body)
        .then(res => {
          this.$http.defaults.headers.common["Authorization"] = `bearer ${res.data.token}`;
          this.setLoading(false);

          /*  VEFICIANDO SE USUÁRIO TEM PERFIL CADASTRADO */
          if (res.data.hasProfile) {
            this.setUser(res.data);
            localStorage.setItem(userKey, JSON.stringify(res.data))
            this.$router.push("/");

          } else {
            this.$router.push("/perfil");
          }
        })
        .catch(error => {
          this.setLoading(false);
          delete this.$http.defaults.headers.common["Authorization"];
          this.text = error.response ?  error.response.data.message : error;
          this.snackbar = true;
        });
    }
  }
};
</script>

<style lang="scss">
</style>