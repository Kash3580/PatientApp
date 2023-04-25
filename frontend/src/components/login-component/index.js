import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { loginService } from '../../services/auth-services';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage:
      'url(https://www.stdcheck.com/blog/wp-content/themes/stdcheck-exposed/images/doctor-consultation-header.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],

    backgroundPosition: 'center'
  },
  leftSideWrapper: {
    backgroundColor: 'rgb(184, 226, 235)'
  },
  paper: {
    padding: theme.spacing(3, 2),
    verticalAlign: 'middle',

    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',

    alignItems: 'center',
    padding: theme.spacing(2),

    borderRadius: theme.shape.borderRadius,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px'
    },
    '& .MuiButton-root': {
      margin: theme.spacing(2)
    }
  },
  welcomeText: {
    margin: '0px 0px 0.35em',
    fontSize: '1.5rem',
    fontWeight: '700',
    fontFamily: 'Roboto, sans-serif',
    lineHeight: '1.2',
    color: theme.palette.primary.main,
    textAlign: 'center'
  },
  captionText: {
    color: 'rgb(105, 117, 134)',
    fontWeight: '400',
    fontFamily: 'Roboto, sans-serif',
    lineHeight: '1.66',
    fontSize: '16px',
    textAlign: 'center'
  }
}));

const LoginComponent = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [respose, setResponse] = useState({
    IsError: false,
    IsSuccess: false,
    msg: ''
  });

  const handleSubmit = async () => {
    if (email === '' && password === '') {
      setResponse({ IsError: true, IsSuccess: false, msg: 'Please enter email and password' });
      return false;
    }

    let data = { email: email, password: password };

    await loginService(data)
      .then(function (response) {
        localStorage.setItem('token', response.data.token);

        setResponse({
          IsError: false,
          IsSuccess: true,
          msg: 'Login Successfull, redirecting to dashboard..'
        });
        setTimeout(() => {
          setResponse({
            IsError: false,
            IsSuccess: false
          });
          navigate('/patients');
        }, 1000);
      })
      .catch(function (error) {
        setResponse({ IsError: true, IsSuccess: false, msg: 'Invaild email or password' });
        console.log(error);
      });
  };

  return (
    <Grid container>
      <Grid item lg={3} className={classes.leftSideWrapper}>
        <div className={classes.paper}>
          <Typography className={classes.welcomeText} gutterBottom variant='h3'>
            Hi, Welcome
          </Typography>
          <Typography variant='h5' className={classes.captionText}>
            Enter your credentials to continue
          </Typography>

          <form className={classes.form}>
            <TextField
              label='Username'
              variant='filled'
              color='primary'
              required
              value={email}
              onChange={val => {
                setEmail(val.target.value);
              }}
            />
            <TextField
              label='Password'
              variant='filled'
              color='primary'
              type='password'
              length='5'
              required
              value={password}
              onChange={val => {
                setPassword(val.target.value);
              }}
            />
            <Button variant='contained' color='primary' onClick={handleSubmit}>
              Login
            </Button>
          </form>
          <div>
            {respose.IsError ? <Alert severity='error'>{respose.msg}</Alert> : null}
            {respose.IsSuccess ? <Alert severity='success'>{respose.msg}</Alert> : null}
          </div>
        </div>
      </Grid>
      <Grid item lg={9} className={classes.root}>
        <div></div>
      </Grid>
    </Grid>
  );
};

export default LoginComponent;
