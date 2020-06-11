<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :options.sync="options"
    :server-items-length="totalDesserts"
    :loading="loading"
    loading-text="Carregando... Por favor, aguarde."
    class="elevation-1"
  >
    <template v-slot:top>
      <v-text-field v-model="search" label="Pesquise" class="mx-4 pt-6"></v-text-field>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn icon color="primary" title="Visualizar dados" class="mr-1" @click="showData(item)">
        <v-icon small>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon color="primary" title="Editar Paciente" class="mr-1" @click="editData(item)">
        <v-icon small>mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon color="primary" title="Excluir Paciente" @click="deleteData(item)">
        <v-icon small>mdi-delete</v-icon>
      </v-btn>
    </template>
    <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
  </v-data-table>
</template>

<script>
export default {
  props: {
    items: Array,
    headers: Array,
    loading: Boolean,
    totalDesserts: Number,
    showData: Function,
    editData: Function,
    deleteData: Function,
    searchData: Function
  },
  data() {
    return {
      search: "",
      options: {}
    };
  },
  watch: {
    options() {
      this.$emit("optionsChanged", this.options);
    },
    search() {
      this.searchData(this.search);
    }
  }
};
</script>

<style>
</style>