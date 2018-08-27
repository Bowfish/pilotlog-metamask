import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Label, Grid, Input, Button, Form } from 'semantic-ui-react'

import ipfs from '../api/ipfs'
import { DOC_TYPE_LICENSE } from '../api/constants'
import { getBytes32FromMultiash } from '../api/multihash';

class License extends Component {

	constructor(props, context) {

		super(props)

		this.web3 = context.drizzle.web3
		this.LogFactory = context.drizzle.contracts.LogFactory

		// initialize the local state
		this.state = {
			ipfsHash: null,
			buffer: '',
			isLoading: false,
			isFileSelected: false
		}
	}

	convertToBuffer = async(reader) => {

    //file is converted to a buffer to prepare for uploading to IPFS
    const buffer = await Buffer.from(reader.result);

    //set this buffer -using es6 syntax
    this.setState({buffer});
  };

	onChange = async (event) => {

		event.stopPropagation()
    event.preventDefault()

    const file = event.target.files[0]

    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)

		this.setState({isFileSelected: true})
	}

	onSubmit = async (event) => {

		event.preventDefault()

		this.setState({isLoading: true})

		// uppload the document to ipfs
		await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      console.log('Document File Hash: ' + ipfsHash[0].hash);

			// set ipfs hash to the local state
      this.setState({ipfsHash: ipfsHash[0].hash});

			const { digest, hashFunction, size } = getBytes32FromMultiash(ipfsHash[0].hash);
			console.log('Multihash digest: ' + digest)
			console.log('Multihash hashFunction: ' + hashFunction)
			console.log('Multihash hashFunction: ' + size)
			this.LogFactory.methods.setIpfsDocument(
				DOC_TYPE_LICENSE,
				digest,
				hashFunction,
				size
			//).send({from: this.props.pilotId, gas: 6721975, gasPrice: 100000000000})
			).send({from: this.props.pilotId, gas: 150000, gasPrice: 100000000000})
			.then((result, error) => {
				console.log(result)
				// add the new record to the store that it can be displayed
	      this.props.setLicenseHash(ipfsHash[0].hash);
				this.setState({isLoading: false})
			}).catch((error) => {
				console.log('VM Exception: Document.saveDocumentData')
				console.log(error)
			})

    }) //await ipfs.add

	}

	onDeleteLicense = (event) => {
		// delete the document from the contract
		this.LogFactory.methods.deleteIpfsDocument(
			DOC_TYPE_LICENSE
		//).send({from: this.props.pilotId, gas: 6721975, gasPrice: 100000000000})
	).send({from: this.props.pilotId, gas: 150000, gasPrice: 100000000000})
		.then((result, error) => {
			console.log(result)
			this.props.setLicenseHash('0x0')
			this.setState({isFileSelected: false})
		}).catch((error) => {
			console.log('VM Exception: Document.deleteIpfsDocument')
			console.log(error)
		})
	}

	render() {

		// create the link fro ipfs
		const licenseLink = 'http://127.0.0.1:8080/ipfs/' + this.props.licenseHash

		if (this.state.isLoading) {
			// uploading in progress
			return (
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
						<Grid.Row>
							<Grid.Column textAlign='center'>
								<Label size={'big'}>Please select a pilot</Label>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				)
			} else {
				if (this.props.licenseHash === '0x0') {
					// there is no license in the contract
					return(
						<Form onSubmit={this.onSubmit}>
							<Grid>
								<Grid.Row>
									<Grid.Column textAlign='center'>
										<Input type='file' name='licenseFile' onChange={this.onChange}/>
									</Grid.Column>
								</Grid.Row>
								{this.state.isFileSelected &&
									<Grid.Row>
										<Grid.Column textAlign='center'>
											<Button content='Upload License' primary type='submit' />
										</Grid.Column>
									</Grid.Row>
								}
							</Grid>
						</Form>
					)
				} else {
					// there is a license in the contract
					return(
						<Grid>
							<Grid.Row>
								<Grid.Column textAlign='center'>
									<a href={licenseLink} target={'_blank'}><h3>License</h3></a>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column textAlign='center'>
								<Button content='Delete License' primary onClick={this.onDeleteLicense} />
								</Grid.Column>
							</Grid.Row>
						</Grid>
					)
				} // licenseHash === '0x0'
			} // pilotId === '0x0'
		} // isLoading
	}
}

License.propTypes = {
  store: PropTypes.object.isRequired
}

License.contextTypes = {
  drizzle: PropTypes.object
}

export default License
