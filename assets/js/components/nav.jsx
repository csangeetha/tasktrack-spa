import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

let LoginForm = connect(({login}) => {return {login};})((props) => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }

  function create_token(ev) {
    api.submit_login(props.login);
    console.log(props.login);
  }

  return <div className="navbar-text">
    <Form inline>
      <FormGroup>
        <Input type="text" name="name" placeholder="name"
               value={props.login.name} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Input type="password" name="pass" placeholder="password"
               value={props.login.pass} onChange={update} />
      </FormGroup>
      <Button onClick={create_token}>Log In</Button>
    </Form>
  </div>;
});

let Signup = connect(({signup}) => {return {signup};})((props) => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_SIGNUP_FORM',
      data: data,
    });
  }

  function create_signup(ev) {
    api.submit_signup(props.signup);
    console.log(props.signup);
  }

  return <div className="navbar-text">
    <Form inline>
      <FormGroup>
        <Input type="email" name="signup_email" placeholder="email"
               value={props.signup.signup_email} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Input type="text" name="signup_name" placeholder="name"
               value={props.signup.signup_name} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Input type="password" name="signup_pass" placeholder="password"
               value={props.signup.signup_pass} onChange={update} />
      </FormGroup>
      <Button onClick={create_signup}>Sign up</Button>
    </Form>
  </div>;
});


let Session = connect(({token}) => {return {token};})((props) => {
console.log(props.token + " efgskjgskejghsekjgeshgskjehgslekj");
  return <div className="navbar-text">
    Welcome, { props.token.user_name }
  </div>;
});

function Nav(props) {
  let session_info;

  if (props.token) {
    session_info = <Session token={props.token} />;
  }
  else {
    session_info = <LoginForm />
  }

  return (
    <nav className="navbar navbar-light bg-old navbar-expand">
      <span className="navbar-brand brand">
        Tasktracker
      </span>
      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Feed</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/users" href="#" className="nav-link">All Users</NavLink>
        </NavItem>
      </ul>
      <Signup />
      { session_info }
    </nav>
  );
}

function state2props(state) {
  return {
    token: state.token,
  };
}

export default connect(state2props)(Nav);
