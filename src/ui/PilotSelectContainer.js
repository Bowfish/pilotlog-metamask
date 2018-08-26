// react imports
import { drizzleConnect } from 'drizzle-react'

import PilotSelect from './PilotSelect'
import {
  setPilotId ,
  setPilotData ,
  setLogbookData,
  setLicenseHash,
} from '../redux/pilotLogActions'

const mapStateToProps = state => {
  //console.log(state)
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    LogFactory: state.contracts.LogFactory,
    pilotId: state.pilotLog.pilotId,
    logbookData: state.pilotLog.logbookData,
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

const PilotSelectContainer = drizzleConnect(PilotSelect, mapStateToProps, mapDispatchToProps);

export default PilotSelectContainer
