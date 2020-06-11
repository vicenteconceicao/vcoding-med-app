<template>
  <v-navigation-drawer
    v-model="$store.state.drawer"
    :mini-variant="false"
    :expand-on-hover="false"
    clipped
    app
  >
    <v-list>
      <template v-for="item in menu">
        <v-list-item v-if="item.children.length == 0" :key="item.id" link :to="item.url">
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{item.description}}</v-list-item-title>
        </v-list-item>
        <v-list-group v-else :prepend-icon="item.icon" :key="item.id" no-action>
          <template v-slot:activator>
            <v-list-item-title>{{item.description}}</v-list-item-title>
          </template>
          <v-list-item v-for="child in item.children" :key="child.id" link :to="item.url+child.url+'s'">
            <v-list-item-icon>
              <v-icon>{{child.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{child.description}}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    menu: []
  }),
  created() {
    this.Init();
  },
  methods: {
    Init() {
      this.$http.get("/menus").then(resp => {
        this.menu = resp.data.sort((a,b) => (a.order > b.order) ? 1 : -1);
      });
    }
  }
};
</script>

<style>
</style>