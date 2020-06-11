<template>
  <div class="medicine">
    <div class="display-1 mb-4">Medicamentos</div>
    <v-row>
      <v-col>
        <!-- DataTable Component -->
        <DataTable
          :items="medicines"
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
            <span class="headline">{{disabled ? "Apagando" : "Cadastro de"}} Medicamento</span>
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
                        v-model="medicine.name"
                        label="Nome do Medicamento"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                      :disabled="disabled"
                      v-model="medicine.description"
                      label="Descrição"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        :disabled="disabled"
                        v-model="medicine.amount"
                        label="Quantidade"
                        type="number"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                   <v-row>
                    <v-col>
                      <v-text-field
                        :disabled="disabled"
                        v-model="medicine.unity"
                        label="Unidade"
                        type="number"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                   <v-row>
                    <v-col>
                      <v-text-field
                        :disabled="disabled"
                        v-model="medicine.ev"
                        label="EV"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                   <v-row>
                    <v-col>
                      <v-text-field
                        :disabled="disabled"
                        v-model="medicine.dosage"
                        label="Dosagem"
                      ></v-text-field>
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
  name: "Medicines",
  components: {
    DataTable
  },
  data() {
    return {
      medicines: [],
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
        { text: "Nome", align: "start", sortable: true, value: "name" },
        { text: "Descrição", value: "description" },
        { text: "Quantidade", align: "center", value: "amount" },
        { text: "Unidade", align: "center", value: "unity" },
        { text: "EV", value: "ev" },
        { text: "Posologia", value: "dosage" },
        { text: "", align: "end", value: "actions", sortable: false }
      ],
      medicine: {
        id: null,
        name: "",
        description: null,
        amount: null,
        unity: null,
        ev: null,
        dosage: null
      },
      medicineDefault: {
        name: "",
        description: null,
        amount: null,
        unity: null,
        ev: null,
        dosage: null
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo Medicamento" : "Edição de Medicamento";
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
        .post("/medicines/search", {
          page: page,
          limit: itemsPerPage,
          filter: this.search
        })
        .then(resp => {
          this.medicines = resp.data.data;
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
    showData(medicine) {
      this.$router.push(`medicine/${medicine.id}`);
    },
    editData(medicine) {
      this.medicine = medicine;
      this.mode = "upd";
      this.dialog = true;
    },
    deleteData(medicine) {
      this.medicine = medicine;
      this.mode = "dlt";
      this.dialog = true;
    },
    closeForm() {
      this.medicine = this.medicineDefault;
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
        .post("/medicines", this.medicine)
        .then(() => {
          this.showSnackbar("Medicamento cadastrado com Sucesso!", true);
          this.medicines.push(this.medicine);
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
      let index = this.medicines.indexOf(this.medicine);
      this.$http
        .put(`/medicines/${this.medicine.id}`, this.medicine)
        .then(() => {
          Object.assign(this.medicines[index], this.medicine);
          this.showSnackbar("Medicamento alterado com Sucesso!", true);
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
      let index = this.medicines.indexOf(this.medicine);
      this.$http
        .delete(`/medicines/${this.medicine.id}`)
        .then(() => {
          this.medicines.splice(index, 1);
          this.showSnackbar("Medicamento excluído com sucesso!", true);
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