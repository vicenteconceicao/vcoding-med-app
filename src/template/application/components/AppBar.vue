<template>
  <v-app-bar clipped-left flat app color="primary" dark>
    <v-app-bar-nav-icon @click.stop="alterarDrawer" />
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
      <span class="hidden-sm-and-down">Prontuário Eletrônico</span>
    </v-toolbar-title>
    <v-spacer />
    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-avatar v-if="user.avatar" class="ml-4 mr-2" size="32" item v-on="on">
          <v-img :src="user.avatar" alt="Vuetify" />
        </v-avatar>
        <v-btn icon v-else item v-on="on">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-card tile>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img v-if="user.avatar" :src="user.avatar" alt="Vuetify" />
              <v-icon size="32" v-else color="primary">mdi-account-circle</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ user.name }}</v-list-item-title>
              <v-list-item-subtitle>Clínico Geral</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item-group color="primary">
            <v-list-item v-for="(item, index) in items" :key="index" :to="item.url">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { userKey } from "@/config/global";

export default {
  data: () => ({
    items: [
      { icon: "mdi-account", title: "Meu Cadastro", url: "/perfil" },
      { icon: "mdi-help", title: "Ajuda", url: "/help" },
      { icon: "mdi-cog-outline", title: "Configurações", url: "/settings" }
    ]
  }),
  computed: mapState(["user"]),
  methods: {
    ...mapActions(["alterarDrawer", "setUser"]),
    logout() {
      localStorage.removeItem(userKey);
      this.setUser(null);
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style>
</style>