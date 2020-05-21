<template>
  <div class="usuarios">
    <div class="display-1 mb-4">Usuários</div>
    <v-row>
      <v-col>
        <!-- DataTable Component -->
        <DataTable
          :items="users"
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
            <span class="headline">{{disabled ? "Apagando" : "Cadastro de"}} Usuário</span>
          </v-card-title>
          <!-- Card Text -->
          <v-card-text>
            <v-container>
              <v-row>
                <v-text-field
                  :disabled="disabled"
                  v-model="user.username"
                  label="Nome de Usuário"
                  required
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  :disabled="disabled"
                  v-model="user.password"
                  type="password"
                  label="Senha"
                  required
                ></v-text-field>
              </v-row>
              <v-row>
                <v-combobox
                  :disabled="disabled"
                  v-model="permission"
                  :items="permItems"
                  label="Selecione a Permissão do Usuário"
                ></v-combobox>
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
  name: "Usuarios",
  components: { DataTable },
  data() {
    return {
      users: [],
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
        { text: "Usuário", align: "start", value: "username" },
        { text: "Permissão", value: "permission" },
        { text: "", align: "end", value: "actions", sortable: false }
      ],
      user: {
        id: null,
        username: "",
        password: "",
        permission: ""
      },
      userDefault: {
        id: null,
        username: "",
        password: "",
        permission: ""
      },
      inputConfig: {
        placeholder: {
          username: "Nome de Usuário",
          password: "Senha do Usuário",
          permission: "adm / user"
        }
      },
      permItems: [
        { text: "Usuário", value: "user" },
        { text: "Administrador", value: "admin" }
      ]
    };
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
    },
    permission(permItem) {
      this.user.permission = permItem.value;
    }
  },
  methods: {
    initialize() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      this.$http
        .post("/users/search", {
          page: page,
          limit: itemsPerPage,
          filter: this.search
        })
        .then(resp => {
          this.users = resp.data.data;
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
    showData(user) {
      console.log(`showData ${user.id}`);
    },
    editData(user) {
      user.password = "";
      this.user = user;
      this.permission = user.permission;
      this.mode = "upd";
      this.dialog = true;
    },
    deleteData(user) {
      this.user = user;
      this.permission = user.permission;
      this.mode = "dlt";
      this.dialog = true;
    },
    closeForm() {
      this.user = this.userDefault;
      this.mode = "new";
      this.dialog = false;
      this.permission = "";
    },
    showSnackbar(text, visible) {
      this.snackText = text;
      this.snackbar = visible;
    },

    /* CRUD METHODS. */
    create() {
      console.log(this.user)
      this.$http
        .post("/users", this.user)
        .then(() => {
          this.showSnackbar("Usuário cadastrado com Sucesso!", true);
          this.users.push(this.user);
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
      let index = this.users.indexOf(this.user);
      this.$http
        .put(`/users/${this.user.id}`, this.user)
        .then(() => {
          Object.assign(this.users[index], this.user);
          this.showSnackbar("Usuário alterado com Sucesso!", true);
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
      let index = this.users.indexOf(this.user);
      this.$http
        .delete(`/users/${this.user.id}`)
        .then(() => {
          this.users.splice(index, 1);
          this.showSnackbar("Usuário excluído com sucesso!", true);
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