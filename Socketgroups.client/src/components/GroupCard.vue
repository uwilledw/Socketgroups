<template>
    <router-link :to="{ name: 'GroupDetails', params: { groupId: group.id } }">
        <div class="rounded bg-dark text-light" v-if="group">
            <img class="group-img" :src="group.image" alt="">
            <h1 class="text-center">{{ group.title }}</h1>
        </div>
    </router-link>
</template>


<script>
import { Group } from '../models/Group.js';

export default {
    props: { group: { type: Group, required: true } },
    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped>
.group-img {
    width: 100%;
    max-height: 50vh;
    object-fit: cover;
    object-position: center;
}
</style>