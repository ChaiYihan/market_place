<script>
import Item from '../components/Item.vue'
import PageButton from '../components/PageButton.vue'
export default {
    data() {
        return {
            items: [],
            pages: [],
            showPage: 0,
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
            for(let page=1; page<=data.pages; ++page){
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
                this.items = []
                this.pages = []
                this.items = data.assets.results;
                for(let page=1; page<=data.pages; ++page){
                    var page1 = {
                        "num": page,
                    }
                    this.pages.push(page1);
                }
            });
        }
    }

}
</script>

<template>
    <div class="float-none w-full h-96 border-solid border-2 bg-gray-300">
        <div v-for="item in items" :key="item.id" class="w-48 h-44 float-left bg-white m-1">
            <Item :img="item.uri" :marketName="item.marketName" :value="item.value" />
        </div>
    </div>
    <div class="m-6">
        <div v-for="page in pages" :key="page.num" class="border-2 borler-solid w-12 h-12 float-left">
            <!-- <PageButton :num="page.num" /> -->
            <button v-on:click="changePage(showPage=page.num)">{{ page.num }}</button>
        </div>
    </div>
</template>
