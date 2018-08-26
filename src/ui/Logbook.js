import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Table, Button, Form, Label, Grid } from 'semantic-ui-react'
import TimeInput from 'react-time-input'
import { DOC_TYPE_LOGBOOK } from '../api/constants'

import ipfs from '../api/ipfs'
import { getBytes32FromMultiash } from '../api/multihash';

import { setLogDate } from '../api/helpers';
import { setLogTime } from '../api/helpers';
import { getLogTimeStr } from '../api/helpers';
import { getLogDateStr } from '../api/helpers';
import { getLogIsoDateStr } from '../api/helpers';
import { getLogTotalTimeStr } from '../api/helpers';

class Logbook extends Component {

	constructor(props, context) {

		super(props)

		this.web3 = context.drizzle.web3
		this.LogFactory = context.drizzle.contracts.LogFactory

		this.state = {
			isLoading: false,
			modified: new Date(),
			date:	setLogTime(new Date(), '00:00'),
			dateStr: getLogIsoDateStr(new Date()),
			btStart:	setLogTime(new Date(), '00:00'),
			ftStart:	setLogTime(new Date(), '00:00'),
			ftEnd:	setLogTime(new Date(), '00:00'),
			btEnd:	setLogTime(new Date(), '00:00'),
			from:	'',
			to:	'',
			type:	'',
			callsign:	'',
			ldgDay:	'',
			ldgNight:	'',
			remarks:	''
		}
	}

	onSubmit = async (event) => {

		event.preventDefault()

		this.setState({isLoading: true})

		const logbookData = {...this.props.logbookData}
		const logbookDataString = JSON.stringify(logbookData, null, 2)

    const blob = new Blob([logbookDataString],{type: 'application/json'});
    const reader = new FileReader();
    reader.readAsArrayBuffer(blob);
		reader.onloadend = async() => {
	    const buffer = await Buffer.from(reader.result);
			await ipfs.add(buffer, (err, ipfsHash) => {
				if (err) console.log(err)
	      console.log('Logbook File Hash: ' + ipfsHash[0].hash);

				const { digest, hashFunction, size } = getBytes32FromMultiash(ipfsHash[0].hash);
				console.log('Multihash digest: ' + digest)
				console.log('Multihash hashFunction: ' + hashFunction)
				console.log('Multihash hashFunction: ' + size)
				this.LogFactory.methods.setIpfsLogbook(
					DOC_TYPE_LOGBOOK,
					digest,
					hashFunction,
					size
				).send({from: this.props.pilotId, gas: 6721975, gasPrice: 100000000000})
				.then((result, error) => {
					this.setState({isLoading: false})
				}).catch((error) => {
					console.log('VM Exception: Logbook.saveLogbookData')
					console.log(error)
				})
	    }) //await ipfs.add
		}
	}

	onChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

	onTimeChange_btStart = (value) => {
		const btStart = setLogTime(this.state.btStart, value)
    this.setState({ btStart: btStart })
  }

	onTimeChange_ftStart = (value) => {
		const ftStart = setLogTime(this.state.ftStart, value)
    this.setState({ ftStart: ftStart })
  }

	onTimeChange_ftEnd = (value) => {
		const ftEnd = setLogTime(this.state.ftEnd, value)
    this.setState({ ftEnd: ftEnd })
    this.setState({ ftTime: ftEnd.getTime() - this.state.ftStart.getTime() })
  }


	onTimeChange_btEnd = (value) => {
		const btEnd = setLogTime(this.state.btEnd, value)
    this.setState({ btEnd: btEnd })
    this.setState({ btTime: btEnd.getTime() - this.state.btStart.getTime() })
  }

	onDateBlur = (event, value) => {
    this.setState({ date:    setLogDate(this.state.date, event.target.value)})
    this.setState({ btStart: setLogDate(this.state.btStart, event.target.value)})
    this.setState({ ftStart: setLogDate(this.state.ftStart, event.target.value)})
    this.setState({ ftEnd:   setLogDate(this.state.ftEnd,   event.target.value)})
    this.setState({ btEnd:   setLogDate(this.state.btEnd,   event.target.value)})
	}

