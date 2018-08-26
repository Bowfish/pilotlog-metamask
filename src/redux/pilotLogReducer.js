export const SET_PILOT_ID = 'SET_PILOT_ID'
export const SET_PILOT_DATA = 'SET_PILOT_DATA'
export const SET_LOGBOOK_DATA = 'SET_LOGBOOK_DATA'
export const SET_LICENSE_HASH = 'SET_LICENSE_HASH'

const initialState = {
  pilotId: '0x0',
  pilotData: {
    firstName: '',
    lastName:'',
    email:'',
    birthDate: 0,
  },
  logbookData: [],
  licenseHash: '0x0'
};

const pilotLogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PILOT_ID:
      return {
        ...state,
        pilotId: action.payload
      }
    case SET_PILOT_DATA:
      return {
        ...state,
        pilotData: action.payload
      }
    case SET_LICENSE_HASH:
      return {
        ...state,
        licenseHash: action.payload
      }
    case SET_LOGBOOK_DATA:
      return {
        ...state,
        logbookData: action.payload
      }
    default:
        return state;
  }
}

export default pilotLogReducer
