<template>
  <div class="menus">
    <div class="display-1 mb-4">Menus</div>
    <v-card outlined :loading="loading">
      <v-list>
        <template v-for="menu in menus">
          <v-list-item v-if="menu.children.length == 0" :key="menu.id">
            <v-list-item-icon>
              <v-icon>{{menu.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{menu.description}}</v-list-item-title>
              <v-list-item-subtitle>{{menu.url}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-row>
                <v-btn icon>{{menu.order}}</v-btn>
                <v-btn
                  icon
                  color="primary"
                  title="Editar Menu"
                  class="mr-1"
                  @click="editData(menu)"
                >
                  <v-icon small>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon color="primary" title="Excluir Menu" @click="deleteData(menu)">
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>
              </v-row>
            </v-list-item-action>
          </v-list-item>
          <v-list-group v-else :prepend-icon="menu.icon" :key="menu.id" no-action>
            <template v-slot:activator>
              <v-list-item-title>{{menu.description}}</v-list-item-title>
              <v-btn icon>{{menu.order}}</v-btn>
              <v-btn icon color="primary" title="Editar Menu" class="mr-1" @click="editData(menu)">
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <v-list-item v-for="child in menu.children" :key="child.id">
              <v-list-item-icon>
                <v-icon>{{child.icon}}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{child.description}}</v-list-item-title>
                <v-list-item-subtitle>{{child.url}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-row>
                  <v-chip>{{child.order}}</v-chip>
                  <v-btn
                    icon
                    color="primary"
                    title="Editar Menu"
                    class="mr-1"
                    @click="editData(child)"
                  >
                    <v-icon small>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon color="primary" title="Excluir Menu" @click="deleteData(child)">
                    <v-icon small>mdi-delete</v-icon>
                  </v-btn>
                </v-row>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
      <template v-if="loading">
        <template v-for="i in 5">
          <v-skeleton-loader
            :key="i"
            ref="skeleton"
            :boilerplate="false"
            type="list-item-avatar-three-line"
            :tile="false"
            class="mx-auto"
          ></v-skeleton-loader>
        </template>
      </template>
    </v-card>
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
            <span class="headline">{{disabled ? "Apagando" : "Cadastro de"}} Menu</span>
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
                        placeholder="Ordem"
                        v-model="menu.order"
                        label="Ordem"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        :disabled="disabled"
                        placeholder="id"
                        v-model="menu.parent_id"
                        label="Pai"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-checkbox :disabled="disabled" v-model="menu.active" label="Ativo"></v-checkbox>
                    </v-col>
                  </v-row>

                  <v-text-field
                    :disabled="disabled"
                    placeholder="Descrição"
                    v-model="menu.description"
                    label="Descrção"
                  ></v-text-field>
                  <v-text-field
                    :disabled="disabled"
                    placeholder="Url"
                    v-model="menu.url"
                    label="Url"
                  ></v-text-field>
                  <v-text-field
                    :append-icon="menu.icon"
                    :disabled="disabled"
                    placeholder="Ícone"
                    v-model="menu.icon"
                    label="Ícone"
                  ></v-text-field>
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
      <!-- snackBar Component -->
      <v-snackbar bottom v-model="snackbar">
        {{ snackText }}
        <v-btn color="primary" text @click="snackbar = false">Fechar</v-btn>
      </v-snackbar>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Menus",
  data: () => ({
    loading: true,
    snackbar: false,
    dialog: false,
    disabled: false,
    mode: "new",
    search: "",
    permission: "",
    snackText: "",
    menus: [],
    menu: {
      description: "",
      active: true,
      url: "",
      children: [],
      order: 0,
      icon: "",
      parent_id: null
    },
    menuDefault: {
      description: "",
      active: true,
      url: "",
      children: [],
      order: 0,
      icon: "",
      parent_id: null
    }
  }),
  watch: {
    mode() {
      this.disabled = this.mode === "dlt";
    }
  },
  created() {
    this.Init();
  },
  methods: {
    Init() {
      this.loading = true;
      this.$http
        .get("/menus")
        .then(resp => {
          this.menus = resp.data.sort((a, b) => (a.order > b.order ? 1 : -1));
        })
        .finally(() => {
          this.loading = false;
        });
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
    editData(menu) {
      this.menu = menu;
      this.mode = "upd";
      this.dialog = true;
    },
    deleteData(menu) {
      this.menu = menu;
      this.mode = "dlt";
      this.dialog = true;
    },
    closeForm() {
      this.menu = this.menuDefault;
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
        .post("/menus", this.menu)
        .then(() => {
          this.showSnackbar("Menu cadastrado com Sucesso!", true);
          this.menus.push(this.menu);
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
      this.$http
        .put(`/menus/${this.menu.id}`, this.menu)
        .then(() => {
          this.showSnackbar("Menu alterado com Sucesso!", true);
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
      let index = this.menus.indexOf(this.menu);
      this.$http
        .delete(`/menus/${this.menu.id}`)
        .then(() => {
          this.menus.splice(index, 1);
          this.showSnackbar("Menu excluído com sucesso!", true);
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