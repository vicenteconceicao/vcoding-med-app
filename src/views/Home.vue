<template>
  <div class="home">
    <div class="display-1">DashBoard</div>
    <v-row>
      <v-col cols="12" md="4">
        <v-card color="indigo" class="pa-2" outlined tile dark>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Antedimento Gripe</div>
              <v-list-item-title class="headline mb-3">125</v-list-item-title>
              <v-list-item-subtitle>75% na última semana.</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="80">
              <v-icon>mdi-arrow-up</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card color="purple" class="pa-2" outlined tile dark>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Bairro Atendido</div>
              <v-list-item-title class="headline mb-3">Nossa S Aparecida</v-list-item-title>
              <v-list-item-subtitle>35% na última semana.</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="80">
              <v-icon>mdi-arrow-up</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card color="green darken-3" class="pa-2" outlined tile dark>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Antedimento Gripe</div>
              <v-list-item-title class="headline mb-3">125</v-list-item-title>
              <v-list-item-subtitle>75% na última semana.</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="80">
              <v-icon>mdi-arrow-up</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

     <!-- Columns are always 50% wide, on mobile and desktop -->
    <v-row>
      <v-col v-for="n in 1" :key="n" cols="12">
        <v-card class="pa-2" outlined tile>.col-6</v-card>
      </v-col>
    </v-row>

    <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
    <v-row>
      <v-col v-for="n in 2" :key="n" cols="12" md="6">
        <v-sheet :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`" class="px-3 pt-3 pb-3">
          <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- Columns are always 50% wide, on mobile and desktop -->
    <v-row>
      <v-col v-for="n in 2" :key="n" cols="6">
        <v-card class="pa-2" outlined tile>.col-6</v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
   inject: ["theme"],
};
</script>
