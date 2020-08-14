import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { getHelperText, useIsMount, MemoField, getEmptyObject } from './FieldUtils';

export default function FRadioGroup (props) {
  const {
    getFormControlLabelProps = getEmptyObject, getRadioProps = getEmptyObject, form, fieldKeyPath, validation,
    radioOptions, validateOnChange = true
  } = props;
  const fieldMetaData = form.getFieldMetaData(fieldKeyPath);

  const value = form.getFieldValue(fieldKeyPath);

  const isMount = useIsMount();
  useEffect(() => {
    if (validateOnChange && !isMount) {
      const validator = form.getValidator(fieldKeyPath, value);
      validator && validator();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (event) => {
    const value = event.target.value;
    form.setFieldValue(fieldKeyPath, value);
  };

  return (
    <>
      {radioOptions.map((option, i) => (
        <FormControlLabel
          key={i}
          label={option.label}
          value={option.value}
          control={(
            <Radio checked={option.value === value} onChange={handleChange} {...getRadioProps({ value: value, option })} />
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

FRadioGroup.propTypes = {
  getFormControlLabelProps: PropTypes.func,
  getRadioProps: PropTypes.func,
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validation: PropTypes.func,
  validateOnChange: PropTypes.bool,
  radioOptions: PropTypes.array
};

export function MemoFRadioGroup (props) {
  return (
    <MemoField
      Field={FRadioGroup}
      props={props}
    />
  );
}
