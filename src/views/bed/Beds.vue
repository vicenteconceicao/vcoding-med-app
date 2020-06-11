<template>
  <div class="bed">
    <div class="display-1 mb-4">Medicamentos</div>
    <v-row>
      <v-col>
        <!-- DataTable Component -->
        <DataTable
          :items="beds"
          :headers="headers"
          :loading="loading"
          :totalDesserts="totalDesserts"
          :showData="showData"
          :editData="editData"
          :deleteData="deleteData"
          :searchData="searchData"
          @optionsChanged="options= $event"
        ></DataTable>

        <!-- snackBar Component -->
        <v-snackbar bottom v-model="snackbar">
          {{ snackText }}
          <v-btn color="primary" text @click="snackbar = false">Fechar</v-btn>
        </v-snackbar>
      </v-col>
    </v-row>
    <!-- Dialog: Create Component -->
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on }">
          <!-- FloatButtom Component -->
          <v-btn fixed dark fab bottom right color="pink" class="mb-8" v-on="on">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>

        <!-- Card Component -->
        <v-card>
          <!-- Card Title -->
          <v-card-title>
            <span class="headline">{{disabled ? "Apagando" : "Cadastro de"}} Leito</span>
          </v-card-title>
          <!-- Card Text -->
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-row>
                    <v-col>
                      <v-text-field
                      :disabled="disabled"
                      v-model="bed.description"
                      label="Descrição"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                   <v-row>
                    <v-col>
                        <v-checkbox 
                        :disabled="disabled"
                        v-model="bed.available"
                        label="Disponível">
                        </v-checkbox>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                        <v-checkbox 
                        :disabled="disabled"
                        v-model="bed.active"
                        label="Ativo">
                        </v-checkbox>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="grey darken-1" @click="closeForm">
              <v-icon dark right>$vuetify.icons.close_circle</v-icon>Cancelar
            </v-btn>
            <v-btn v-if="disabled" text color="red darken-5" @click="saveData">
              <v-icon dark right>$vuetify.icons.delete</v-icon>Apagar
            </v-btn>
            <v-btn v-else text color="primary darken-1" @click="saveData">
              <v-icon dark right>$vuetify.icons.content_save</v-icon>Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import DataTable from "@/components/DataTable";

export default {
  name: "Beds",
  components: {
    DataTable
  },
  data() {
    return {
      beds: [],
      loading: true,
      snackbar: false,
      dialog: false,
      disabled: false,
      mode: "new",
      search: "",
      permission: "",
      snackText: "",
      options: {},
      totalDesserts: 0,
      headers: [
        { text: "Descrição", value: "description" },
        { text: "Disponível", align: "center", value: "available" },
        { text: "Ativo", align: "center", value: "active" },
        { text: "", align: "end", value: "actions", sortable: false }
      ],
      bed: {
        id: null,
        description: null,
        available: null,
        active: null,
      },
      bedDefault: {
        description: null,
        available: null,
        active: null,
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo Leito" : "Edição de Leito";
    }
  },
  watch: {
    options: {
      handler() {
        this.initialize();
      }
    },
    mode() {
      this.disabled = this.mode === "dlt";
    },
    search() {
      this.initialize();
    }
  },
  methods: {
    initialize() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      this.$http
        .post("/beds/search", {
          page: page,
          limit: itemsPerPage,
          filter: this.search
        })
        .then(resp => {
          this.beds = resp.data.data;
          this.totalDesserts = Number(resp.data.total);
        })
        .catch(error => {
          this.showSnackbar(
            error.response ? error.response.data.message : error,
            true
          );
        })
        .finally(() => {
          this.loading = false;
        });
    },
    searchData(search) {
      this.search = search;
    },
    saveData() {
      switch (this.mode) {
        case "new":
          this.create();
          break;
        case "upd":
          this.update();
          break;
        case "dlt":
          this.delete();
          break;
        default:
      }
    },
    showData(bed) {
      this.$router.push(`bed/${bed.id}`);
    },
    editData(bed) {
      this.bed = bed;
      this.mode = "upd";
      this.dialog = true;
    },
    deleteData(bed) {
      this.bed = bed;
      this.mode = "dlt";
      this.dialog = true;
    },
    closeForm() {
      this.bed = this.bedDefault;
      this.mode = "new";
      this.dialog = false;
    },
    showSnackbar(text, visible) {
      this.snackText = text;
      this.snackbar = visible;
    },

    /* CRUD METHODS. */
    create() {
      this.$http
        .post("/beds", this.bed)
        .then(() => {
          this.showSnackbar("Leito cadastrado com Sucesso!", true);
          this.beds.push(this.bed);
          this.closeForm();
        })
        .catch(error => {
          this.showSnackbar(
            error.response ? error.response.data.message : error,
            true
          );
        });
    },
    update() {
      let index = this.beds.indexOf(this.bed);
      this.$http
        .put(`/beds/${this.bed.id}`, this.bed)
        .then(() => {
          Object.assign(this.beds[index], this.bed);
          this.showSnackbar("Leito alterado com Sucesso!", true);
          this.closeForm();
        })
        .catch(error => {
          this.showSnackbar(
            error.response ? error.response.data.message : error,
            true
          );
        });
    },
    delete() {
      let index = this.beds.indexOf(this.bed);
      this.$http
        .delete(`/beds/${this.bed.id}`)
        .then(() => {
          this.beds.splice(index, 1);
          this.showSnackbar("Leito excluído com sucesso!", true);
          this.closeForm();
        })
        .catch(error => {
          this.showSnackbar(
            error.response ? error.response.data.message : error,
            true
          );
        });
    }
  }
};
</script>

<style>
</style>