	onRemarksBlur = (event, value) => {
		// create a time stamp of the current time
		const timeStamp = Date.now()

		// set the state for pilotId to the new selected pilotId
		// set modified to the current time
		this.setState({ pilotId:	this.props.pilotId, modified: timeStamp })

		// copy the state
		const logbookDataNew = {...this.state}

		// set modified explicitly because setState is async
		// in the blockchain log al dates and times are save as milliseconds
		// therefor we have to convert them from Date to milliseconds
		logbookDataNew.modified = timeStamp
		logbookDataNew.date     = this.state.date.getTime()
		logbookDataNew.btStart  = this.state.btStart.getTime()
		logbookDataNew.ftStart  = this.state.ftStart.getTime()
		logbookDataNew.ftEnd    = this.state.ftEnd.getTime()
		logbookDataNew.btEnd    = this.state.btEnd.getTime()

		this.props.setLogbookData([...this.props.logbookData, logbookDataNew])

		// reset all input fields
		this.setState({
			modified: new Date(),
			date:	setLogTime(new Date(), '00:00'),
			dateStr: getLogIsoDateStr(new Date()),
			btStart:	setLogTime(new Date(), '00:00'),
			ftStart:	setLogTime(new Date(), '00:00'),
			ftEnd:	setLogTime(new Date(), '00:00'),
			btEnd:	setLogTime(new Date(), '00:00'),
			from:	'',
			to:	'',
			type:	'',
			callsign:	'',
			ldgDay:	'',
			ldgNight:	'',
			remarks:	''
		})
	}

