<template>
  <div class="patient-prescription">
     <v-expansion-panels hover>
      <PrescriptionPatient v-for="n in 5" :key="n"></PrescriptionPatient>
    </v-expansion-panels>
  </div>
</template>

<script>
import PrescriptionPatient from "./components/PrescriptionPatient";
export default {
  components: { PrescriptionPatient },
};
</script>

<style>
</style>