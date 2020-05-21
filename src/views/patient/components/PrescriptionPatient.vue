<template>
  <v-expansion-panel>
    <v-expansion-panel-header disable-icon-rotate>
      20/05/2020 - Por: Fulano
      <template v-slot:actions>
        <v-chip>
          <v-icon left color="primary">mdi-clock-outline</v-icon>12:30:00
        </v-chip>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {};
</script>

<style>
</style>