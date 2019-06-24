import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './auth.styles';
import { Mutation } from 'react-apollo';
import { SIGNIN_MUTATION, SIGNUP_MUTATION } from '../../mutations/authMutation';
import { AUTH_TOKEN, UID, U_EMAIL } from '../../constants';

const authToken = localStorage.getItem(AUTH_TOKEN);
const uid = localStorage.getItem(UID);
const uemail = localStorage.getItem(U_EMAIL);

const SignIn = (props) => {
  const { classes } =  props;
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [err, setErr] = useState('');
  //bruteforce fix for authentication redirecting
  if (authToken && uid && uemail) {
    window.location.href = '/dashboard'
    return (<div>redirecting</div>);
  }

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <p id="errorMsg">{err}</p>
        <Typography component="h1" variant="h5">
          {login ? 'Log In' : 'Create a live pulse account'}
        </Typography>
        <div className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input type="email" id="email" name="email" autoComplete="email" autoFocus 
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormControl>
          {!login && (
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Confirm Email Address</InputLabel>
              <Input type="email" id="email2" name="email2" autoFocus 
              value={confirmEmail}
              onChange={e => setConfirmEmail(e.target.value)}
              />
            </FormControl>
          )}

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <p id="acct-auth" style={{cursor: "pointer"}} onClick={() => setLogin(!login)} >
            {login
              ? `Don't have an account? create one`
              : `Already have an account? log in`
            }

          </p>
          <div className="mutation-button">
            <Mutation
              mutation={login ? SIGNIN_MUTATION : SIGNUP_MUTATION}
              variables={{ email, password, data:{ email: confirmEmail}}}
              onCompleted={data => { authenticate(data, login)}}
              onError={error => handleError(error)}
            >
              {(authMutation, {loading, error, data}) => {
                if(loading) setErr('.');
                return (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => authMutation()}
                  >
                    {login ? 'Log in' : 'Create account'}
                  </Button>
                );
              }}
            </Mutation>
          </div>
        </div>
      </Paper>
    </main>
  );
}

/**
 * authenticate function to handle signup & signin mutation
 */
const authenticate = async (data, login) => {
  const { token, user:{ id, email} } = (login ? data.signIn : data.signUp);
  localStorage.setItem(AUTH_TOKEN, token);
  localStorage.setItem(UID, id);
  localStorage.setItem(U_EMAIL, email);
  window.location.href = '/dashboard'; // react-router-redirect failed to work so improvising for now
}

/**
 * handles error on failed login or signup attempts.
 * does nothing serious for nm=ow, just logs the error to console 
 * for debugging purposes.
 */
const handleError = async error => {
  //console.log(error);
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
