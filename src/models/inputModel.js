/* eslint-disable no-underscore-dangle */
import { ObjectModel } from 'objectmodel';

ObjectModel.prototype.serialize = (instance, models) => {
  const names = Object.keys(models);
  return JSON.stringify(instance, (key, value) => {
    const modelName = names.find(name => value instanceof models[name]);
    if (modelName && key !== '_value') {
      return { _type: modelName, _value: value };
    }
    return value;
  }, '\t');
};

ObjectModel.prototype.parse = (json, models) => JSON.parse(json, (key, o) => {
  if (o && o._type in models) {
    return new models[o._type](o._value);
  }
  return o;
});

const InputModel = ObjectModel({
  id: [Number],
  name: String,
  fieldTypeId: [Number, String],
  fieldDetails: {
    display_name: String,
    reference_name: String,
    default_value: String,
    custom_validation: [RegExp, String],
    tags: Array,
    fieldGroupId: [Number, String],
  },
}).defaults({
  name: '',
  fieldTypeId: '',
  fieldDetails: {
    display_name: '',
    reference_name: '',
    default_value: '',
    custom_validation: '',
    tags: [],
    fieldGroupId: '',
  },
});

export default InputModel;
