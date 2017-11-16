import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import { RaisedButton } from 'material-ui';


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
          rows={1} fullWidth={true}
        />
      </div>
      <div>
        <RaisedButton type="submit"  label="Submit" disabled={pristine || submitting}/>
        <RaisedButton type="button" label="Clear Values" disabled={pristine || submitting} onClick={reset}/>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'UserComment', // a unique identifier for this form
})(UserComment)
