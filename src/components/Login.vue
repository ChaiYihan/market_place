<script>
import Button from './forms/Button.vue'
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState(['userName', 'isLoggedIn', 'dbIP'])
    },
    data(){
        return{
            logStatu: 'not logged in',
            username: '',
            password: '',
            logging: 0,
            checkurl: '',
            regisurl: '',
        }
    },
    created() {
        this.checkurl = this.dbIP+'/user/check';
        this.regisurl = this.dbIP+'/register';
    },
    components: {
        Button,
    },
    methods: {
        alterLogin: function(){
            this.logging = 1-this.logging;
        },
        Login: function(){
            console.log(this.username, this.password);
            var data = {
                    "username" : this.username,
                    "password" : this.password,
            }
            fetch(this.checkurl,{
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
                if(res.res==='True'){
                    // this.logStatu = 'logged in';
                    console.log('log successfully,', this.username);
                    this.alterLogin();
                    this.logStatu = 'logged in';

                    this.$store.dispatch('login', this.username)
                }
            });
        },
        Register: function(){
            console.log(this.username, this.password);
            var data = {
                    "username" : this.username,
                    "password" : this.password,
            }
            fetch(this.regisurl,{
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
            });
        },
        Update: function(){
            this.username =  document.getElementById('nickname').value;
            this.password = document.getElementById('password').value;
        },
        Logout: function(){
            this.logStatu = 'not logged in';
            this.alterLogin();
            this.$store.dispatch('logout');
        },
    }
}
</script>

<template>
    <div v-on:click="alterLogin()">
        <div v-if=" logStatu === 'not logged in' ">
            <Button :text="'login'"></Button>
        </div>
        <div v-else>
            <Button :text="this.username" ></Button>
        </div>
    </div>
    <div v-if="logging === 1 && logStatu === 'not logged in' " class="fixed top-1/2 left-1/2 -mx-48 -my-48 w-96 h-60 border-solid border-8 rounded-lg border-blue-300 bg-blue-100">
        <div class="border-none border-2 border-black w-56 mx-auto my-8">
            nickname: <input id="nickname" type="text" v-on:change="Update()" class="w-32" /><br/><br/>
            passowrd: <input id='password' type="password" v-on:change="Update()" class="w-32" /><br/>
        </div>
        <div>
            <Button :text="'login'" v-on:click="Login()" class="mx-24 my-12"></Button>
            <Button :text="'register'" v-on:click="Register()" class="mx-48 -my-20"></Button>
        </div>
    </div>
    <div v-if="logging === 1 && logStatu === 'logged in' " class="fixed top-1/2 left-1/2 -mx-48 -my-48 w-96 h-60 border-solid border-8 rounded-lg border-blue-300 bg-blue-100" >
        <p>确定登出？</p>
        <Button :text="'log out'" v-on:click="Logout()" ></Button>
    </div>
</template>
