<script>
export default {
    props: ['num']
}
</script>

<template>
    <button v-on:click="showPage=this.num">{{ num }}</button>
</template>
