<template>
  <div class="input-container">
    <div class="input-title">
      <h1>{{ getTitle }}</h1>
    </div>
    <div class="input-content">
      <div class="field-types-wrap">
        <FieldTypes
          :list="fieldTypeList"
          :active-field="input.fieldTypeId"
          :on-select="onSelectFieldType" />
      </div>
      <div class="field-details-wrap">
        <FieldDetails
          ref="fieldDetails"
          :details="input.fieldDetails"
          :field-group-list="fieldGroups"
          :on-update="onUpdateFieldDetails"
          :tag-groups="tagGroups" />
      </div>
    </div>
    <div class="input-actions">
      <button class="button is-primary"
              :disabled="disableSaveButton"
              @click="onSave">Save Changes</button>
      <div class="button-group">
        <button class="button" @click="onCancel">Cancel Changes</button>
        <button class="button is-danger" @click="onDelete">Delete Changes</button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle, no-console */
// Components
import Navigation from '@/components/Navigation';
import FieldTypes from '@/components/FieldTypes';
import FieldDetails from '@/components/FieldDetails';

// Mocks
import fieldTypeList from '@/mock/field-type-list.json';
import fieldGroups from '@/mock/field-groups.json';
import tagGroups from '@/mock/tag-groups.json';
import InputsMock from '@/mock/Input.json';

// Heplers
import formBus from '@/utils/form-bus';
import InputModel from '@/models/inputModel';

export default {
  name: 'Home',
  components: {
    Navigation,
    FieldTypes,
    FieldDetails,
  },
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      fieldTypeList,
      fieldGroups,
      tagGroups,
      input: {},
      disableSaveButton: false,
    };
  },
  computed: {
    getTitle() {
      return `${this.input.name} - Add Field`;
    },
    getBaseInputObject() {
      return InputsMock.find(inputMock => inputMock.id === Number.parseInt(this.id, 10));
    },
  },
  created() {
    this.input = new InputModel(this.getBaseInputObject);
  },
  beforeDestroy() {
    formBus.$off('validate-form');
    formBus.$off('reset-form');
  },
  methods: {
    onSelectFieldType(fieldType) {
      let newInputModel;

      if (this.input.fieldTypeId === fieldType.id) {
        newInputModel = new InputModel({
          ...this.input,
          fieldTypeId: '',
        });
      } else {
        newInputModel = new InputModel({
          ...this.input,
          fieldTypeId: fieldType.id,
        });
      }

      this.input = newInputModel;
    },
    onUpdateFieldDetails(details) {
      const newInputModel = new InputModel({
        ...this.input,
        fieldDetails: details,
      });
      this.input = newInputModel;
    },
    onSave() {
      formBus.$emit('validate-form', (state) => {
        if (state) {
          const serialized = InputModel.serialize(this.input, { InputModel });
          const input = JSON.parse(serialized)._value;
          console.log('Save action', input);
        }
      });
    },
    onCancel() {
      this.input = new InputModel(this.getBaseInputObject);
      this.$nextTick(() => {
        formBus.$emit('reset-form');
      });
    },
    onDelete() {
      console.log('Delete', this.input.name);
    },
  },
};
</script>

<style lang="scss">
  @import "src/assets/variables";

  .input-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: $gap;
    .input-title {
      margin-bottom: $gap;
      h1 {
        font-weight: 400;
      }
    }
    .input-content {
      display: flex;
      flex: 1;
      background: $white;
      border: 2px solid $alto;
      .field-types-wrap {
        flex-basis: 300px;
        display: flex;
        flex-direction: column;
      }
      .field-details-wrap {
        flex: 1;
        display: flex;
      }
    }

    .input-actions {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
    }
  }

</style>
