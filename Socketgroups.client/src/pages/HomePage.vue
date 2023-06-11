<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-3"></div>
      <div class="col-9">
        <section class="row">
          <div class="col-10">
            groups
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import Pop from '../utils/Pop.js';
import { groupsService } from '../services/GroupsService.js'
import { onMounted } from 'vue';
import { logger } from '../utils/Logger.js';

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
    return {}
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
