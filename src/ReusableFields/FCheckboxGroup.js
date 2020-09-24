import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { getHelperText, useIsMount, MemoField, getEmptyObject } from './FieldUtils';

export default function FCheckboxGroup (props) {
  const {
    getFormControlLabelProps = getEmptyObject, getCheckboxProps = getEmptyObject, form, fieldKeyPath, validation,
    checkboxOptions, controlType = 'checkbox', validateOnChange = true
  } = props;
  const fieldMetaData = form.getFieldMetaData(fieldKeyPath);

  const value = form.getFieldValue(fieldKeyPath, []);

  const isMount = useIsMount();
  useEffect(() => {
    if (validateOnChange && !isMount) {
      const validator = form.getValidator(fieldKeyPath, value);
      validator && validator();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.length]);

  const handleChange = (event) => {
    const newValue = [...value];
    const checked = event.target.checked;
    const name = event.target.name;
    if (checked) {
      newValue.push(name);
    } else {
      const index = value.indexOf(name);
      newValue.splice(index, 1);
    }
    form.setFieldValue(fieldKeyPath, newValue);
  };

  let ControlComp;
  if (controlType === 'switch') {
    ControlComp = Switch;
  } else {
    ControlComp = Checkbox;
  }

  return (
    <>
      {checkboxOptions.map((option, i) => (
        <FormControlLabel
          key={i}
          label={option.label}
          control={(
            <ControlComp
              name={option.value}
              checked={value.includes(option.value)}
              onChange={handleChange}
              {...getCheckboxProps({ value: value, option })}
            />
          )}
          ref={form.registerField(fieldKeyPath, {
            validation: validation
          })}
          {...getFormControlLabelProps({ value: value, option })}
        />
      ))}
      {getHelperText(fieldMetaData)}
    </>
  );
}

FCheckboxGroup.propTypes = {
  getFormControlLabelProps: PropTypes.func,
  getCheckboxProps: PropTypes.func,
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validation: PropTypes.func,
  checkboxOptions: PropTypes.array,
  validateOnChange: PropTypes.bool,
  controlType: PropTypes.string
};

export function MemoFCheckboxGroup (props) {
  return (
    <MemoField
      Field={FCheckboxGroup}
      props={props}
    />
  );
}
