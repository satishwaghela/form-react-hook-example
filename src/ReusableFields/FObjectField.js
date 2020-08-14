import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { getHelperText, useIsMount, MemoField, getEmptyObject } from './FieldUtils';

export default function FObjectField (props) {
  const { form, fieldKeyPath, validation, Comp, getCompProps = getEmptyObject, validateOnChange = true } = props;
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

  return (
    <Comp
      form={form}
      fieldKeyPath={fieldKeyPath}
      onRef={form.registerField(fieldKeyPath, {
        validation: validation
      })}
      helperText={getHelperText(fieldMetaData)}
      {...getCompProps({ value: value })}
    />
  );
}

FObjectField.propTypes = {
  Comp: PropTypes.any,
  getCompProps: PropTypes.func,
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validateOnChange: PropTypes.bool,
  validation: PropTypes.func
};

export function MemoFObjectField (props) {
  return (
    <MemoField
      Field={FObjectField}
      props={props}
    />
  );
}
