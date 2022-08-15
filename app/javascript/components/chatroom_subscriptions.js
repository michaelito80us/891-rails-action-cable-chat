import Vue from "vue"
import TuborlinksAdapter from "vue-turbolinks";
import { createConsumer } from "@rails/actioncable"

Vue.use(TuborlinksAdapter);
const initChatroomCable = () => {
  const chatroom = document.getElementById("messages")
  if (chatroom) {
    new Vue({
      el: chatroom,
      data: {},
      methods: {
        insertMessageAndScrollDown: function (data) {
          this.messagesTarget.insertAdjacentHTML("beforeend", data);
          this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight);
        },
      },
      mounted() {
        this.chatroomIdValue = this.$refs.chatroom.dataset.chatroomidvalue; // the id of the chatroom we are going to subscribe to.
        this.messagesTarget = this.$refs.messages; // the target element where the messages will be rendered.

        this.channel = createConsumer().subscriptions.create(
          { channel: "ChatroomChannel", id: this.chatroomIdValue },
          { received: (data) => this.insertMessageAndScrollDown(data) }
        );
        console.log(
          `Subscribed to the chatroom with the id ${this.chatroomIdValue}.`
        );

        console.log("Component created");

        this.$refs.messageForm.addEventListener("turbo:submit-end", (event) => {
          event.target.reset();
        });
      },

      beforeDestroy() {
        console.log("Unsubscribed from the chatroom");
        this.channel.unsubscribe();
      },
    });
  }
}

export { initChatroomCable };
