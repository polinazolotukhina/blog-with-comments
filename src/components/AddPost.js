import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import asyncValidate from './asyncValidate';





const validate = values => {
  const errors = {};
  const requiredFields = [
    'title',
    'subtitle',
    'notes'
];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) =>
  <TextField
    hintText={label} fullWidth={true}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />




class AddPost  extends React.Component {

render() {

  const { handleSubmit, pristine, reset, submitting } = this.props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="title"
          component={renderTextField}
          label="title"
        />
      </div>
      <div>
        <Field name="subtitle" component={renderTextField} label="subtitle" />
      </div>
      <div>
        <Field
          name="notes"
          component={renderTextField}
          label="notes"
          multiLine={true}
          rows={10}
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
}
export default reduxForm({
  form: 'AddPost', // a unique identifier for this form
  validate,
  asyncValidate
})(AddPost)
