<template>
  <div class="pacientes">
    <div class="display-1 mb-4">Pacientes</div>
    <v-row>
      <v-col>
        <!-- DataTable Component -->
        <DataTable
          :items="patients"
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
            <span class="headline">{{disabled ? "Apagando" : "Cadastro de"}} Paciente</span>
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
                        v-model="patient.name"
                        label="Nome Completo"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        :disabled="disabled"
                        :placeholder="inputConfig.placeholder.cpf"
                        v-model="patient.cpf"
                        label="CPF"
                        v-mask="inputConfig.masks.cpf"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field :disabled="disabled" v-model="patient.rg" label="RG"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        :disabled="disabled"
                        v-model="patient.birthday"
                        :placeholder="inputConfig.placeholder.date"
                        label="Data Nascimento"
                        v-mask="inputConfig.masks.date"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        :disabled="disabled"
                        :placeholder="inputConfig.placeholder.date"
                        v-model="patient.last_prescription"
                        label="Data Última Precrição"
                        v-mask="inputConfig.masks.date"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        :disabled="disabled"
                        v-model="patient.mother_name"
                        label="Nome da Mãe"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        :disabled="disabled"
                        :placeholder="inputConfig.placeholder.phone"
                        v-model="patient.phone"
                        label="Telefone/Celular"
                        v-mask="inputConfig.masks.phone"
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
  name: "Pacientes",
  components: {
    DataTable
  },
  data: () => ({
    patients: [],
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
      { text: "RG", value: "rg" },
      { text: "CPF", value: "cpf" },
      { text: "Data Nasc.", align: "center", value: "birthday" },
      { text: "Nome Mãe", value: "mother_name" },
      { text: "Telefone", value: "phone" },
      { text: "Última Prescrição", value: "last_prescription" },
      { text: "", align: "end", value: "actions", sortable: false }
    ],
    patient: {
      id: null,
      name: "",
      rg: null,
      cpf: null,
      birthday: "",
      mother_name: "",
      last_prescription: "",
      phone: ""
    },
    patientDefault: {
      name: "",
      rg: null,
      cpf: null,
      birthday: "",
      mother_name: "",
      last_prescription: "",
      phone: ""
    },
    inputConfig: {
      masks: {
        cpf: "###.###.###-##",
        date: "##/##/####",
        dateTime: "##/##/#### ##:##:##",
        phone: "(##) # ####-####"
      },
      placeholder: {
        cpf: "000.000.000-00",
        date: "dd/mm/AAAA",
        dateTime: "dd/mm/AAAA 00:00:00",
        phone: "(00) 0 0000-0000"
      }
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo Paciente" : "Edição de Paciente";
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
        .post("/patients/search", {
          page: page,
          limit: itemsPerPage,
          filter: this.search
        })
        .then(resp => {
          this.patients = resp.data.data;
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
    showData(patient) {
      this.$router.push(`paciente/${patient.id}`);
    },
    editData(patient) {
      this.patient = patient;
      this.mode = "upd";
      this.dialog = true;
    },
    deleteData(patient) {
      this.patient = patient;
      this.mode = "dlt";
      this.dialog = true;
    },
    closeForm() {
      this.patient = this.patientDefault;
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
        .post("/patients", this.patient)
        .then(() => {
          this.showSnackbar("Paciente cadastrado com Sucesso!", true);
          this.patients.push(this.patient);
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
      let index = this.patients.indexOf(this.patient);
      this.$http
        .put(`/patients/${this.patient.id}`, this.patient)
        .then(() => {
          Object.assign(this.patients[index], this.patient);
          this.showSnackbar("Paciente alterado com Sucesso!", true);
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
      let index = this.patients.indexOf(this.patient);
      this.$http
        .delete(`/patients/${this.patient.id}`)
        .then(() => {
          this.patients.splice(index, 1);
          this.showSnackbar("Paciente excluído com sucesso!", true);
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