<template>
  <div class="field-types">
    <h2>Field Types</h2>
    <div class="bc-field">
      <span class="label">Filter Types</span>
      <input type="text" v-model="filterValue"
             placeholder="Search">
    </div>
    <span class="no-result" v-if="filteredList.length === 0">
      No Result Found
    </span>
    <div class="field-types__list">
      <div class="field-types__card"
           v-for="(l, index) in filteredList"
           :key="index"
           :class="{ 'is-active': l.id === activeField }"
           @click="onSelect(l)">
        <header>
          <i class="mdi" :class="l.icon" />
          {{ l.name }}
        </header>
        <div class="meta-info">
          <small>Definition</small>
          <span>{{ l.definition }}</span>
        </div>
        <div class="meta-info">
          <small>Display Name</small>
          <span>{{ l.display_name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FieldTypes',
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    activeField: {
      type: [Number, String],
      default: '',
    },
    onSelect: {
      type: Function,
      default() {},
    },
  },
  data() {
    return {
      filterValue: '',
    };
  },
  computed: {
    filteredList() {
      return this.list.filter(item => item.name
        .toString()
        .toLowerCase()
        .indexOf(this.filterValue.toLowerCase()) >= 0);
    },
  },
};
</script>

<style lang="scss">
  @import "src/assets/variables";
   .field-types {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: $gap;
      background-color: $aqua-haze;
      &__list {
        flex: 1;
        overflow: scroll;
      }
      .bc-field {
        margin-bottom: 20px;
        flex: unset;
      }
      &__card {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        min-height: 150px;
        background: $white;
        margin-bottom: $gap/2;
        border-radius: 5px;
        padding: $gap/2;
        cursor: pointer;
        &.is-active {
          background: $blue-lagoon;
          color: $white;
        }

        header {
          font-size: 20px;
        }

        .meta-info {
          display: flex;
          flex-direction: column;
        }

      }
    }


</style>
