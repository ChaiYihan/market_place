<script>
import { mapState } from 'vuex'
export default {
    props: ['assetid', 'img', 'marketName', 'value', 'ownerId'],
    computed: {
        ...mapState(['dbIP2', 'isLoggedIn', 'userName', 'messages', 'balance', 'id'])
    },
    data(){
        return{
            purchaseUrl: '',
        }
    },
    created() {
        this.purchaseUrl = this.dbIP2+'/asset/purchase';
    },
    methods: {
        purchase: function(){
            var data = {
                'username': this.userName,
                'assetID': this.assetid,
            };
            console.log(this.purchaseUrl);
            fetch(this.purchaseUrl, {
                body: JSON.stringify(data), // must match 'Content-Type' header
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, same-origin, *omit
                headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
                },
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, cors, *same-origin
                redirect: 'follow', // manual, *follow, error
                referrer: 'no-referrer', // *client, no-referrer
            }).then(response => response.json()).then(res => {
                console.log(res);
                if(res.status=='true'){
                    // this.balance = res.balance;
                    this.$store.dispatch('setBalance', res.balance);
                    this.$store.dispatch('pushMessage', 'Purches fuccess! Your sanity is '+this.balance+'.');
                }else{
                    this.$store.dispatch('pushMessage', 'Purches failed! You can\'t afford it.');
                }
            })
            // this.$store.dispatch('pushMessage', 'success');
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
            <button v-if="this.isLoggedIn && ownerId==null" v-on:click="purchase()" class="bg-blue-400 border-2 border-blue-400 rounded-lg text-white">购买</button>
            <button v-else-if="this.isLoggedIn && ownerId==this.id" class="bg-blue-400 border-2 border-blue-400 rounded-lg text-white">您已购买</button>
            <button v-else-if="this.isLoggedIn && ownerId!=this.id" class="bg-blue-400 border-2 border-blue-400 rounded-lg text-white">已被购买</button>
        </div>
    </div>
</template>
