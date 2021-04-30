<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8>
      <v-card min-width="400">

        <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
        >
          {{message}}
        </v-snackbar>

        <v-card-title>
          <h1>Nuxt чат</h1>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>

            <v-text-field
              v-model="username"
              :rules="nameRules"
              label="Ваше логин"
              required
            />

            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Пароль"
              type="password"
              required
            />

            <v-btn :disabled="!valid" color="primary" @click="submit">Войти</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>

  </v-layout>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  layout: 'empty',
  head: {
    title: 'Friends Finder'
  },
  data: () => ({
    valid: true,
    username: '',
    password: '',
    snackbar: false,
    timeout: 2000,
    message: '',
    nameRules: [
      v => !!v || 'Введите имя',
      v => (v && v.length <= 16) || 'Имя не должно превышать 16 символов'
    ],
    room: '',
    roomRules: [ v => !!v || 'Введите комнату' ],
    passwordRules: [ v => !!v || 'Введите пароль' ]

  }),

  sockets: {
    connect() {
      console.log('Client IO connected');
    }
  },

  methods: {
    ...mapActions([ 'login' ]),
    submit() {

      if (this.$refs.form.validate()) {
        const user = {
          username: this.username,
          password: this.password,
        };

        this.login(user).then(code => {
          if(code === 400) {
            this.message = `Ошибка: ${code}`;
            this.snackbar = true;
          } else {
            this.message = 'Данные верны';
            this.snackbar = true;
            this.$router.push('/home');
          }
        });
      }
    },

  }

};
</script>
