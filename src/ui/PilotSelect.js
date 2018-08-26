import React, { Component } from 'react';
import PropTypes from 'prop-types'

import ipfs from '../api/ipfs'

import { DOC_TYPE_LICENSE } from '../api/constants'
import { DOC_TYPE_LOGBOOK } from '../api/constants'
import { getMultihashFromContractResponse } from '../api/multihash';

//import getWeb3 from '../api/getWeb3'

class PilotSelect extends Component {

	constructor(props, context) {

		super(props)

		this.LogFactory = context.drizzle.contracts.LogFactory
		this.web3 = context.drizzle.web3
		/*
		getWeb3.then(results => {
		  this.setState({
		    web3: results.web3
		  }, () => {
		    // Instantiate contract once web3 provided.
		    this.instantiateContract()
		  })
	  })
		*/
		/*
		getWeb3.then(results => {
			context.drizzle.web3.setProvider(results.web3.currentProvider)
			console.log(context.drizzle.web3)
			this.web3 = context.drizzle.web3
			this.LogFactory = context.drizzle.contracts.LogFactory
	  })
		console.log(context)
		*/

		//console.log(this.Logbook)


	}

	onPilotSelect = (event) => {

		event.preventDefault()

		const pilotId = event.target.value

		this.props.setPilotId(pilotId)
		console.log('Selected pilotId: ' + pilotId)

		this.props.setLogbookData([]);
		this.props.setLicenseHash('0x0');

		// if a pilot is selected
		console.log('pilotId: ' + pilotId)
		if (pilotId !== '0x0') {

			// read the pilot data from the log
			/*
			this.LogFactory.events.LogSetPilotData({
				fromBlock: 0,
				filter: {pilotId: pilotId}
			}).on('data', (values) => {
				const pilotData = {
					firstName: this.web3.utils.hexToUtf8(values.returnValues.firstName),
					lastName:  this.web3.utils.hexToUtf8(values.returnValues.lastName),
					email:     this.web3.utils.hexToUtf8(values.returnValues.email),
					birthDate: this.web3.utils.hexToUtf8(values.returnValues.birthDate)
				}
				this.props.setPilotData(pilotData)
			}).on('error', (error) => {
				console.log('Log Exception: LogAddLogbookEntry')
				console.log('error')
			})
			*/

			this.LogFactory.methods.getPilotData().call({
				from: pilotId
			}).then((pilotDataValues) => {
				const pilotData = {
					firstName: this.web3.utils.hexToUtf8(pilotDataValues.firstName),
					lastName:  this.web3.utils.hexToUtf8(pilotDataValues.lastName),
					email:     this.web3.utils.hexToUtf8(pilotDataValues.email),
					birthDate: this.web3.utils.hexToUtf8(pilotDataValues.birthDate)
				}
				this.props.setPilotData(pilotData)
			}).catch((error) => {
				console.log('VM Exception: getPilotData')
				console.log(error)
			})



			// read the license hash from the contract
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
						})
					})
				}
			}).catch((error) => {
				console.log('VM Exception: getIpfsLogbook')
				console.log(error)
			})



			/*
			// read the logbook entires from the contract
			// WARNING: Do not delete!
			this.LogFactory.methods.getLogbookEntriesCount().call({
				from: pilotId
			}).then((logbookEntriesCount) => {
				console.log('count: ' + logbookEntriesCount)
				for (let i = 0; i < logbookEntriesCount; i ++) {
					this.LogFactory.methods.getLogbookEntryByIndex(i).call({
						from: pilotId
					}).then((logbookEntry) => {
						ipfs.get('QmX5koeJyNducu9AG5NTpnF53HR39J5JoBvRemikWuUXvx', (error, files) => {
							const buffer = files[0].content
							const bufferStr = buffer.toString('utf8')
							const logbookEntries = JSON.parse(bufferStr)
							const logbookEntriesArray = Object.values(logbookEntries)
							logbookEntriesArray.forEach((logbookEntry) => {
								const dateStr = new Date(logbookEntry.date).toLocaleDateString()
								console.log(dateStr)
								this.props.setLogbookData([...this.props.logbookData, logbookEntry])
							})
						})
					}).catch((error) => {
						console.log('VM Exception: getLogbookEntries')
						console.log(error)
					})

				}
			}).catch((error) => {
				console.log('VM Exception: getLogbookEntries')
				console.log(error)
			})
			*/

			/*
			// WARNING: Do not delete!
			// read the logbook entires from the contract
			this.LogFactory.methods.getLogbookEntries().call({
				from: pilotId
			}).then((logbookEntries) => {
				//console.log(logbookEntries)
				logbookEntries.forEach((logbookEntry) => {
					// read each logbook entry from the log
					//this.LogFactory.events.LogAddLogbookEntry({
					this.LogFactory.events.LogAddLogbookEntry({
						fromBlock: 0,
						filter: {pilotId: pilotId, logbookEntryHash: logbookEntry}
					}).on('data', (values) => {
						//this.props.setLogbookData([...this.props.logbookData, JSON.parse(values.returnValues.logData)])
						this.props.setLogbookData([...this.props.logbookData, JSON.parse(values.returnValues.logbookData)])
					}).on('error', (error) => {
						console.log('Log Exception: LogAddLogbookEntry')
						console.log('error')
					})
				})
			}).catch((error) => {
				console.log('VM Exception: getLogbookEntries')
				console.log(error)
			})
			*/

			// read the license hash from the contract
			this.LogFactory.methods.getIpfsDocument(DOC_TYPE_LICENSE).call({
				from: pilotId
			}).then((multiHash) => {
				// if we get a valid multiHash
				if (multiHash.size > 0) {
					const licenseHash = getMultihashFromContractResponse(multiHash)
					if (licenseHash) this.props.setLicenseHash(licenseHash);
				}
			}).catch((error) => {
				console.log('VM Exception: getIpfsDocument')
				console.log(error)
			})

		}

	}

	render() {

		// this.props.accounts is an Object
		// we have to convert it to an array that it will work with map()
		const accounts = Object.values(this.props.accounts)

		return (
			<select
				className='ui fluid dropdown'
				ref={(input) => this.pilotId = input}
				onChange={this.onPilotSelect}
			>
				<option key={'0x0'} value='0x0'>Select Pilot</option>
				{accounts.map((pilotId) => {
					return <option
						key={pilotId}
						value={pilotId}
					>
						{pilotId}
					</option>
				})}
			</select>
		);
	}
}

PilotSelect.propTypes = {
  store: PropTypes.object.isRequired
}

PilotSelect.contextTypes = {
  drizzle: PropTypes.object
}

export default PilotSelect
