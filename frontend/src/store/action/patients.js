import axios from 'axios';
const getAllPatients = () => (dispatch, getState) => {
  const token = localStorage.getItem('token');
  axios('http://localhost:4001/patients', {
    headers: { 'x-access-token': `${token}` }
  })
    .then(res => {
      dispatch({ type: 'LOAD_PATIENT_LIST', payload: res.data.patients });
    })
    .catch(error => console.log(error));
};
export { getAllPatients };
