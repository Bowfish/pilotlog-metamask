// react imports
import { drizzleConnect } from 'drizzle-react'

import {
  setPilotId ,
  setPilotData ,
  setLogbookData,
  setLicenseHash,
} from '../redux/pilotLogActions'

import App from './App'

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    pilotId: state.pilotLog.pilotId,
    LogFactory: state.contracts.LogFactory,
    logbookData: state.pilotLog.logbookData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPilotId: pilotId => dispatch(setPilotId(pilotId)),
    setPilotData: pilotData => dispatch(setPilotData(pilotData)),
    setLogbookData: logbookData => dispatch(setLogbookData(logbookData)),
    setLicenseHash: licenseHash => dispatch(setLicenseHash(licenseHash)),
  };
};

const AppContainer = drizzleConnect(App, mapStateToProps, mapDispatchToProps);

export default AppContainer
