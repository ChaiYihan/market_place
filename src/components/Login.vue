<script>
import Button from './forms/Button.vue'
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState(['userName', 'isLoggedIn', 'dbIP', 'id', 'exp', 'balance'])
    },
    data(){
        return{
            logStatu: 'not logged in',
            username: '',
            password: '',
            logging: 0,
            checkurl: '',
            regisurl: '',
            message: '',
        }
    },
    created() {
        this.checkurl = this.dbIP+'/login';
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
                if(res.statue==true){
                    // console.log('log successfully,', this.username);
                    this.alterLogin();
                    this.logStatu = 'logged in';
                    this.message = res.message;
                    this.$store.dispatch('login', res);
                }else{
                    this.$store.dispatch('pushMessage', 'Login failed.');
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
        <div v-if=" this.isLoggedIn === false ">
            <Button :text="'login'"></Button>
        </div>
        <div v-else>
            <Button :text="this.userName" ></Button>
        </div>
    </div>
    <div v-if="logging === 1 && this.isLoggedIn === false " class="fixed top-1/2 left-1/2 -mx-48 -my-48 w-96 h-60 border-solid border-8 rounded-lg border-blue-300 bg-blue-100">
        <div class="border-none border-2 border-black w-56 mx-auto my-8">
            nickname: <input id="nickname" type="text" v-on:change="Update()" class="w-32" /><br/><br/>
            passowrd: <input id='password' type="password" v-on:change="Update()" class="w-32" /><br/>
        </div>
        <div>
            <Button :text="'login'" v-on:click="Login()" class="mx-24 my-12"></Button>
            <Button :text="'register'" v-on:click="Register()" class="mx-48 -my-20"></Button>
        </div>
    </div>
    <div v-if="logging === 1 && this.isLoggedIn === true " class="text-center fixed top-1/2 left-1/2 -mx-48 -my-48 w-96 h-60 border-solid border-8 rounded-lg border-blue-300 bg-blue-100" >
        <table class="m-auto w-48 my-6">
            <tr>
                <th class="font-mono text-lg">nickname</th>
                <th class="text-blue-600">{{this.userName}}</th>
            </tr>
            <tr>
                <th class="font-mono text-lg">id</th>
                <th class="text-blue-600">{{this.id}}</th>
            </tr>
            <tr>
                <th class="font-mono text-lg">exp</th>
                <th class="text-blue-600">{{this.exp}}</th>
            </tr>
            <tr>
                <th class="font-mono text-lg">sanity</th>
                <th class="text-blue-600">{{this.balance}}</th>
            </tr>
        </table>
        <Button :text="'log out'" v-on:click="Logout()" ></Button>
    </div>
</template>
