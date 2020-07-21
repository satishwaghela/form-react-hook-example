import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { MemoFTextField } from './ReusableFields/FTextField';
import { MemoFArrayField } from './ReusableFields/FArrayField';
import { MemoFObjectField } from './ReusableFields/FObjectField';

export default function ArrayFieldExample (props) {
  const { form } = props;
  return (
    <MemoFArrayField
      form={form}
      fieldKeyPath='access'
      validation={(value = {}, formState, vCallback) => {
        if (!value || !value.length) {
          vCallback('Required!');
        } else {
          vCallback();
        }
      }}
      Comp={ArrayComp}
      CompProps={{
        form: form,
        fieldKeyPath: 'access'
      }}
      ItemComp={ArrayItem}
      ItemCompProps={{
        form: form
      }}
    />
  );
}

ArrayFieldExample.propTypes = {
  form: PropTypes.object
};

function ArrayComp ({ children, helperText, fieldKeyPath, form, onRef }) {
  const handleAdd = (e) => {
    form.arrayItemAdd(fieldKeyPath);
  };

  return (
    <>
      <table
        ref={onRef}
      >
        <tbody>
          {children.length ? children : (
            <tr><td>Click on plus button to add</td></tr>
          )}
        </tbody>
      </table>
      {helperText}
      <div>
        <IconButton onClick={handleAdd}><AddIcon /></IconButton>
      </div>
    </>
  );
}

ArrayComp.propTypes = {
  children: PropTypes.any,
  helperText: PropTypes.any,
  fieldKeyPath: PropTypes.string,
  onRef: PropTypes.object,
  form: PropTypes.object
};

function ArrayItem (props) {
  const { fieldKeyPath, form, onRef, arrayFieldKeyPath, index } = props;
  return (
    <MemoFObjectField
      form={form}
      fieldKeyPath={fieldKeyPath}
      ref={onRef}
      validation={(value = {}, formState, vCallback) => {
        if (!value.role && !value.user && !value.group) {
          vCallback('Role/User/Group is required');
        } else {
          vCallback();
        }
      }}
      Comp={ArrayItemComp}
      CompProps={{
        arrayFieldKeyPath: arrayFieldKeyPath,
        index: index
      }}
    />
  );
}

ArrayItem.propTypes = {
  fieldKeyPath: PropTypes.string,
  onRef: PropTypes.func,
  form: PropTypes.object,
  arrayFieldKeyPath: PropTypes.string,
  index: PropTypes.number
};

function ArrayItemComp ({ fieldKeyPath, arrayFieldKeyPath, form, helperText, onRef, index }) {
  const fieldKeyPathRole = fieldKeyPath + '.role';
  const fieldKeyPathUser = fieldKeyPath + '.user';
  const fieldKeyPathGroup = fieldKeyPath + '.group';

  const handleRemove = (e) => {
    form.arrayItemRemove(arrayFieldKeyPath, index);
  };

  const handleShiftUp = (e) => {
    form.arrayItemShift(arrayFieldKeyPath, index, index - 1);
  };

  const handleShiftDown = (e) => {
    form.arrayItemShift(arrayFieldKeyPath, index, index + 1);
  };

  return (
    <tr ref={onRef}>
      <td>
        <MemoFTextField
          form={form}
          fieldKeyPath={fieldKeyPathRole}
          TextFieldProps={{
            label: 'Role'
          }}
        />
      </td>
      <td>
        <MemoFTextField
          form={form}
          fieldKeyPath={fieldKeyPathUser}
          TextFieldProps={{
            label: 'User'
          }}
        />
      </td>
      <td>
        <MemoFTextField
          form={form}
          fieldKeyPath={fieldKeyPathGroup}
          TextFieldProps={{
            label: 'Group'
          }}
        />
      </td>
      <td>
        <IconButton onClick={handleRemove}><DeleteIcon /></IconButton>
      </td>
      <td>
        <IconButton onClick={handleShiftUp}><ArrowUpwardIcon /></IconButton>
      </td>
      <td>
        <IconButton onClick={handleShiftDown}><ArrowDownwardIcon /></IconButton>
      </td>
      <td>
        {helperText}
      </td>
    </tr>
  );
}

ArrayItemComp.propTypes = {
  fieldKeyPath: PropTypes.string,
  onRef: PropTypes.object,
  form: PropTypes.object,
  arrayFieldKeyPath: PropTypes.string,
  index: PropTypes.number,
  helperText: PropTypes.any
};
