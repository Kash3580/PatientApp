import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPatients } from '../../store/action/patients';
import Alert from '@material-ui/lab/Alert';
import { deletePatient } from '../../services/patient-services';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
    marginTop: theme.spacing(2)
  },

  headerText: {
    color: theme.palette.secondary.main,
    fontWeight: '700',
    fontFamily: 'Roboto, sans-serif',
    paddingTop: theme.spacing(2)
  },
  headerWrapper: {
    margin: theme.spacing(2)
  }
}));

const PatientListComponent = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [response, setResponse] = useState({
    IsError: false,
    IsSuccess: false,
    msg: ''
  });

  const state = useSelector(state => state.patientReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPatients());
  }, []);

  const handleDelete = async email => {
    if (email === '') {
      setResponse({ IsError: true, IsSuccess: false, msg: 'Email is required' });
      return false;
    }
    let data = {
      email: email
    };

    await deletePatient(data)
      .then(function (res) {
        setResponse({
          IsError: false,
          IsSuccess: true,
          msg: res.data.data
        });
        dispatch(getAllPatients());
        setTimeout(() => {
          setResponse({
            IsError: false,
            IsSuccess: false
          });
        }, 4000);
      })
      .catch(function (error) {
        setResponse({ IsError: true, IsSuccess: false, msg: error.response.data });
      });
  };
  return (
    <div>
      <div className={classes.headerWrapper}>
        <Typography variant='h5' className={classes.headerText}>
          Patient Details
        </Typography>
      </div>
      <Button variant='contained' color='primary' onClick={() => navigate('/patients/create')}>
        Add New
      </Button>
      <div>
        {response.IsError ? <Alert severity='error'>{response.msg}</Alert> : null}
        {response.IsSuccess ? <Alert severity='error'>{response.msg}</Alert> : null}
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='patient table'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.patientList.map((patient, index) => (
              <TableRow key={'tr_' + index}>
                <TableCell component='th' scope='row'>
                  {index + 1}
                </TableCell>
                <TableCell>{patient.first_name + ' ' + patient.last_name}</TableCell>
                <TableCell>{patient.address}</TableCell>
                <TableCell>{patient.city}</TableCell>
                <TableCell>{patient.state}</TableCell>
                <TableCell>{patient.dob}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell id={'email' + index}>{patient.email}</TableCell>
                <TableCell>
                  <Button
                    size='small'
                    variant='outlined'
                    color='primary'
                    startIcon={<EditIcon />}
                    onClick={() => {
                      navigate('/patients/update', {
                        replace: false,
                        state: { patient: patient }
                      });
                    }}
                  >
                    Edit
                  </Button>{' '}
                  <Button
                    size='small'
                    variant='outlined'
                    color='secondary'
                    onClick={e => {
                      handleDelete(patient.email);
                    }}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default PatientListComponent;
