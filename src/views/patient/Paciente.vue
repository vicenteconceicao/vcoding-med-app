<template>
  <CardPatient :patient="patient"></CardPatient>
</template>

<script>
import CardPatient from './components/CardPatient'

export default {
  props: ["id"],
  components: {
      CardPatient
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