<script>
import Item from '../components/Item.vue'
import PageButton from '../components/PageButton.vue'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            items: [],
            pages: [],
            showPage: 0,
            totPage: 0,
            assetUrl: 'http://192.168.43.191:8081'
        }
    },
    components: {
        Item,
        PageButton,
    }, 
    computed :{
        ...mapState(['dbIP'])
    },
    created() {
        this.assetUrl = this.dbIP;
        const url = this.assetUrl+'/asset/batch/0';
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
            const url = this.assetUrl+'/asset/batch/'+(this.showPage-1);
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
            })
        }
    }

}
</script>

<template>
    <div class="h-screen">
    <div class="m-auto float-none w-5/6 h-3/4 border-solid border-2 bg-gray-300">
            <div v-for="item in items" :key="item.id" class="m-2 p-2 text-center w-48 h-44 float-left bg-white m-1">
                <Item :id="item.id" :img="item.uri" :marketName="item.marketName" :value="item.value" />
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
