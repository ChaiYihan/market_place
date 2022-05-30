<script>
export default {
    props: ['rank', 'id', 'username', 'exp']
}
</script>

<template>
    <td>{{rank}}</td>
    <td>{{id}}</td>
    <td>{{username}}</td>
    <td>{{exp}}</td>
</template>
