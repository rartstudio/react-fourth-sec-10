import React, { useState,useEffect,useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  
  if(action.type === 'USER_INPUT'){
    return {value: action.payload, isValid: action.payload.includes('@')}
  }

  if(action.type === 'INPUT_BLUR'){
    //accessing previous state its guarantee from previous
    return {value: state.value, isValid: state.value.includes('@')}
  }

  return {value:'', isValid: null};
}

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT'){
    return {value: action.payload, isValid: action.payload.trim().length > 6}
  }
  if( action.type === 'INPUT_BLUR'){
    return {value: state.value, isValid: state.value.trim().length > 6}
  }

  return {value: '', isValid: null}
}


const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [emailState, dispatchEmail] = useReducer(emailReducer,{value:'', isValid: null});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null});
  const [formIsValid, setFormIsValid] = useState(false);

  //destructuring state email and password validity in this case
  //we want do stop checking validitity when the form is valid in using useEffect
  const {isValid: emailIsValid} = emailState;
  const {isValid: passwordIsValid} = passwordState;

  // you can use useEffect to restructure code from duplication
  // ex : if you have checking form valid you will be check from each input and it will be redundant
  // use effect will run after component render
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('checking form validity');
      setFormIsValid(
        // enteredEmail.includes('@') && enteredPassword.trim().length > 6
        emailIsValid && passwordIsValid
      );
    },500);

    //debounce user input
    return () => {
      console.log('clean up');
      clearTimeout(identifier)
    }
  // using destructuring validity instead all of state
  // },[emailState, passwordState]);
  },[emailIsValid, passwordIsValid]);

  //usereducer can help us doing state management its like a use state but in complex state
  //ex you can use it when you have state belongs together like email and validity email
  //ex you can use it when you need update state depend on another state.
  //ex code:
  //const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn)
  //state => are the latest state snapshot (like useState)
  //dispatchFn => function for updating state (like useState) but different in state updating function
  //useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one.
  
  
  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', payload: event.target.value});
    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', payload: event.target.value});
    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'})
  };

  // const emailChangeHandler = (event) => {
  //   setEnteredEmail(event.target.value);
  //   setFormIsValid(
  //     event.target.value.includes('@') && enteredPassword.trim().length > 6
  //   );
  // };

  // const passwordChangeHandler = (event) => {
  //   setEnteredPassword(event.target.value);
  //   setFormIsValid(
  //     enteredEmail.includes('@') && event.target.value.trim().length > 6
  //   );
  // };

  // const validateEmailHandler = () => {
  //   setEmailIsValid(enteredEmail.includes('@'));
  // };

  // const validatePasswordHandler = () => {
  //   setPasswordIsValid(enteredPassword.trim().length > 6);
  // };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
