<script>
import Item from '../components/Item.vue'
export default {
    data() {
        return {
            items: [],
        }
    },
    components: {
        Item
    }, 

    created() {
        const url = 'http://127.0.0.1:8888/asset/batch/1.txt'
        const resp = fetch(url, {
            method: 'GET',
            //mode: 'cors'
        }).then(resp => resp.json()).then(data => {
            this.items.push(data);
        });
    }
}
</script>

<template>
    <div>
        <div v-for="item in items" :key="item.id">
            <Item :img="item.uri" :name="item.name" :price="item.value" />
        </div>
    </div>
</template>