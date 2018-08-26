import React, { Component } from 'react'

import { Menu } from 'semantic-ui-react'

import { Link } from 'react-router-dom';

class VerticalMenu extends Component {

  state = {
    activeItem: ''
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {

    const { activeItem } = this.state

    return (
      <Menu fluid vertical tabular>
        <Menu.Item as={Link} to='/pilotdata' name='pilotdata' active={activeItem === 'pilotdata'} onClick={this.handleItemClick}>Pilot Data </Menu.Item>
        <Menu.Item as={Link} to='/logbook' name='logbook' active={activeItem === 'logbook'} onClick={this.handleItemClick}>Logbook</Menu.Item>
        <Menu.Item as={Link} to='/license' name='license' active={activeItem === 'license'} onClick={this.handleItemClick}>License</Menu.Item>
      </Menu>
    )
  }
}

export default VerticalMenu
