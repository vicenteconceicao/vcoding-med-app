<template>
  <div class="patient-resume">
    <v-card class="pa-2" outlined>
      <v-row justify="space-between">
        <v-col cols="auto">
          <v-avatar size="100" color="primary">
            <v-img src="https://cdn.vuetifyjs.com/images/cards/store.jpg"></v-img>
          </v-avatar>
        </v-col>
        <v-col>
          <!--<v-card-title class="primary--text">{{patient.name}}</v-card-title> -->
          <v-card-text>Idade:</v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    patient: { type: Object, required: true }
  },
  name: "PatientResume"
};
</script>

<style>
</style>