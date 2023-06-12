import { AppState } from '../AppState.js'
import { Chat } from '../models/Chat.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('error', this.onError)
      .on("s:created:chat", this.createdChat)
      .on("s:joined:room", this.joiningRoom)
  }

  onError(e) {
    Pop.toast(e.message, 'error')
  }

  joiningRoom(payload) {
    if (payload && AppState.account.id != payload.id) {
      Pop.toast(
        `
        <h5>${payload.name} has joined the chat.</h5>
        `,
        null
      )
    }
  }

  createdChat(payload) {
    const chat = new Chat(payload);
    logger.log('SOCKET CHAT', chat)
    AppState.chats.push(chat)
  }
}

export const socketService = new SocketService()
