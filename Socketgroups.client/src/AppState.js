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
  chats: [],

  pokemonArray: [
    {
      id: 1,
      name: "Bulbasaur",
      types: ["grass", "water"],
      sprite: "https://pokemon.com/pictures/bulbasaur.png"
    },
    {
      id: 1,
      name: "Char",
      types: ["fire"],
      sprite: "https://pokemon.com/pictures/bulbasaur.png"
    },
    {
      id: 1,
      name: "diglet",
      types: ["grass", "fire"],
      sprite: "https://pokemon.com/pictures/bulbasaur.png"
    },]
})
