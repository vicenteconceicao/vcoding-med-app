<template>
  <div>
    <Navigation />
    <AppBar />
    <v-content>
      <v-container fluid>
        <transition name="slide" mode="out-in">
          <router-view />
        </transition>
      </v-container>
    </v-content>
    <Footer />
  </div>
</template>

<script>
import AppBar from "@/template/application/components/AppBar";
import Navigation from "@/template/application/components/Navigation";
import Footer from "@/template/application/components/Footer";

export default {
  components: {
    AppBar,
    Navigation,
    Footer
  }
};
</script>

<style lang="scss">

@keyframes slide-in {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
}

.slide-enter-active {
  animation: slide-in 0.3s ease-in-out;
}

.slide-leave-active {
  animation: slide-out 0.3s ease-in-out;
}
</style>