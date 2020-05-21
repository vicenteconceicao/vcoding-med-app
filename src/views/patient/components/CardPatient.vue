<template>
  <div class="cardPatient">
    <v-card class="pa-2" outlined>
      <v-row justify="space-between">
        <v-col cols="auto">
          <v-avatar size="100" color="primary">
            <v-img src="https://cdn.vuetifyjs.com/images/cards/store.jpg"></v-img>
          </v-avatar>
        </v-col>
        <v-col>
          <v-card-title class="primary--text">{{patient.name}}</v-card-title>
          <v-card-text>Idade: {{age}}</v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    patient: Object
  },
  computed: {
    age() {
      let age = 0;
      if (this.patient.birthday) {
        let now = new Date();
        let birthday = this.patient.birthday.split("/");
        age = now.getFullYear() - birthday[2];
        if (birthday[0] < now.getDay() && birthday[1] <= now.getMonth()) {
          age--;
        }
      }
      return age;
    }
  }
};
</script>

<style>
</style>