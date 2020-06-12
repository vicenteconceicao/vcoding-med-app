<template>
  <div class="patient">
    <v-card>
      <v-app-bar color="primary" dark>
        <v-toolbar-title>{{patient.name}}</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-printer</v-icon>
        </v-btn>
        
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>

        <template v-slot:extension>
          <v-tabs>
            <v-tab @click="tab = 1">Resumo Clínico</v-tab>
            <v-tab @click="tab = 2">Diagnósticos</v-tab>
            <v-tab @click="tab = 3">Progresso</v-tab>
            <v-tab @click="tab = 4">Prescrições</v-tab>
            <v-tab @click="tab = 5">Exames</v-tab>
            <v-tab @click="tab = 6">Anexos</v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
      <v-sheet>
        <div class="pa-4">
          <PatientResume v-if="tab === 1" :patient="patient"></PatientResume>
          <PatientPrescription v-if="tab === 4"></PatientPrescription>
        </div>
      </v-sheet>
    </v-card>
  </div>
</template>

<script>
import PatientResume from "./PatientResume.vue";
import PatientPrescription from "./PatientPrescription.vue";

export default {
  props: ["id"],
  components: {
    PatientResume,
    PatientPrescription
  },
  data() {
    return {
      patient: {
        name: ""
      },
      tab: 1
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