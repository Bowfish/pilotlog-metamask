export const SET_PILOT_ID = 'SET_PILOT_ID'
export const SET_PILOT_DATA = 'SET_PILOT_DATA'
export const SET_LOGBOOK_DATA = 'SET_LOGBOOK_DATA'
export const SET_LICENSE_HASH = 'SET_LICENSE_HASH'

const initialState = {
  pilotId: '0x0',
  pilotData: {},
  logbookData: [],
  licenseHash: '0x0'
};

//const pilotLogReducer = (state = initialState, action) => state;
const pilotLogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PILOT_ID:
      //console.log('SET_PILOT_ID reducer')
      return {
        ...state,
        pilotId: action.payload
      }
    case SET_PILOT_DATA:
      //console.log('SET_PILOT_DATA reducer')
      return {
        ...state,
        pilotData: action.payload
      }
    case SET_LICENSE_HASH:
      //console.log('SET_LICENSE_HASH reducer')
      return {
        ...state,
        licenseHash: action.payload
      }
    case SET_LOGBOOK_DATA:
      //console.log('SET_LOGBOOK_DATA reducer')
      return {
        ...state,
        logbookData: action.payload
      }
    default:
        return state;
  }
}

export default pilotLogReducer
