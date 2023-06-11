<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-3"></div>
      <div class="col-9">
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
import { computed, onMounted } from 'vue';
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
      logger.log('test')
    })
    return {

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
