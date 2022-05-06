<script>
export default {
    data() {
        return {
            img: 'https://picsum.photos/200/300',
            name: 'Item name',
            price: '$100',
        }
    }
}
</script>

<template>
    <div>
        <img :src="img" alt="test img">
        <div>{{ name }}</div>
        <div>{{ price }}</div>
    </div>
</template>