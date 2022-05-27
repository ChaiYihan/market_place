<script>
export default {
    props: ['img', 'marketName', 'value']
}
</script>

<template>
    <div>
        <img :src="img" alt="test img">
        <div>{{ marketName }}</div>
        <div>￥{{ value }}</div>
    </div>
</template>
