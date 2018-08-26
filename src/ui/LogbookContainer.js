// react imports
import { drizzleConnect } from 'drizzle-react'

import {
  setLogbookData
} from '../redux/pilotLogActions'

import Logbook from './Logbook'

const mapStateToProps = state => {
  //console.log(state)
  return {
    pilotId: state.pilotLog.pilotId,
    logbookData: state.pilotLog.logbookData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLogbookData: logbookData => dispatch(setLogbookData(logbookData)),
  };
};

const LogbookContainer = drizzleConnect(Logbook, mapStateToProps, mapDispatchToProps)

export default LogbookContainer
