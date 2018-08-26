export const setPilotId = pilotId => {
  return ({
    type: 'SET_PILOT_ID',
    payload: pilotId
  })
}

export const setPilotData = pilotData => {
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
