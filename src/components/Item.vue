<script>
export default {
    props: ['img', 'name', 'price']
}
</script>

<template>
    <div>
        <img :src="img" alt="test img">
        <div>{{ name }}</div>
        <div>{{ price }}</div>
    </div>
</template>