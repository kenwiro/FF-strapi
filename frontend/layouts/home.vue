<template>
  <v-app app dark>
    <v-navigation-drawer app v-model="drawer" mobile-breakpoint="650">
      <v-list subheader>

        <v-subheader>Список комнат</v-subheader>

        <v-list-item v-for="room in rooms" :key="room.id" @click.prevent>

          <v-list-item-content @click="goToChatRoom(room.name)">
            <v-list-item-title>{{room.name}}</v-list-item-title>
          </v-list-item-content>

        </v-list-item>

        <v-list-item @click.prevent>

          <v-list-item-content @click="createChatRoom">
            <v-list-item-title>
              Создать комнату
              <v-icon :right="true">mdi-plus</v-icon>
            </v-list-item-title>
          </v-list-item-content>

        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-main>
      <div style="height: 100%">
        <nuxt/>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  middleware: [ 'chat' ],
  data: () => ({
    drawer: true,
  }),

  mounted() {
    this.getRooms();
  },

  computed: mapState([ 'user', 'users', 'rooms' ]),

  methods: {

    ...mapActions([ 'getRooms' ]),
    ...mapMutations([ 'clearData' ]),

    createChatRoom() {

    },

    goToChatRoom(roomName) {
      this.$socket.emit('userJoined', { id: this.user.user.id,name: this.user.user.username,room: roomName }, data => {
        if (typeof data === 'string') {
          console.error(data);
        } else {
          this.$router.push(`/rooms/${roomName}`);

        }
      });
    }
  }
};
</script>
