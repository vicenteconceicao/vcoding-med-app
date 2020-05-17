<template>
  <v-row v-if="patient">
    <v-col>
      <v-card class="mx-auto" outlined>
        <v-list-item three-line>
          <v-list-item-avatar tile size="80" color="grey">
            <v-img src="https://lorempixel.com/200/200/"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <div class="title font-weight-bold primary--text">{{patient.name}}</div>
            <v-list-item-title>Idade: 26</v-list-item-title>
            <v-list-item-subtitle>Última consulta: 01/05/2020</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
    props:{
        patient: Object
    }
}
</script>

<style>

</style>