const initialState = {
  patientList: []
};

const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_PATIENT_LIST':
      return {
        ...state,
        patientList: action.payload
      };

    default:
      return state;
  }
};

export default patientReducer;
