import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Paper,
  Typography,
  Link,
  Breadcrumbs
} from '@material-ui/core';
import { stateList } from '../../data/states';
import Alert from '@material-ui/lab/Alert';
import { useNavigate } from 'react-router-dom';
import { createPatient } from '../../services/patient-services';

const useStyles = makeStyles(theme => ({
  containerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    padding: theme.spacing(2),
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px'
    },
    '& .MuiButton-root': {
      margin: theme.spacing(2)
    }
  },
  headerText: {
    color: theme.palette.secondary.main,
    fontWeight: '700',
    fontFamily: 'Roboto, sans-serif',
    padding: theme.spacing(2)
  },

  formContent: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: theme.spacing(2)
  }
}));

const CreatePatientComponent = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [dob, setDOB] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [respose, setResponse] = useState({
    IsError: false,
    IsSuccess: false,
    msg: ''
  });

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setAddress('');
    setCity('');
    setState('');
    setDOB('');
    setPhone('');
    setEmail('');
  };
  const handleSubmit = async event => {
    event.preventDefault();

    if (
      firstName === '' &&
      lastName === '' &&
      address === '' &&
      city === '' &&
      state === '' &&
      email === '' &&
      phone === ''
    ) {
      setResponse({ IsError: true, IsSuccess: false, msg: 'All fields are required' });
      return false;
    }

    let data = {
      first_name: firstName,
      last_name: lastName,
      address: address,
      city: city,
      state: state,
      dob: dob,
      email: email,
      phone: phone
    };

    await createPatient(data)
      .then(function (response) {
        setResponse({
          IsError: false,
          IsSuccess: true,
          msg: 'Patient record added successfully'
        });
        setTimeout(() => {
          setResponse({
            IsError: false,
            IsSuccess: false
          });
          navigate('/patients');
        }, 2000);

        clearForm();
      })
      .catch(function (error) {
        setResponse({ IsError: true, IsSuccess: false, msg: error.response.data });
        console.log(error);
      });
  };

  return (
    <Grid container>
      <Grid item lg={6}>
        <div className={classes.containerWrapper}>
          <Breadcrumbs aria-label='breadcrumb'>
            <Link color='inherit' href='/patients'>
              Patients
            </Link>

            <Typography color='textPrimary'>New</Typography>
          </Breadcrumbs>
          <Paper>
            <Typography variant='h5' className={classes.headerText}>
              Create Patient
            </Typography>
            <form className={classes.formContent} onSubmit={handleSubmit}>
              <TextField
                label='First Name'
                variant='outlined'
                color='primary'
                required
                value={firstName}
                onChange={event => setFirstName(event.target.value)}
              />
              <TextField
                label='Last Name'
                variant='outlined'
                color='primary'
                required
                value={lastName}
                onChange={event => setLastName(event.target.value)}
              />
              <TextField
                label='Address'
                variant='outlined'
                color='primary'
                required
                value={address}
                onChange={event => setAddress(event.target.value)}
              />
              <TextField
                label='City'
                variant='outlined'
                color='primary'
                required
                value={city}
                onChange={event => setCity(event.target.value)}
              />

              <TextField
                id='standard-select-currency'
                select
                variant='outlined'
                label='State'
                value={state}
                required
                onChange={event => setState(event.target.value)}
              >
                {stateList.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id='date'
                variant='outlined'
                label='Date of Birth'
                type='date'
                value={dob}
                InputLabelProps={{
                  shrink: true
                }}
                onChange={event => setDOB(event.target.value)}
              />

              <TextField
                label='Email'
                variant='outlined'
                color='primary'
                required
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
              <TextField
                label='Phone'
                variant='outlined'
                color='primary'
                required
                value={phone}
                type='number'
                onChange={event => setPhone(event.target.value)}
              />

              <Button variant='contained' color='primary' type='submit'>
                Create
              </Button>
            </form>
            <div>
              {respose.IsError ? <Alert severity='error'>{respose.msg}</Alert> : null}
              {respose.IsSuccess ? <Alert severity='success'>{respose.msg}</Alert> : null}
            </div>
            <Link href='/patients'>Back</Link>
          </Paper>
        </div>
      </Grid>
      <Grid item lg={6}></Grid>
    </Grid>
  );
};

export default CreatePatientComponent;
