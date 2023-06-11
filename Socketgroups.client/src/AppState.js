import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {import('./models/Group.js').Group[]} */
  groups: [],

  /** @type {import('./models/Group.js').Group|null} */
  activeGroup: null,

  /** @type {import('./models/Chat.js').Chat[]} */
  chats: []
})
