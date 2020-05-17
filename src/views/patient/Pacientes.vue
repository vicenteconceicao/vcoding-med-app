<template>
  <div>
    <div class="display-1 mb-4">Pacientes</div>
    <v-data-table
      :headers="headers"
      :items="patients"
      :options.sync="options"
      :server-items-length="totalDesserts"
      :loading="loading"
      fixed-header
      loading-text="Carregando... Por favor, aguarde"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-text-field v-model="search" label="Pesquisar" class="mx-4 pt-6"></v-text-field>
      </template>
      
      <template v-slot:item.actions="{ item }">
        <v-btn
          icon
          color="primary"
          title="Visualizar dados"
          class="mr-1"
          @click="irParaDetalhe(item.id)"
        >
          <v-icon small>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon color="green" title="Editar Paciente" class="mr-1" @click="editItem(item)">
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="red" title="Excluir Paciente" @click="sheet = true">
          <v-icon small>mdi-delete</v-icon>
        </v-btn>
        <v-bottom-sheet v-model="sheet" scrollable>
          <v-sheet class="text-center" height="200px">
            <v-btn class="mt-6" color="red" @click="deleteItem(item)">EXCLUIR</v-btn>
            <div
              class="py-3"
            >Você está excluindo o cadastro de um Paciente. Tem certeza que deseja realizar essa exclusão?</div>
          </v-sheet>
        </v-bottom-sheet>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on }">
        <v-btn fixed dark fab bottom right color="pink" class="mb-8" v-on="on">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-row>
                  <v-col>
                    <v-text-field v-model="editedItem.name" label="Nome Completo"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      :placeholder="inputConfig.placeholder.cpf"
                      v-model="editedItem.cpf"
                      label="CPF"
                      v-mask="inputConfig.masks.cpf"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="editedItem.rg" label="RG"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="editedItem.birthday"
                      :placeholder="inputConfig.placeholder.date"
                      label="Data Nascimento"
                      v-mask="inputConfig.masks.date"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      :placeholder="inputConfig.placeholder.dateTime"
                      v-model="editedItem.last_prescription"
                      label="Data Última Precrição"
                      v-mask="inputConfig.masks.dateTime"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field v-model="editedItem.mother_name" label="Nome da Mãe"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      :placeholder="inputConfig.placeholder.phone"
                      v-model="editedItem.phone"
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
          <v-btn text color="red darken-1" @click="close">
            <v-icon dark right>$vuetify.icons.close_circle</v-icon>Cancelar
          </v-btn>
          <v-btn text color="primary darken-1" @click="save">
            <v-icon dark right>$vuetify.icons.content_save</v-icon>Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar bottom v-model="snackbar">
      {{ text }}
      <v-btn color="pink" text @click="snackbar = false">Fechar</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "Pacientes",
  data: () => ({
    dialog: false,
    loading: true,
    sheet: false,
    snackbar: false,
    text: "",
    search: "",
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
      { text: "", value: "actions", sortable: false }
    ],
    patients: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      name: "",
      rg: null,
      cpf: null,
      birthday: "",
      mother_name: "",
      last_prescription: "",
      phone: ""
    },
    defaultItem: {
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
    dialog(val) {
      val || this.close();
    },
    options: {
      handler() {
        this.initialize();
      }
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
          this.totalDesserts = resp.data.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    editItem(item) {
      this.editedIndex = this.patients.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.$http
        .delete(`/patients/${item.id}`)
        .then(() => {
          this.showSnackbar("Paciente excluído com sucesso!", true);
        })
        .catch(error => {
          this.showSnackbar(error.response.data.message, true);
        });
      const index = this.patients.indexOf(item);
      this.patients.splice(index, 1);
      this.sheet = false;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        this.$http
          .put(`/patients/${this.editedItem.id}`, this.editedItem)
          .then(() => {
            this.showSnackbar("Paciente alterado com Sucesso!", true);
          })
          .catch(error => {
            this.showSnackbar(error.response.data.message, true);
          });
        Object.assign(this.patients[this.editedIndex], this.editedItem);
      } else {
        this.$http
          .post("/patients", this.editedItem)
          .then(() => {
            this.showSnackbar("Paciente cadastrado com Sucesso!", true);
          })
          .catch(error => {
            this.showSnackbar(error.response.data.message, true);
          });
        this.patients.push(this.editedItem);
      }
      this.close();
    },
    irParaDetalhe(id) {
      this.$router.push(`paciente/${id}`);
    },
    showSnackbar(text, visible) {
      this.text = text;
      this.snackbar = visible;
    }
  }
};
</script>

<style>
</style>