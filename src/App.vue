<template>
  <v-app id="app">
    <v-progress-linear :active="loading" :indeterminate="true" absolute top color="primary"></v-progress-linear>
    <transition name="slide-app" mode="out-in">
      <TemplateLogin v-if="$route.name === 'Login' || $route.name === 'Perfil'" />
      <TemplateApp v-else />
    </transition>
  </v-app>
</template>

<script>
import TemplateLogin from "./template/login/TemplateLogin";
import TemplateApp from "./template/application/TemplateApp";
import { mapActions, mapState } from "vuex";
import { userKey } from "@/config/global";

export default {
  name: "App",

  components: {
    TemplateLogin,
    TemplateApp
  },
  computed: mapState(["loading"]),
  methods: {
    ...mapActions(["setUser", "setLoading"]),
    async validateToken() {
      this.setLoading(true);
      const json = localStorage.getItem(userKey);
      const userData = JSON.parse(json);
      this.setUser(null);

      if (!userData) {
        this.$router.push({name:'Login'});
      } else {
        this.$http.defaults.headers.common["Authorization"] = `bearer ${userData.token}`;
        this.setUser(userData);
        this.$router.push("/");
      }
      this.setLoading(false);
    }
  },
  created() {
    this.validateToken();
  }
};
</script>

<style lang="scss">
#app {
  background-color: #f5f5f5;
}

@keyframes slide-app-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-app-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.slide-app-enter-active {
  animation: slide-app-in 0.3s ease-in-out;
}

.slide-app-leave-active {
  animation: slide-app-out 0.3s ease-in-out;
}
</style>
