<script>
import Rank from '../components/Rank.vue'
export default {
    data() {
        return {
            ranks: [],
            pages: [],
            showPage: 0,
            totPage: 0,
        }
    },
    components: {
        Rank,
    }, 

    created() {
        const url = 'http://192.168.1.112:8081/user/rank/0';
        const resp = fetch(url, {
            method: 'GET',
            mode: 'cors'
        }).then(resp => resp.json()).then(data => {
            this.ranks = []
            this.pages = []
            this.totPage = data.pages;
            let rank1 = {
                "rank": "rank",
                "id": "id",
                "username": "username",
                "exp": "exp",
            };
            this.ranks.push(rank1);
            let cnt = 0
            for(let rank in data.users.results){
                cnt+=1;
                let rank1 = {
                "rank": cnt,
                "id": data.users.results[rank].id,
                "username": data.users.results[rank].username,
                "exp": data.users.results[rank].exp,
            };
                this.ranks.push(rank1);
            }
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
            const url = 'http://192.168.1.112:8081/user/rank/'+(this.showPage-1);
            const resp = fetch(url, {
                method: 'GET',
                mode: 'cors'
            }).then(resp => resp.json()).then(data => {
                this.ranks = []
            this.pages = []
            this.totPage = data.pages;
            let rank1 = {
                "rank": "rank",
                "id": "id",
                "username": "username",
                "exp": "exp",
            };
            this.ranks.push(rank1);
            let cnt = 0
            for(let rank in data.users.results){
                cnt+=1;
                let rank1 = {
                "rank": cnt,
                "id": data.users.results[rank].id,
                "username": data.users.results[rank].username,
                "exp": data.users.results[rank].exp,
            };
                this.ranks.push(rank1);
            }
            for(let page=1; page<=this.totPage; ++page){
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
    <div class="h-screen">
        <div class="h-2/3 w-1/3 m-auto bg-gray-300">
            <table class="w-full m-6">
                <tr v-for="rank in ranks" :key="rank.rank" class="">
                    <Rank :rank="rank.rank" :id="rank.id" :username="rank.username" :exp="rank.exp" />
                </tr>
            </table>
        </div>
        <div class="m-auto p-6 w-1/3 h-12">
            <p v-for="page in pages" :key="page.num" class="text-center w-12 h-12 float-left">
                <!-- <PageButton :num="page.num" /> -->
                <a v-on:click="changePage(showPage=page.num)">{{ page.num }}</a>
            </p>
        </div>
    </div>
</template>
