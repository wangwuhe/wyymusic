<template>
  <div id="app">
    <top />
    <index />
  </div>
</template>

<script>
import top from '@/components/top.vue';
import index from '@/components/index.vue';
export default {
  name: 'app',
  components: {
    top,
    index
  }
};
</script>

<style >

</style>
