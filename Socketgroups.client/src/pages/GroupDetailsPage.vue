<template>
    <div v-if="group" class="container-fluid">
        <section class="row justify-content-center my-4">
            <div class="col-10">
                <h1 class="ms-5">{{ group.title }}</h1>
                <img class="group-img rounded" :src="group.image" alt="">
            </div>
        </section>
        <section v-if="chats" class="row justify-content-center bg-dark py-5">
            <div v-for="c in chats" :key="c.id" class="col-8 d-flex bord m-1 align-items-center p-0">
                <img class="profile-img me-4" :src="c.creator.picture" alt="">
                <p class="m-0 text-light">{{ c.body }}</p>
            </div>
            <div class="col-8 my-4">
                <form @keydown.enter.prevent="createChat()">
                    <div class="input-group mb-3">
                        <!-- <label for="comment">Make a comment</label> -->
                        <input name="body" id="body" v-model="editable.body" class="form-control" required type="textarea">
                        <button class="btn btn-success" id="button-addon2" type="submit">Send</button>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>


<script>
import { useRoute, useRouter } from 'vue-router';
import Pop from '../utils/Pop.js';
import { groupsService } from '../services/GroupsService.js';
import { computed, onMounted, ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { chatsService } from '../services/ChatsService.js'
import { socketService } from '../services/SocketService';


export default {
    setup() {
        let route = useRoute()
        let router = useRouter()
        const editable = ref({})
        async function GetGroup() {
            try {
                let groupId = route.params.groupId
                await groupsService.GetGroup(groupId)
            } catch (error) {
                Pop.error(error.message)
            }
        }

        async function GetChats() {
            try {
                let groupId = route.params.groupId
                await chatsService.GetChats(groupId)
            } catch (error) {
                Pop.error(error.message)
            }
        }

        watchEffect(() => {
            route.params.id
            GetChats()
            joiningRoom()
        })

        router.beforeEach((to, from) => {
            if (from.name == "Group") {
                leaveRoom(from.params.id)
            }
        })

        function joiningRoom() {
            try {
                let payload = { groupName: route.params.groupId }
                socketService.emit("c:joining:room", payload)
            } catch (error) {
                Pop.error(error.message)
            }
        }

        onMounted(() => {
            GetGroup()
            GetChats()
        })
        return {
            editable,
            group: computed(() => AppState.activeGroup),
            chats: computed(() => AppState.chats),

            async createChat() {
                try {
                    let cData = editable.value
                    cData.groupId = route.params.groupId
                    await chatsService.createChat(cData)
                    editable.value = {}
                } catch (error) {
                    Pop.error(error.message)
                }
            }
        }
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

.profile-img {
    width: 5vw;
    height: 5vw;
}

.bord {
    border-bottom: 1px solid white;
    border-top: 1px solid white;
}
</style>