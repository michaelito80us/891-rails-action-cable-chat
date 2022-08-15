import "@hotwired/turbo-rails"
import 'bootstrap';

import { initChatroomCable } from "./components/chatroom_subscriptions";

document.addEventListener("turbo:load", () => {
  initChatroomCable()
})
