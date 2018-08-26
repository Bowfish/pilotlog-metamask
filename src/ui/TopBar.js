import React, { Component } from 'react'
import { Grid, Button, Segment } from 'semantic-ui-react'

import { Link } from 'react-router-dom'

class TopBar extends Component {

	render() {
		return (
      <Segment>
      <Grid columns='equal'>
        <Grid.Column width={14}>
          <h2>Pilot Logbook of Account: {this.props.pilotId}</h2>
        </Grid.Column>
        <Grid.Column textAlign='right' width={2}>
					<Link to='/'>
            <Button primary>Home</Button>
					</Link>
        </Grid.Column>
      </Grid>
      </Segment>
		)
	}
}

export default TopBar;
