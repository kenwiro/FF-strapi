<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8>
      <v-card min-width="400">

        <v-snackbar v-model="snackbar" :timeout="6000" top>
          {{ message }}
          <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
              Закрыть
            </v-btn>
          </template>
        </v-snackbar>

        <v-card-title>
          <h1>Nuxt чат</h1>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="name" :counter="16" :rules="nameRules" label="Ваше имя" required></v-text-field>

            <v-text-field v-model="room" :rules="roomRules" label="Введите комнату" required></v-text-field>

            <v-btn :disabled="!valid" color="primary" @click="submit">Войти</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  layout: 'empty',
  head: {
    title: 'Friends Finder'
  },
  data: () => ({
    valid: true,
    name: '',
    snackbar: false,
    message: '',
    nameRules: [
      v => !!v || 'Введите имя',
      v => (v && v.length <= 16) || 'Имя не должно превышать 16 символов'
    ],
    room: '',
    roomRules: [ v => !!v || 'Введите комнату' ]
  }),

  mounted() {
    const { message } = this.$route.query;
    if (message === 'noUser') {
      this.message = 'Введите данные';
    } else if (message === 'leftChat') {
      this.message = 'Вы вышли из чата';
    }

    this.snackbar = !!this.message;
  },

  sockets: {
    connect() {
      console.log('Client IO connected');
    }
  },

  methods: {
    ...mapMutations([ 'setUser' ]),
    submit() {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          room: this.room
        };

        this.$socket.emit('userJoined', user, data => {
          if (typeof data === 'string') {
            console.error(data);
          } else {
            user.id = data.userId;
            this.setUser(user);
            this.$router.push('/chat');
          }
        });
      }
    }
  }

};
</script>
