import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


const renderTextField = ({
  input,
  label,
  postId,
  meta: { touched, error },
  ...custom
}) =>
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />


const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) =>
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />

const UserComment = props => {
  const { handleSubmit, pristine, reset, submitting} = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="Comment"
          component={renderTextField}
          label="Comment..."
          multiLine={true}
          rows={2} fullWidth={true}
        />
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'UserComment', // a unique identifier for this form
})(UserComment)
