import React, { useRef, useEffect, useMemo } from 'react';
import _ from 'lodash';
import FormHelperText from '@material-ui/core/FormHelperText';

export function useIsMount () {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};

export function getHelperText (fieldMetaData) {
  if (fieldMetaData.validating) {
    return <FormHelperText className='form-helper validating'>Validating...</FormHelperText>;
  } else if (fieldMetaData.error) {
    return <FormHelperText error className='form-helper error'>{fieldMetaData.error}</FormHelperText>;
  } else {
    return null;
  }
}

export function MemoField (memoProps) {
  const { Field, props } = memoProps;
  const { form, fieldKeyPath, memoDepArr = [] } = props;
  const value = form.getFieldValue(fieldKeyPath);
  const metaData = form.getFieldMetaData(fieldKeyPath);
  return useMemo(() => {
    return (
      <Field
        {...props}
      />
    );
    // eslint-disable-next-line
  }, [fieldKeyPath, value, _.isEmpty(metaData) ? '' : metaData, ...memoDepArr]);
};

export function getEmptyObject () {
  return {};
}
