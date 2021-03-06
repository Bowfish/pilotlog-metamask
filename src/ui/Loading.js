import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

class Loading extends Component {
  constructor(props, context) {
    super(props)
  }

  render() {
    if (this.props.web3.status === 'failed') {
      return(
        // Display a web3 warning.
        <Grid centered>
          <Grid.Row>
            <main>
              <h1><span role={'img'} aria-label="Warning">⚠️</span></h1>
              <p>This browser has no connection to the Ethereum network. Please use the Chrome/FireFox extension MetaMask, or dedicated Ethereum browsers Mist or Parity.</p>
            </main>
          </Grid.Row>
        </Grid>
      )
    }

    if (this.props.drizzleStatus.initialized) {
      // Load the dapp.
      return Children.only(this.props.children)
    }

    return(
      // Display a loading indicator.
      <Grid centered>
        <Grid.Row>
          <main>
            <h1><span role={'img'} aria-label="Loading">⚙️</span></h1>
            <p>Loading dapp...</p>
          </main>
        </Grid.Row>
      </Grid>
    )
  }
}

Loading.propTypes = {
  store: PropTypes.object.isRequired
}

Loading.contextTypes = {
  drizzle: PropTypes.object
}

export default Loading
