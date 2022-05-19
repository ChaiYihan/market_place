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
        resp = fetch('http://192.168.1.106:8080/asset/1', {
            method: 'GET',
            mode: 'cors'
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