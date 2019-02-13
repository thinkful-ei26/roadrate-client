import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
const passwordLength = length({min: 10, max: 72});
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const {username, password, firstName, lastName} = values;
        const user = {username, password, firstName, lastName};
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

    render() {
        return (
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <label htmlFor="firstName">First name</label>
                <Field component={Input} type="text" name="firstName" />
                <label htmlFor="lastName">Last name</label>
                <Field component={Input} type="text" name="lastName" />
                <label htmlFor="username">Username</label>
                <Field
                    component={Input}
                    type="text"
                    name="username"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                <label htmlFor="password">Password</label>
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    validate={[required, passwordLength, isTrimmed]}
                />
                <label htmlFor="passwordConfirm">Confirm password</label>
                <Field
                    component={Input}
                    type="password"
                    name="passwordConfirm"
                    validate={[required, nonEmpty, matchesPassword]}
                />
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Register
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);



// import React, { useState } from 'react'; 
// //useState allows you to access and manipulate state components
// import "../styles/App.css";

// export function RegistrationForm() {
//   // split state into different declarations
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   return (
//     <form className="registration">
//       <label htmlFor="name">Name: </label>
//       <input
//         value={name}
//         onChange={e => setName(e.target.value)}
//         placeholder="Name"
//         type="text"
//         name="name"
//         required
//       />
//       <label htmlFor="username">Username: </label>
//       <input
//         value={username}
//         onChange={e => setUsername(e.target.value)}
//         placeholder="Username"
//         type="text"
//         name="username"
//         required
//       />
//       <label htmlFor="password">Password: </label>
//       <input
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//         placeholder="Password"
//         type="password"
//         name="password"
//         required
//       />
//        <label htmlFor="passwordConfirm">Confirm Password: </label>
//       <input
//         value={confirmPassword}
//         onChange={e => setConfirmPassword(e.target.value)}
//         placeholder="Confirm Password"
//         type="password"
//         name="passwordConfirm"
//         required
//       />
//       <button type="submit">
//         Submit
//       </button>
//     </form>
//   );
// }

// export default RegistrationForm;