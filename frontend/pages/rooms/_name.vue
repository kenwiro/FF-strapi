<template>
  <div class="c-wrap" >
    <div class="c-chat" ref="block">
      <Message
        v-for="message in messages"
        :key="message.text"
        :name="message.name"
        :text="message.text"
        :owner="message.id === user.user.id"
      />
    </div>
    <div class="c-form">
      <ChatForm />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Message from '../../components/Message';
import ChatForm from '../../components/ChatForm';

export default {
  components: { ChatForm, Message },
  middleware: [ 'chat' ],
  head() {
    return {
      title: `Комната ${this.$route.params.name}`
    };
  },
  methods: {
  },
  computed: mapState([ 'user', 'messages' ]),

  watch: {
    messages() {
      this.$nextTick(() => {
        this.$refs.block.scrollTop = this.$refs.block.scrollHeight;
      });
    }
  }
};
</script>

<style scoped>
  .c-wrap {
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .c-form {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    height: 80px;
    background: #212121;
  }

  .c-chat {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    bottom: 80px;
    overflow-y: auto;
  }
</style>
