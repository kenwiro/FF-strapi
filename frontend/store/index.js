export const state = () => ({
  user: {},
  messages: [],
  users: [],
  rooms: []
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setRooms(state, rooms) {
    state.rooms = rooms;
  },
  clearData(state) {
    state.user = {};
    state.messages = [];
    state.users = [];
  },
  SOCKET_newMessage(state, message) {
    state.messages.push(message);
  },
  SOCKET_updateUsers(state, users) {
    state.users = users;
  }
};

export const actions = {

  async login ({ commit }, data) {
    let response_code;
    try {
      const user = await this.$strapi.login({ identifier: data.username, password: data.password });
      commit('setUser',user);
      response_code = 200;
    } catch (e) {
      response_code = e.statusCode;
    }
    return response_code;
  },

  async getRooms ({ commit }) {
    let response_code;
    try {
      const rooms = await this.$strapi.find('Rooms');
      commit('setRooms',rooms);
      response_code = 200;
    } catch (e) {
      response_code = e.statusCode;
    }
    return response_code;

  }


};
