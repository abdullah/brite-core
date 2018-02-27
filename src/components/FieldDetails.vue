<template>
  <div class="field-details">
    <h2>Field Details</h2>
    <div class="contentt">
      <div class="inputs-container">
        <FieldInputsForm
          :form="details"
          :on-update="onUpdateInputsForm" />
        <Tags :list="tagGroups"
              :active-tags="details.tags"
              :on-select="onSelectTagGroup" />
      </div>
      <div class="group-container">
        <FieldGroups
          :list="fieldGroupList"
          :active-field-group="details.fieldGroupId"
          :on-select="onSelectFieldGroup"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Tags from '@/components/Tags';
import FieldGroups from '@/components/FieldGroups';
import FieldInputsForm from '@/components/FieldInputsForm';

export default {
  name: 'FieldDetails',
  components: {
    Tags,
    FieldGroups,
    FieldInputsForm,
  },
  props: {
    details: {
      type: Object,
      required: true,
    },
    fieldGroupList: {
      type: Array,
      default() {
        return {};
      },
    },
    tagGroups: {
      type: Array,
      default() {
        return {};
      },
    },
    onUpdate: {
      type: Function,
      required: true,
    },
  },
  methods: {
    onSelectFieldGroup(fieldGroupId) {
      const details = Object.assign({}, {
        ...this.details,
        fieldGroupId,
      });
      this.onUpdate(details);
    },
    onSelectTagGroup(tagGroup) {
      const details = Object.assign({}, this.details);
      const exist = details.tags.includes(tagGroup.id);

      if (exist) {
        details.tags = details.tags.filter(tag => tag !== tagGroup.id);
      } else {
        details.tags.push(tagGroup.id);
      }

      this.onUpdate(details);
    },
    onUpdateInputsForm(form) {
      const details = Object.assign({}, {
        ...this.details,
        ...form,
      });
      this.onUpdate(details);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "src/assets/variables";

  .field-details {
    background-color: $white;
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: $gap;
    .contentt {
      display: flex;
      flex: 1;
      .inputs-container {
        display: flex;
        flex-direction: column;
        flex: 1;
      }
      .group-container {
        display: flex;
        flex-basis: 330px;
        padding-left: 20px;
      }
    }
  }


</style>
