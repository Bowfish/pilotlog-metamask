import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Form, Label, Grid } from 'semantic-ui-react'

import { getDateTime } from '../api/helpers';
import { getIsoDateStr } from '../api/helpers';

class PilotData extends Component {

	constructor(props, context) {

		super(props)

		this.web3 = context.drizzle.web3
		this.LogFactory = context.drizzle.contracts.LogFactory

		this.state = {
			isLoading: false,
      firstName: '',
      lastName:  '',
      email:     '',
      birthDate: 0,
      birthDateStr: ''
		}
    /*
    this.state = {
			isLoading: false,
      firstName: this.props.pilotData.firstName,
      lastName:  this.props.pilotData.lastName,
      email:     this.props.pilotData.email,
      birthDate: this.props.pilotData.birthDate,
      birthDateStr: getIsoDateStr(this.props.pilotData.birthDate)
    }
    */

	}

  componentDidMount() {

    this.setState({
      firstName: this.props.pilotData.firstName,
      lastName:  this.props.pilotData.lastName,
      email:     this.props.pilotData.email,
      birthDate: this.props.pilotData.birthDate,
      birthDateStr: getIsoDateStr(this.props.pilotData.birthDate)
    })

  }

	onSubmit = async (event) => {

		// create a time stamp of the current time
		this.setState({isLoading: true})

		this.LogFactory.methods.setPilotData(
			this.web3.utils.utf8ToHex(this.state.firstName),
			this.web3.utils.utf8ToHex(this.state.lastName),
			this.web3.utils.utf8ToHex(this.state.email),
			this.state.birthDate
		).send({from: this.props.pilotId, gas: 6721975, gasPrice: 100000000000})
		.then((result, error) => {
      this.props.setPilotData(this.state)
			this.setState({isLoading: false})
		}).catch((error) => {
			console.log('VM Exception: PilotData.setPilotData')
			console.log(error)
		})
	}

	onChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  onBirthDateBlur = (event, value) => {
    this.setState({ birthDate: getDateTime(event.target.value)})
	}

  render() {

		const {
			firstName,
			lastName,
			email,
			birthDateStr,
		} = this.state

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
  				<Grid centered>
    				<Grid.Column width={8}>
    					<Form textalign='left' onSubmit={this.onSubmit}>
                <Form.Group widths='equal'>
                  <Form.Input
                    maxLength={32}
                    name='firstName'
                    value={firstName}
                    label='First Name'
                    placeholder='First Name'
                    onChange={this.onChange}
                  />
                  <Form.Input
                    maxLength={32}
                    name='lastName'
                    value={lastName}
                    label='Last Name'
                    placeholder='Last Name'
                    onChange={this.onChange}
                  />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input
                    maxLength={32}
                    name='email'
                    value={email}
                    label='Email Address'
                    placeholder='Email Address'
                    type='email'
                    //onChange={this.onChange}
                  />
                  <Form.Input
                    name='birthDateStr'
                    label='Birth Date'
                    placeholder='00.00.0000'
                    value={birthDateStr}
                    type='date'
                    onChange={this.onChange}
                    onBlur={this.onBirthDateBlur}
                  />
                </Form.Group>
                <Form.Button primary content='Save' />
    					</Form>
    				</Grid.Column>
  	      </Grid>
		    )
			}
		}
  }
}

PilotData.propTypes = {
  store: PropTypes.object.isRequired
}

PilotData.contextTypes = {
  drizzle: PropTypes.object
}

export default PilotData;
