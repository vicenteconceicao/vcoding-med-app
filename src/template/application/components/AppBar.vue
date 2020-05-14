<template>
  <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="primary" dark>
    <v-app-bar-nav-icon @click.stop="alterarDrawer" />
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
      <span class="hidden-sm-and-down">Prontuário Eletrônico</span>
    </v-toolbar-title>
    <v-spacer />
    <v-badge v-if="user" color="error" content="6" overlap offset-x="20" offset-y="20">
      <v-btn icon dark>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
    </v-badge>
    <v-menu v-if="user" offset-y>
      <template v-slot:activator="{ on }">
        <v-avatar class="ml-4 mr-2" size="32" item v-on="on">
          <v-img
            :src="user.avatar"
            alt="Vuetify"
          />
        </v-avatar>
      </template>
      <v-card tile>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img
               :src="user.avatar"
                alt="Vuetify"
              />
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
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data: () => ({
    items: [
      { icon: "mdi-account", title: "Meu Cadastro", url: "/profile" },
      { icon: "mdi-ballot", title: "Configurações", url: "/settings" },
      { icon: "mdi-help", title: "Ajuda", url: "/help" },
      { icon: "mdi-exit-to-app", title: "Sair", url: "/login" }
    ]
  }),
  computed: mapState(['user']),
  methods: {
    ...mapActions(["alterarDrawer"])
  }
};
</script>

<style>
</style>