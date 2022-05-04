<template>
    <v-card class="pa-3 mx-auto" max-width="700px">
       <v-row>
            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                 <Status></Status>
            </v-col>
       </v-row>
       <v-divider class="my-2"></v-divider>
       <post-card v-for="post in homePost" :key="post._id" :post="post" />
       
    </v-card>
</template>

<script setup>
import { useStore } from "vuex";
import {ref,computed} from "vue";
import Status from "../components/Status.vue";
import PostCard from "../components/Post/PostCard.vue";

const store = useStore();
const user =store.getters.getUser




const homePost = computed(()=>{
    return store.getters.getPosts
})



</script>

<style lang="scss" scoped>

</style>