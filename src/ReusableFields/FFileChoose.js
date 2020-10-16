import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { getHelperText, useIsMount, MemoField, getEmptyObject } from './FieldUtils';

export default function FFileChoose (props) {
  const { getInputProps = getEmptyObject, form, fieldKeyPath, validation, validateOnChange = true } = props;
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

  const handleChange = (e) => {
    form.setFieldValue(fieldKeyPath, e.target.value);
  };

  return (
    <>
      <input
        type='file'
        onChange={(e) => handleChange(e)}
        value={value || ''}
        ref={form.registerField(fieldKeyPath, {
          validation: validation
        })}
        {...getInputProps({ value: value })}
      />
      {getHelperText(fieldMetaData)}
    </>
  );
}

FFileChoose.propTypes = {
  getInputProps: PropTypes.func,
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validateOnChange: PropTypes.bool,
  validation: PropTypes.func
};

export function MemoFFileChoose (props) {
  return (
    <MemoField
      Field={FFileChoose}
      props={props}
    />
  );
}
