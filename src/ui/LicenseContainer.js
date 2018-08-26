// react imports
import { drizzleConnect } from 'drizzle-react'

import {
  setLicenseHash
} from '../redux/pilotLogActions'

import License from './License'

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    Pilot: state.contracts.Pilot,
    pilotId: state.pilotLog.pilotId,
    logbookData: state.pilotLog.logbookData,
    licenseHash: state.pilotLog.licenseHash,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLicenseHash: licenseHash => dispatch(setLicenseHash(licenseHash)),
  };
};


const LicenseContainer = drizzleConnect(License, mapStateToProps, mapDispatchToProps)

export default LicenseContainer
