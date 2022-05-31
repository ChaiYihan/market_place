<script>
export default {
    props: ['text']
}
</script>

<template>
  <div>
    <button
      class="px-6 py-2 text-sm font-semibold uppercase rounded-sm text-white transition bg-gradient-to-r from-purple-500 to-blue-500"
    >{{ text }}</button>
  </div>
</template>