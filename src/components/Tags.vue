<template>
  <div class="tags-wrapper">
    <h2>Tags</h2>
    <div class="groups">
      <span>Tags Group</span>
      <div class="button-group">
        <button class="tag tag-group"
                type="button"
                v-for="(group, key) in list" :key="key"
                :class="{ 'is-selected': activeTags.indexOf(group.id) !== -1 }"
                @click="onSelect(group)">
          {{ group.name }}
        </button>
      </div>
    </div>
    <div class="tags">
      <span>Tags</span>
      <div class="button-group">
        <button v-for="(tag, index) in getTagList"
                :key="index" class="tag" type="button">
          {{ tag.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tags',
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    activeTags: {
      type: Array,
      default() {
        return [];
      },
    },
    onSelect: {
      type: Function,
      required: true,
    },
  },
  computed: {
    getTagList() {
      return this.list
        .filter(l => this.activeTags.indexOf(l.id) !== -1)
        .reduce((p, c) => {
          p.push(...c.tags);
          return p;
        }, []);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "src/assets/variables";

  .tags-wrapper {
    display: grid;
    grid-column-gap: 22px;
    grid-template-columns: 50% auto;
    span {
      display: block;
      margin-bottom: $gap/2;
      font-weight: 500;
    }
    h2 {
      margin-bottom: $gap;
    }
    button {
      margin-right: 5px;
    }
    .groups {
      grid-column-start: 1;
      grid-column-end: 2;
    }
    .tag {
      display: inline-block;
      background-color: $aqua-haze;
      padding: 4px;
      font-weight: bold;
      border-radius: 3px;
      margin: 0 5px 5px 0;
      &.tag-group {
        cursor: pointer;
      }
      &.is-selected {
        background: $blue-lagoon;
        color: $white;
      }
    }
  }
</style>
