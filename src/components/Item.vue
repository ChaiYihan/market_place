<script>
import { mapState } from 'vuex'
export default {
    props: ['id', 'img', 'marketName', 'value'],
    computed: {
        ...mapState(['dbIP', 'isLoggedIn', 'username', 'messages'])
    },
    methods: {
        purches: function(){
            this.$store.dispatch('pushMessage', 'hello, world');
        }
    }
}
</script>

<template>
    <div>
        <img :src="img" alt="test img" class="h-24 border-solid border-1 m-auto">
        <div>{{ marketName }}</div>
        <div>
            ￥{{ value }}
            <button v-if="this.isLoggedIn" v-on:click="purches()" class="bg-blue-400 border-2 border-blue-400 rounded-lg text-white">购买</button>
        </div>
    </div>
</template>
