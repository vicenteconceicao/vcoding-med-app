<template>
  <v-content>
    <v-container class="fill-height">
      <transition name="slide-login" mode="out-in">
        <router-view />
      </transition>
    </v-container>
  </v-content>
</template>

<script>
export default {
};
</script>

<style>
@keyframes slide-login-in {
  from {
    opacity: 0;
    transform: translateX(-30%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-login-out {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-30%);
  }
}

.slide-login-enter-active {
  animation: slide-login-in 0.5s ease-in-out;
}

.slide-login-leave-active {
  animation: slide-login-out 0.5s ease-in-out;
}
</style>