<script>
export default {
    data(){
        return{
            logStatu: 'not logged in',
            user: '',
            logging: 0,
        }
    },
    methods: {
        alterX: function(s){
            return 1-s;
        }
    }
    // props: ['logStatu', 'login', 'logout']
}
// logStatu='not logged in';
</script>

<template>
    <div v-on:click="logging=alterX(logging)">
        <div v-if=" logStatu === 'not logged in' ">
            <div class="px-6 py-2 text-sm font-semibold uppercase rounded-sm text-white transition bg-gradient-to-r from-purple-500 to-blue-500">
                Log in
            </div>
        </div>
        <div v-else>
            <div class="px-6 py-2 text-sm font-semibold uppercase rounded-sm text-white transition bg-gradient-to-r from-purple-500 to-blue-500">
                Log out
            </div>
        </div>
    </div>
    <div v-if="logging === 1" class="fixed top-1/2 left-1/2 -mx-48 -my-48 w-96 h-60 border-solid border-8 rounded-lg border-blue-300 bg-blue-100">
        <div class="border-none border-2 border-black w-56 mx-auto my-8">
            nickname: <input type="text" class="w-32" /><br/><br/>
            passowrd: <input type="password" class="w-32" /><br/>
        </div>
        <div>
            <button class="border-solid border-2 border-black" >Login</button>
        </div>
    </div>
</template>
