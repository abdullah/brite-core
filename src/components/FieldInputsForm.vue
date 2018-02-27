<template>
  <div class="inputs-wrapper">
    <div class="columns">
      <div class="column">
        <div class="bc-field"
             :class="{ 'is-danger': errors.has('display_name') }">
          <span class="label">Display Label</span>
          <input type="text"
                 @input="emit"
                 v-validate="validationRules.display_name"
                 data-vv-as="Display name"
                 name="display_name"
                 v-model="model.display_name">
          <span class="message">For display purposes, spaces allowed</span>
          <span class="message error">{{ errors.first('display_name') }}</span>
        </div>
      </div>
      <div class="column">
        <div class="bc-field"
             :class="{ 'is-danger': errors.has('reference_name') }">
          <span class="label">Refence Name</span>
          <input type="text"
                 @input="emit"
                 v-validate="validationRules.reference_name"
                 data-vv-as="Reference name"
                 name="reference_name"
                 v-model="model.reference_name">
          <span class="message">Used to reference in calculations, no space allowed</span>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="bc-field"
             :class="{ 'is-danger': errors.has('default_value') }">
          <span class="label">Default Value</span>
          <input type="text"
                 @input="emit"
                 name="default_value"
                 data-vv-as="Default Value"
                 v-validate="validationRules.default_value"
                 v-model="model.default_value">
          <span class="message error">
            {{ errors.first('default_value') }}
          </span>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="bc-field"
             :class="{ 'is-danger': errors.has('custom_validation') }">
          <span class="label">Custom Validation</span>
          <input type="text"
                 @input="emit"
                 name="custom_validation"
                 data-vv-as="Custom Validation"
                 v-validate="validationRules.custom_validation"
                 v-model="model.custom_validation">
          <span class="message">Any regex pattern can be used for custom input validation</span>
          <span class="message error">
            {{ errors.first('custom_validation') }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import formBus from '@/utils/form-bus';
import validationRules from './FieldInputsFormValidationRules';

export default {
  props: {
    onUpdate: {
      type: Function,
      required: true,
    },
    form: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      validationRules,
      model: {},
    };
  },
  created() {
    this.setModel();
  },
  beforeDestroy() {
    formBus.$off('validate-form');
    formBus.$off('reset-form');
  },
  mounted() {
    formBus.$on('validate-form', (cb) => {
      this.$validator.validateAll().then((result) => {
        cb(result);
      });
    });

    formBus.$on('reset-form', () => {
      this.setModel();
      this.$validator.reset();
    });
  },
  methods: {
    setModel() {
      this.model = {
        display_name: this.form.display_name,
        default_value: this.form.default_value,
        reference_name: this.form.reference_name,
        custom_validation: this.form.custom_validation,
      };
    },
    emit() {
      this.onUpdate(Object.assign({}, this.model));
    },
  },
};
</script>

<style lang="scss">
  @import "src/assets/variables";

  .inputs-wrapper {
    width: 100%;
    overflow: scroll;
    .columns {
      display: grid;
      grid-template-columns: 50% auto;
      grid-column-gap: 20px;
      margin-bottom: $gap;
    }
  }
</style>
