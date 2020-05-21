<template>
  <v-row class="mx-4">
    <v-col>
      <v-row class="mb-4 text-center">
        <v-col>
          <v-badge color="primary" icon="mdi-camera" bottom overlap offset-x="25" offset-y="25">
            <v-avatar v-if="previewImage" size="100" color="primary">
              <v-img :src="previewImage" @click="$refs.btnAvatar.click()"></v-img>
            </v-avatar>
            <v-icon
              v-else
              @click="$refs.btnAvatar.click()"
              size="100"
              color="primary"
            >mdi-account-circle</v-icon>
          </v-badge>
          <input ref="btnAvatar" style="display:none" type="file" @change="previewFiles" />
          <div class="display-1 my-4">Vamos concluir o seu Cadastro?</div>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-radio-group v-model="tipo" row>
            <v-radio value="1">
              <template v-slot:label>
                <div>
                  Eu sou
                  <strong class="success--text">Médico(a)</strong>
                </div>
              </template>
            </v-radio>
            <v-radio value="2">
              <template v-slot:label>
                <div>
                  Sou
                  <strong class="primary--text">Infermeiro(a)</strong>
                </div>
              </template>
            </v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="profile.name" outlined label="Nome Completo" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="profile.cpf"
            outlined
            :placeholder="inputConfig.placeholder.cpf"
            v-mask="inputConfig.masks.cpf"
            label="CPF"
            required
          ></v-text-field>
        </v-col>
        <v-col v-if="tipo == '1'">
          <v-text-field v-model="profile.crm" outlined label="CRM" required></v-text-field>
        </v-col>
        <v-col v-else>
          <v-text-field v-model="profile.corem" outlined label="COREM" required></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            v-model="profile.birthday"
            outlined
            :placeholder="inputConfig.placeholder.date"
            label="Data Nascimento"
            v-mask="inputConfig.masks.date"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-radio-group v-model="profile.gender" row>
            <v-radio value="m">
              <template v-slot:label>
                <div>
                  <strong class="primary--text">Masculino</strong>
                </div>
              </template>
            </v-radio>
            <v-radio value="f">
              <template v-slot:label>
                <div>
                  <strong class="primary--text">Feminino</strong>
                </div>
              </template>
            </v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="profile.phone"
            outlined
            :placeholder="inputConfig.placeholder.phone"
            label="Telefone/Celular"
            v-mask="inputConfig.masks.phone"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="profile.email"
            outlined
            :placeholder="inputConfig.placeholder.email"
            label="E-mail"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn text large dark color="grey" depressed @click="goBack">Voltar</v-btn>
        </v-col>
        <v-col class="text-right">
          <v-btn right large color="success" depressed @click="saveProfile">Continuar</v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-snackbar bottom v-model="snackbar">
      {{ snackText }}
      <v-btn color="pink" text @click="snackbar = false">Fechar</v-btn>
    </v-snackbar>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Perfil",
  data() {
    return {
      tipo: "1",
      snackbar: false,
      previewImage: null,
      loading: false,
      snackText: "",
      profile: {
        name: "",
        cpf: "",
        crm: "",
        corem: "",
        phone: "",
        birthday: "",
        gender: "",
        avatar: null,
        email: ""
      },
      inputConfig: {
        masks: {
          cpf: "###.###.###-##",
          date: "##/##/####",
          dateTime: "##/##/#### ##:##:##",
          phone: "(##) # ####-####",
          email: ""
        },
        placeholder: {
          cpf: "000.000.000-00",
          date: "dd/mm/AAAA",
          dateTime: "dd/mm/AAAA 00:00:00",
          phone: "(00) 0 0000-0000",
          email: "nome@email.com"
        }
      }
    };
  },
  watch: {
    previewImage() {
      this.profile.avatar = this.previewImage;
    }
  },
  methods: {
    ...mapActions(["setUser", "setLoading"]),

    goBack() {
      this.$router.push("/login");
    },
    previewFiles(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = event => {
        this.previewImage = event.target.result;
      };
    },
    saveProfile() {
      this.setLoading(true);
      this.$http
        .post("/profiles", this.profile)
        .then(res => {
          this.setLoading(false);
          this.setUser(res);
          this.$router.push("/");
        })
        .catch(error => {
          this.setLoading(false);
          this.showSnackbar(
            error.response ? error : error.response.data.message,
            true
          );
        });
    },
    showSnackbar(text, visible) {
      this.snackText = text;
      this.snackbar = visible;
    }
  }
};
</script>

<style>
</style>