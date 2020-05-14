<template>
  <v-app>
    <transition name="slide-login" mode="out-in">
      <TemplateLogin v-if="$route.name === 'Login'" />
      <TemplateApp v-else />
    </transition>
  </v-app>
</template>

<script>
import TemplateLogin from "./template/login/TemplateLogin";
import TemplateApp from "./template/application/TemplateApp";

export default {
  name: "App",

  components: {
    TemplateLogin,
    TemplateApp
  }
};
</script>

<style lang="scss">

@keyframes slide-login-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-login-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.slide-login-enter-active {
  animation: slide-login-in 0.3s ease-in-out;
}

.slide-login-leave-active {
  animation: slide-login-out 0.3s ease-in-out;
}
</style>
