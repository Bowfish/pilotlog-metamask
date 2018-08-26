import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

class Home extends Component {

  render() {

    return (
      <Grid stretched centered>
        <Grid.Row>
          <h3>Welcome to the Pilot Logbook</h3>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Home
