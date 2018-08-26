// react imports
import { drizzleConnect } from 'drizzle-react'

import {
  setPilotData
} from '../redux/pilotLogActions'

import PilotData from './PilotData'

const mapStateToProps = state => {
  //console.log(state)
  return {
    pilotId: state.pilotLog.pilotId,
    pilotData: state.pilotLog.pilotData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPilotData: pilotData => dispatch(setPilotData(pilotData)),
  };
};

const PilotDataContainer = drizzleConnect(PilotData, mapStateToProps, mapDispatchToProps)

export default PilotDataContainer
