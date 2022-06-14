<!-- unuse -->
<script>
import { mapState } from 'vuex';
export default {
    props: ['message','hei'],
    computed: {
        ...mapState(['messages'])
    },
}
</script>

<script>

</script>

<template>
  <div v-if="this.messages" class="fixed w-96 right-0 bottom-0 text-center text-blue-100">
      <div v-for="pos in this.messages.length" class="p-2 m-2 bg-blue-600 rounded-lg border-blue-800 border-solid border-2 h-24 border-black float-up ">
        {{this.messages[pos-1]}}
      </div>
    </div>
</template>