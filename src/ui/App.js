import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Grid } from 'semantic-ui-react'

import { Route, Switch } from 'react-router-dom'

import ipfs from '../api/ipfs'

import { DOC_TYPE_LICENSE } from '../api/constants'
import { DOC_TYPE_LOGBOOK } from '../api/constants'
import { getMultihashFromContractResponse } from '../api/multihash'

import TopBar from './TopBar'
import VerticalMenu from './VerticalMenu'
import Home from './Home'
import PilotDataContainer from './PilotDataContainer'
import LogbookContainer from './LogbookContainer'
import LicenseContainer from './LicenseContainer'

class App extends Component {

  constructor(props, context) {

		super(props)

		this.LogFactory = context.drizzle.contracts.LogFactory
		this.web3 = context.drizzle.web3

    this.state = {
      isLoadingPilotData: false,
      isLoadingLogbook: false,
      isLoadingLicense: false
    }
    //console.log(this.LogFactory)
  }

  async componentDidMount() {

    const pilotId = this.props.accounts[0]
    //const pilotId = this.props.accounts[1]
    this.props.setPilotId(pilotId)

    console.log('pilotId: ' + pilotId)

		if (pilotId !== '0x0') {

      this.setState({
        isLoadingPilotData: true,
        isLoadingLogbook: true,
        isLoadingLicense: true
      })

			const owner = await this.LogFactory.methods.owner().call()
      console.log('owner: ' + owner)

			const pilotContract = await this.LogFactory.methods.getPilotContract(pilotId).call({from: owner})
      console.log('pilotContract: ' + pilotContract)

			const logbookContract = await this.LogFactory.methods.getLogbookContract(pilotId).call({from: owner})
      console.log('logbookContract: ' + logbookContract)

			const documentContract = await this.LogFactory.methods.getDocumentContract(pilotId).call({from: owner})
      console.log('documentContract: ' + documentContract)

      // check whether the account already has a Pilot contract
			const isPilot = await this.LogFactory.methods.isPilot(pilotId).call({
        from: owner
        //from: pilotId
      })
      console.log('isPilot: ' + isPilot)

      if (isPilot === false) {
        // if pilot does not exist -> create a new Pilot Contract
        const result = await this.LogFactory.methods.createPilotContract(
    			pilotId
        //).send({from: owner, gas: 6721975, gasPrice: 100000000000})
        ).send({from: owner, gas: 3000000, gasPrice: 100000000000})
        console.log(result)
      }

      // read tje pilot data
			const pilotDataValues = await this.LogFactory.methods.getPilotData().call({
				from: pilotId
			})
			const pilotData = {
				firstName: this.web3.utils.hexToUtf8(pilotDataValues.firstName),
				lastName:  this.web3.utils.hexToUtf8(pilotDataValues.lastName),
				email:     this.web3.utils.hexToUtf8(pilotDataValues.email),
				birthDate: Number(pilotDataValues.birthDate)
			}
			this.props.setPilotData(pilotData)
      this.setState({ isLoadingPilotData: false })

			// read the logbook hash from the contract
			const logbookMultiHash = await this.LogFactory.methods.getIpfsLogbook(DOC_TYPE_LOGBOOK).call({
				from: pilotId
			})
			// if we get a valid multiHash
			if (logbookMultiHash.size > 0) {
				const logbookHash = getMultihashFromContractResponse(logbookMultiHash)
				if (logbookHash) this.props.setLicenseHash(logbookHash);
        // read the logbook date from ipfs
				await ipfs.get(logbookHash, (error, files) => {
					const buffer = files[0].content
					const bufferStr = buffer.toString('utf8')
					const logbookEntries = JSON.parse(bufferStr)
					const logbookEntriesArray = Object.values(logbookEntries)
					logbookEntriesArray.forEach((logbookEntry) => {
						this.props.setLogbookData([...this.props.logbookData, logbookEntry])
					})
          this.setState({ isLoadingLogbook: false })
				})
			}

			// read the license hash from the contract
			const licenseMultiHash = await this.LogFactory.methods.getIpfsDocument(DOC_TYPE_LICENSE).call({
				from: pilotId
			})
			// if we get a valid multiHash
			if (licenseMultiHash.size > 0) {
				const licenseHash = getMultihashFromContractResponse(licenseMultiHash)
				if (licenseHash) this.props.setLicenseHash(licenseHash);
        this.setState({ isLoadingLicense: false })
			} else {
				this.props.setLicenseHash('0x0');
        this.setState({ isLoadingLicense: false })
      }

      /*
			this.LogFactory.methods.isPilot(pilotId).call({
				from: pilotId
			}).then((isPilot) => {
        console.log('isPilot: ' + isPilot)
        if (isPilot === false) {
          // pilot does not exists
          // create a new Pilot contract
          this.LogFactory.methods.createPilotContract(
      			pilotId
      		).send({from: pilotId, gas: 6721975, gasPrice: 100000000000})
      		.then((result, error) => {
            console.log(result)
      		}).catch((error) => {
      			console.log('VM Exception: PilotData.setPilotData')
      			console.log(error)
      		})
        }
			}).catch((error) => {
				console.log('VM Exception: isPilot')
				console.log(error)
			})
      */

      /*
			this.LogFactory.methods.getPilotData().call({
				from: pilotId
			}).then((pilotDataValues) => {
				const pilotData = {
					firstName: this.web3.utils.hexToUtf8(pilotDataValues.firstName),
					lastName:  this.web3.utils.hexToUtf8(pilotDataValues.lastName),
					email:     this.web3.utils.hexToUtf8(pilotDataValues.email),
					birthDate: Number(pilotDataValues.birthDate)
				}
				this.props.setPilotData(pilotData)
        this.setState({ isLoadingPilotData: false })
			}).catch((error) => {
				console.log('VM Exception: getPilotData')
				console.log(error)
			})
      */

      /*
			// read the logbook hash from the contract
			this.LogFactory.methods.getIpfsLogbook(DOC_TYPE_LOGBOOK).call({
				from: pilotId
			}).then((multiHash) => {
				// if we get a valid multiHash
				if (multiHash.size > 0) {
					const logbookHash = getMultihashFromContractResponse(multiHash)
					if (logbookHash) this.props.setLicenseHash(logbookHash);
					ipfs.get(logbookHash, (error, files) => {
						const buffer = files[0].content
						const bufferStr = buffer.toString('utf8')
						const logbookEntries = JSON.parse(bufferStr)
						const logbookEntriesArray = Object.values(logbookEntries)
						logbookEntriesArray.forEach((logbookEntry) => {
							//const dateStr = new Date(logbookEntry.date).toLocaleDateString()
							//console.log(dateStr)
							this.props.setLogbookData([...this.props.logbookData, logbookEntry])
              this.setState({ isLoadingLogbook: false })
						})
					})
				}
			}).catch((error) => {
				console.log('VM Exception: getIpfsLogbook')
				console.log(error)
			})
      */

      /*
			// read the license hash from the contract
			this.LogFactory.methods.getIpfsDocument(DOC_TYPE_LICENSE).call({
				from: pilotId
			}).then((multiHash) => {
				// if we get a valid multiHash
				if (multiHash.size > 0) {
					const licenseHash = getMultihashFromContractResponse(multiHash)
					if (licenseHash) this.props.setLicenseHash(licenseHash);
          this.setState({ isLoadingLicense: false })
				}
			}).catch((error) => {
				console.log('VM Exception: getIpfsDocument')
				console.log(error)
			})
      */

		}
  }

  render() {

    return (
      <Grid divided>
        <Grid.Row>
          <Grid.Column>
        		<TopBar pilotId={this.props.pilotId}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={2}>
            <VerticalMenu />
          </Grid.Column>
          <Grid.Column width={14}>
            {this.state.isLoadingPilotData && this.state.isLoadingLicense && this.state.isLoadingLogbook ? (
              <Grid centered>
      	        <Grid.Row>
      	          <main>
      	            <h1><span role={'img'} aria-label="Loading">⚙️</span></h1>
      	            <p>Uploading in progress ...</p>
      	          </main>
      	        </Grid.Row>
      	      </Grid>
            ) : (
              <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/pilotdata' component={PilotDataContainer} />
                <Route path='/logbook' component={LogbookContainer} />
                <Route path='/license' component={LicenseContainer} />
              </Switch>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired
}

App.contextTypes = {
  drizzle: PropTypes.object
}

export default App
