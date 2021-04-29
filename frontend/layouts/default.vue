<template>
  <v-app app dark>
    <v-navigation-drawer app v-model="drawer" mobile-breakpoint="650">
      <v-list subheader>
        <v-subheader>Список людей в комнате</v-subheader>
        <v-list-item v-for="user in users" :key="user.id" @click.prevent>
          <v-list-item-content>
            <v-list-item-title>{{user.name}}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon :color="user.id === user.id ? 'primary' : 'grey'">mdi-message-text</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn icon @click="exit">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Чат комнаты {{user.room}}</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <div style="height: 100%">
        <nuxt/>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data: () => ({
    drawer: true,
  }),

  computed: mapState([ 'user', 'users' ]),

  methods: {
    ...mapMutations([ 'clearData' ]),

    exit() {
      this.$socket.emit('userLeft', this.user.id, () => {
        this.$router.push('/?message=leftChat');
        this.clearData();
      });
    }
  }
};
</script>
