<template>
  <div class="patient">
    <div class="title mx-1">Resumo</div>
    <CardPatient :patient="patient"></CardPatient>
    <div class="title mx-1 my-2">Atendimentos</div>
    <v-expansion-panels hover>
      <PrescriptionPatient v-for="n in 5" :key="n"></PrescriptionPatient>
    </v-expansion-panels>
  </div>
</template>

<script>
import CardPatient from "./components/CardPatient";
import PrescriptionPatient from "./components/PrescriptionPatient";

export default {
  props: ["id"],
  components: {
    CardPatient,
    PrescriptionPatient
  },
  data() {
    return {
      patient: {
        name: ""
      }
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.$http.get(`/patients/${this.id}`).then(resp => {
        this.patient = resp.data;
      });
    }
  }
};
</script>

<style>
</style>