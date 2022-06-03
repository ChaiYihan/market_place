<script setup>
import { computed } from 'vue';
import { mapState } from 'vuex';
import Navbar from './components/Navbar.vue';
const links = [
  {id: 1, name: 'Home', path: '/'},
  {id: 2, name: 'About Us', path: '/about'},
  {id: 3, name: 'Docs', path: '/docs'},
  {id: 4, name: 'Market', path: '/market'},
  {id: 5, name: 'Rank', path: '/rank'},
];
computed({
  ...mapState(['messages'])
})

</script>


<template>
  <Navbar title="DemoApp" :links="links" />
  <div class="pt-20">
    <router-view />
  </div>
  <button @click="this.$store.dispatch('pushMessage', 'hello, world')">Test</button>
  <div>{{ this.messages }}</div>
</template>

<style>
</style>
