import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { getHelperText, useIsMount, MemoField, getEmptyObject } from './FieldUtils';

export default function FArrayField (props) {
  const {
    form, fieldKeyPath, validation, Comp, getCompProps = getEmptyObject,
    ItemComp, getItemCompProps = getEmptyObject, validateOnChange = true } = props;
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

  useEffect(() => {
    form.setArrayItemUniqeKeyMeta(fieldKeyPath);
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
    >
      {(value || []).map((itemValue, i) => {
        const itemFieldKeyPath = `${fieldKeyPath}.${i}`;
        const metaData = form.getFieldMetaData(itemFieldKeyPath);
        return (
          <ItemComp
            key={metaData.ukey || i}
            fieldKeyPath={itemFieldKeyPath}
            arrayFieldKeyPath={fieldKeyPath}
            index={i}
            {...getItemCompProps({ value: itemValue, index: i })}
          />
        );
      })}
    </Comp>
  );
}

FArrayField.propTypes = {
  Comp: PropTypes.any,
  getCompProps: PropTypes.func,
  ItemComp: PropTypes.any,
  getItemCompProps: PropTypes.func,
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validateOnChange: PropTypes.bool,
  validation: PropTypes.func
};

export function MemoFArrayField (props) {
  return (
    <MemoField
      Field={FArrayField}
      props={props}
    />
  );
}
