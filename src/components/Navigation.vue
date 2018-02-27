<template>
  <nav class="bc-navigation">
    <div class="brand-logo">
      <router-link to="/">BriteCore</router-link>
    </div>
    <div class="menu">
      <router-link class="menu__link" to="/">Inputs</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
};
</script>

<style lang="scss" scoped>
  @import "src/assets/variables";

  nav.bc-navigation {
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 30px;
    background-color: #004953;
    .brand-logo {
      color: $white;
      text-align: center;
      font-weight: bold;
      font-size: 20px;
    }
    .menu {
      margin-left: 100px;
      &__link {
        margin: 0 5px;
        color: $white;
        text-decoration: none;
      }
    }
    a {
      color: inherit;
    }
  }
</style>
