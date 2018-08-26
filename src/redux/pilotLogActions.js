/*
export const setPilotId = pilotId => ({
  type: 'SET_PILOT_ID',
  payload: pilotId
});
*/
export const setPilotId = pilotId => {
  //console.log('Current pilotId: ' + pilotId)
  return ({
    type: 'SET_PILOT_ID',
    payload: pilotId
  })
}

export const setPilotData = pilotData => {
  //console.log('Current pilotData:')
  //console.log(pilotData)
  return ({
    type: 'SET_PILOT_DATA',
    payload: pilotData
  })
}

export const setLicenseHash = licenseHash => {
  return ({
    type: 'SET_LICENSE_HASH',
    payload: licenseHash
  })
}

export const setLogbookData = logbookData => {
  return ({
    type: 'SET_LOGBOOK_DATA',
    payload: logbookData
  })
}
