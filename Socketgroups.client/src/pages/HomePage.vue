<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-3">
        {{ pokemon }}
      </div>
      <div class="col-9 my-3">
        <section class="row justify-content-center">
          <div v-for="g in groups" :key="g.id" class="col-md-10">
            <GroupCard :group="g" />
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import Pop from '../utils/Pop.js';
import { groupsService } from '../services/GroupsService.js'
import { computed, onMounted, ref } from 'vue';
import { logger } from '../utils/Logger.js';
import { AppState } from '../AppState.js';

export default {
  setup() {

    async function getGroups() {
      try {
        await groupsService.getGroups()
      } catch (error) {
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getGroups()
      filterType.value = "fire"
      logger.log(AppState.pokemonArray)
    })


    const filterType = ref('')

    const types = ["water", "fire", "grass"]




    return {
      types,

      pokemon: computed(() => {
        if (!filterType.value) {
          return AppState.pokemonArray
        } else {
          return AppState.pokemonArray.filter(p => p.types.find(t => t == filterType.value))
        }
      }),

      groups: computed(() => AppState.groups)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
