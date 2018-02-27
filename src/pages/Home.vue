<template>
  <div class="input-page">
    <router-link
      v-for="(input, index) in list"
      :key="index"
      :to="{ name: 'input-editor', params: { id: input.id } }">{{ input.name }}</router-link>
  </div>
</template>

<script>

import InputsMock from '@/mock/Input.json';

export default {
  name: 'InputPage',
  data() {
    return {
      list: InputsMock,
    };
  },
};
</script>

<style scoped>
  .input-page {
    padding: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  a {
    font-size: 20px
  }

</style>
