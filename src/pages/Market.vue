<script>
import Item from '../components/Item.vue'
import PageButton from '../components/PageButton.vue'
export default {
    data() {
        return {
            items: [],
            pages: [],
            showPage: 0,
            totPage: 0,
        }
    },
    components: {
        Item,
        PageButton,
    }, 

    created() {
        const url = 'http://192.168.1.112:8081/asset/batch/0';
        const resp = fetch(url, {
            method: 'GET',
            mode: 'cors'
        }).then(resp => resp.json()).then(data => {
            this.items = []
            this.pages = []
            this.items = data.assets.results;
            this.totPage = data.pages;
            for(let page=1; page<=this.totPage; ++page){
                var page1 = {
                    "num": page,
                }
                this.pages.push(page1);
            }
        });
    },

    methods: {
        changePage: function(){
            const url = 'http://192.168.1.112:8081/asset/batch/'+(this.showPage-1);
            const resp = fetch(url, {
                method: 'GET',
                mode: 'cors'
            }).then(resp => resp.json()).then(data => {
                this.items = [];
                this.pages = [];
                this.items = data.assets.results;
                for(let page=1; page<=data.pages; ++page){
                    var page1 = {
                        "num": page,
                    }
                    this.pages.push(page1);
                }
                return 'send';
            }).then((val) => {
                console.log(val);
                return {
                    "username" : 'cyh',
                    "password" : '123456',
                };
            }).then(data =>  {
                return fetch("http://192.168.1.112:8081/user/check",{
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
                })
            }).then(response => response.json()).then(data => {
                console.log(data);
            })
        }
    }

}
</script>

<template>
    <div class="h-screen">
    <div class="m-auto float-none w-5/6 h-3/4 border-solid border-2 bg-gray-300">
            <div v-for="item in items" :key="item.id" class="m-2 p-2 text-center w-48 h-44 float-left bg-white m-1">
                <Item :img="item.uri" :marketName="item.marketName" :value="item.value" />
            </div>
        </div>
        <div class="m-auto p-6 w-5/6 h-12">
            <p v-for="page in pages" :key="page.num" class="text-center w-12 h-12 float-left">
                <!-- <PageButton :num="page.num" /> -->
                <a v-on:click="changePage(showPage=page.num)">{{ page.num }}</a>
            </p>
        </div>
    </div>
</template>
