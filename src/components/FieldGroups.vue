<template>
  <div class="groups-wrapper">
    <h3>Feild Groups</h3>
    <small>Choose a group for this input</small>
    <div class="group-list">
      <div class="group-list__item"
           v-for="group in list" :key="group.id"
           :class="{ 'is-active': group.id === activeFieldGroup }"
           @click="toogleSelected(group.id)">
        <b>{{ group.name }}</b>
        <small>{{ group.input_size }} other inputs</small>
      </div>
    </div>
    <button class="button">Add a new group</button>
  </div>
</template>

<script>
export default {
  name: 'FieldGroups',
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    activeFieldGroup: {
      type: [String, Number],
      default: '',
    },
    onSelect: {
      type: Function,
      required: true,
    },
  },
  methods: {
    toogleSelected(id) {
      const value = this.activeFieldGroup === id ? '' : id;
      this.onSelect(value);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "src/assets/variables";

  .groups-wrapper {
    background-color: $porcelain;
    border: 2px solid $alto;
    border-radius: 5px;
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: $gap/2;
    .group-list {
      flex: 1;
      overflow: auto;
      margin-top: $gap;
      &__item {
        background: $white;
        display: flex;
        flex-direction: column;
        padding: $gap/4;
        border-radius: 2.5px;
        margin-bottom: 10px;
        border: 1px solid $alto;
        cursor: pointer;
        &.is-active {
          background: $blue-lagoon;
          color: $white;
        }
      }
    }
  }
</style>
