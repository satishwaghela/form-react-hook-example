import React from 'react';
import PropTypes from 'prop-types';

import { MemoField } from './FieldUtils';

export default function FPlaceholderField (props) {
  const { form, fieldKeyPath, validation } = props;

  return (
    <>
      <div
        ref={form.registerField(fieldKeyPath, {
          validation: validation
        })}
      />
    </>
  );
}

FPlaceholderField.propTypes = {
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validation: PropTypes.func
};

export function MemoFPlaceholderField (props) {
  return (
    <MemoField
      Field={FPlaceholderField}
      props={props}
    />
  );
}
