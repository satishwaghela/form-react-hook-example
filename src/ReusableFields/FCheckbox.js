import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { getHelperText, useIsMount, MemoField, getEmptyObject } from './FieldUtils';

export default function FCheckbox (props) {
  const {
    getFormControlLabelProps = getEmptyObject, getCheckboxProps = getEmptyObject, form, fieldKeyPath, validation,
    controlType = 'checkbox', validateOnChange = true
  } = props;
  const fieldMetaData = form.getFieldMetaData(fieldKeyPath);

  const value = form.getFieldValue(fieldKeyPath, false);

  const isMount = useIsMount();
  useEffect(() => {
    if (validateOnChange && !isMount) {
      const validator = form.getValidator(fieldKeyPath, value);
      validator && validator();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (event) => {
    const value = event.target.checked;
    form.setFieldValue(fieldKeyPath, value);
  };

  let ControlComp;
  if (controlType === 'switch') {
    ControlComp = Switch;
  } else {
    ControlComp = Checkbox;
  }

  return (
    <>
      <FormControlLabel
        control={(
          <ControlComp
            checked={value}
            onChange={handleChange}
            ref={form.registerField(fieldKeyPath, {
              validation: validation
            })}
            {...getCheckboxProps({ value: value })}
          />
        )}
        {...getFormControlLabelProps({ value: value })}
      />
      {getHelperText(fieldMetaData)}
    </>
  );
}

FCheckbox.propTypes = {
  getFormControlLabelProps: PropTypes.func,
  getCheckboxProps: PropTypes.func,
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validation: PropTypes.func,
  validateOnChange: PropTypes.bool,
  controlType: PropTypes.string
};

export function MemoFCheckbox (props) {
  return (
    <MemoField
      Field={FCheckbox}
      props={props}
    />
  );
}
