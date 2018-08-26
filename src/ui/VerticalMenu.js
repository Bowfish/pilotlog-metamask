import React, { Component } from 'react'

import { Menu } from 'semantic-ui-react'

import { Link } from 'react-router-dom';

class VerticalMenu extends Component {

  state = {
    activeItem: 'logbook'
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {

    const { activeItem } = this.state

    return (
      <Menu fluid vertical tabular>
        <Menu.Item as={Link} to='/logbook' name='logbook' active={activeItem === 'logbook'} onClick={this.handleItemClick} />
        <Menu.Item as={Link} to='/license' name='license' active={activeItem === 'license'} onClick={this.handleItemClick} />
      </Menu>
    )

    /*
    return (
      <Menu fliud vertical tabular>
        <Menu.Item name='logbook' active={activeItem === 'logbook'} onClick={this.handleItemClick} />
        <Menu.Item name='license' active={activeItem === 'license'} onClick={this.handleItemClick} />
      </Menu>
    )
    */
  }
}

export default VerticalMenu

/*
const VerticalMenu = ({ menuItems, menuItemsPathname }) => (
  <div className='ui secondary vertical menu'>
    <div className='header item'>
      Options
    </div>
    {
      menuItems.map((menuItem) => (
        <NavLink
          to={`${menuItemsPathname}/${menuItem.id}`}
          activeClassName='active'
          className='item'
          key={menuItem.id}
        >
          {menuItem.name}
        </NavLink>
      ))
    }
  </div>
);
*/