  render() {

		const {
			dateStr,
			from,
			to,
			btStart,
			ftStart,
			ftEnd,
			btEnd,
			type,
			callsign,
			ldgDay,
			remarks,
		} = this.state

		// sort the logbook entries based on modified
    this.props.logbookData.sort(function(a, b) {
			return a.modified < b.modified ? -1 : a.modified > b.modified ? 1 : 0
		})

		if (this.state.isLoading) {
			return(
				// uploading in progress
				<Grid centered>
	        <Grid.Row>
	          <main>
	            <h1><span role={'img'} aria-label="Loading">⚙️</span></h1>
	            <p>Uploading in progress ...</p>
	          </main>
	        </Grid.Row>
	      </Grid>
			)
		} else {
			if (this.props.pilotId === '0x0') {
				// no pilot is selected
				return (
					<Grid>
						<Grid.Column textAlign='center'>
							<Label size={'big'}>Please select a pilot</Label>
						</Grid.Column>
					</Grid>
				)
			} else {
				// a pilot is selected
		    return (
					<Form onSubmit={this.onSubmit}>
						<div>
							<div>
					      <Table singleLine>
					        <Table.Header>
					          <Table.Row>
					            <Table.HeaderCell width={'two'}>Date</Table.HeaderCell>
					            <Table.HeaderCell width={'one'}>From</Table.HeaderCell>
					            <Table.HeaderCell width={'one'}>To</Table.HeaderCell>
					            <Table.HeaderCell width={'one'}>B Off</Table.HeaderCell>
					            <Table.HeaderCell width={'one'}>T Off</Table.HeaderCell>
					            <Table.HeaderCell width={'one'}>Ldg</Table.HeaderCell>
					            <Table.HeaderCell width={'one'}>B On</Table.HeaderCell>
					            <Table.HeaderCell width={'one'}>Type</Table.HeaderCell>
					            <Table.HeaderCell width={'one'}>Callsign</Table.HeaderCell>
					            <Table.HeaderCell width={'one'}>Ldg</Table.HeaderCell>
					            <Table.HeaderCell width={'one'}>Flight</Table.HeaderCell>
					            <Table.HeaderCell width={'one'}>Block</Table.HeaderCell>
					            <Table.HeaderCell width={'three'}>Remarks</Table.HeaderCell>
					          </Table.Row>
					        </Table.Header>
					        <Table.Body>
					          {this.props.logbookData.map((logbookItem, i) => (
				              <Table.Row key={i}>
				                <Table.Cell>{getLogDateStr(logbookItem.date)}</Table.Cell>
				  							<Table.Cell>{logbookItem.from}</Table.Cell>
				  							<Table.Cell>{logbookItem.to}</Table.Cell>
				  							<Table.Cell>{getLogTimeStr(logbookItem.btStart)}</Table.Cell>
				  							<Table.Cell>{getLogTimeStr(logbookItem.ftStart)}</Table.Cell>
				  							<Table.Cell>{getLogTimeStr(logbookItem.ftEnd)}</Table.Cell>
				  							<Table.Cell>{getLogTimeStr(logbookItem.btEnd)}</Table.Cell>
				  							<Table.Cell>{logbookItem.type}</Table.Cell>
				  							<Table.Cell>{logbookItem.callsign}</Table.Cell>
				  							<Table.Cell>{logbookItem.ldgDay}</Table.Cell>
				  							<Table.Cell>
													{getLogTotalTimeStr(
														new Date(logbookItem.ftStart),
														new Date(logbookItem.ftEnd)
													)}
												</Table.Cell>
				  							<Table.Cell>
													{getLogTotalTimeStr(
														new Date(logbookItem.btStart),
														new Date(logbookItem.btEnd)
													)}
												</Table.Cell>
				  							<Table.Cell>{logbookItem.remarks}</Table.Cell>
					            </Table.Row>
				            ))}
					          <Table.Row>
					            <Table.Cell>
												<Form.Input
													fluid
													size='mini'
													maxLength={10}
													name='dateStr'
													value={dateStr}
													type='date'
													onChange={this.onChange}
													onBlur={this.onDateBlur}
												/>
					            </Table.Cell>
					            <Table.Cell>
												<Form.Input
													fluid
													size='mini'
													maxLength={4}
													name='from'
													value={from}
													onChange={this.onChange}
												/>
					            </Table.Cell>
					            <Table.Cell>
												<Form.Input
													fluid
													size='mini'
													maxLength={4}
													name='to'
													value={to}
													onChange={this.onChange}
												/>
					            </Table.Cell>
					            <Table.Cell>
												<div className='ui mini input fluid'>
													<TimeInput
														initTime={getLogTimeStr(btStart)}
														value={btStart}
														onTimeChange={this.onTimeChange_btStart}
													/>
												</div>
					            </Table.Cell>
					            <Table.Cell>
												<div className='ui mini input fluid'>
													<TimeInput
														initTime={getLogTimeStr(ftStart)}
														value={ftStart}
														onTimeChange={this.onTimeChange_ftStart}
													/>
												</div>
					            </Table.Cell>
					            <Table.Cell>
												<div className='ui mini input fluid'>
													<TimeInput
														initTime={getLogTimeStr(ftEnd)}
														value={ftEnd}
														onTimeChange={this.onTimeChange_ftEnd}
													/>
												</div>
					            </Table.Cell>
					            <Table.Cell>
												<div className='ui mini input fluid'>
													<TimeInput
														initTime={getLogTimeStr(btEnd)}
														value={btEnd}
														onTimeChange={this.onTimeChange_btEnd}
													/>
												</div>
					            </Table.Cell>
					            <Table.Cell>
												<Form.Input
													fluid
													size='mini'
													maxLength={4}
													name='type'
													value={type}
													onChange={this.onChange}
												/>
					            </Table.Cell>
					            <Table.Cell>
												<Form.Input
													fluid
													size='mini'
													maxLength={6}
													name='callsign'
													value={callsign}
													onChange={this.onChange}
												/>
					            </Table.Cell>
					            <Table.Cell>
												<Form.Input
													fluid
													size='mini'
													maxLength={2}
													name='ldgDay'
													value={ldgDay}
													onChange={this.onChange}
												/>
					            </Table.Cell>
			  							<Table.Cell>
												{getLogTotalTimeStr(ftStart, ftEnd)}
											</Table.Cell>
			  							<Table.Cell>
												{getLogTotalTimeStr(btStart, btEnd)}
											</Table.Cell>
					            <Table.Cell>
												<Form.Input
													fluid
													size='mini'
													maxLength={32}
													name='remarks'
													value={remarks}
													onChange={this.onChange}
													onBlur={this.onRemarksBlur}
												/>
					            </Table.Cell>
					          </Table.Row>
					        </Table.Body>
					      </Table>
							</div>
							<div>
								<Button content='Save' primary type='submit' />
							</div>
						</div>
					</Form>
		    )
			}
		}
  }
}

Logbook.propTypes = {
  store: PropTypes.object.isRequired
}

Logbook.contextTypes = {
  drizzle: PropTypes.object
}

export default Logbook;
