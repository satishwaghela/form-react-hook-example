import React, { useEffect } from 'react';
import useForm from 'form-react-hook';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { MemoFTextField } from './ReusableFields/FTextField';
import { MemoFCheckbox } from './ReusableFields/FCheckbox';
import { MemoFAutoComplete } from './ReusableFields/FAutoComplete';
import { MemoFCheckboxGroup } from './ReusableFields/FCheckboxGroup';
import { MemoFRadioGroup } from './ReusableFields/FRadioGroup';
import ArrayFieldExample from './ArrayFieldExample';
import { requiredValidation } from './FormValidations';

const App = () => {
  const submitBtnRef = React.createRef();

  const form = useForm({
    formData: {}
  });

  const { formState } = form;
  useEffect(() => {
    form.getFormValidity((validity) => {
      if (validity.valid) {
        submitBtnRef.current.style.opacity = 1;
      } else {
        submitBtnRef.current.style.opacity = 0.5;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  return (
    <form>
      <Container>
        <MemoFTextField
          form={form}
          fieldKeyPath='profile.firstname'
          validation={(value, formState, callback) => {
            const errorMsg = requiredValidation(value);
            callback(errorMsg);
          }}
          TextFieldProps={{
            label: 'First Name'
          }}
        />
        <MemoFTextField
          form={form}
          fieldKeyPath='profile.lastname'
          validation={(value, formState, callback) => {
            const errorMsg = requiredValidation(value);
            callback(errorMsg);
          }}
          TextFieldProps={{
            label: 'Last Name'
          }}
        />
        <MemoFRadioGroup
          form={form}
          fieldKeyPath='gender'
          radioOptions={[{
            label: 'Female',
            value: 'female'
          }, {
            label: 'Male',
            value: 'male'
          }, {
            label: 'Other',
            value: 'other'
          }]}
          validation={(value, formState, callback) => {
            const errorMsg = requiredValidation(value);
            callback(errorMsg);
          }}
        />
        <MemoFAutoComplete
          form={form}
          fieldKeyPath='dummyname'
          valueKey='name'
          AutocompleteProps={{
            multiple: true,
            options: [{ name: 'Bob' }, { name: 'Alice' }],
            getOptionLabel: (option) => option.name
          }}
          TextFieldProps={{
            label: 'Combo box'
          }}
        />
        <MemoFCheckboxGroup
          form={form}
          fieldKeyPath='assignResp'
          checkboxOptions={[{
            label: 'Gilad Gray',
            value: 'Gilad Gray'
          }, {
            label: 'Jason Killian',
            value: 'Jason Killian'
          }, {
            label: 'Antoine Llorca',
            value: 'Antoine Llorca'
          }]}
          validation={(value, formState, callback) => {
            const errorMsg = requiredValidation(value);
            callback(errorMsg);
          }}
        />
        <ArrayFieldExample form={form} />
        <MemoFCheckbox
          form={form}
          fieldKeyPath='ack'
          validation={(value, formState, callback) => {
            const errorMsg = value ? '' : 'Please accept terms & conditions';
            callback(errorMsg);
          }}
          FormControlLabelProps={{
            label: 'Terms & Conditions'
          }}
        />
        <Grid item xs={12}>
          <Button
            ref={submitBtnRef}
            variant='contained' color='primary'
            onClick={() => {
              form.getFormValidity((validity) => {
                if (validity.valid) {
                  console.log(form.formState.formData);
                } else {
                  console.log(validity);
                  form.validateForm();
                }
              });
            }}
          >
            Submit
          </Button>
        </Grid>
      </Container>
    </form>
  );
}

export default App
