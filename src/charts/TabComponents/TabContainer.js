import React, { Component } from 'react'
import { AppBar, Tabs, Tab, Typography } from '@material-ui/core';
import General from './General';
import Variables from './Variables';
import LineGenerators from './LineGenerator.js/LineGenerators';

class TabContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        <AppBar position="static" style={{ flexGrow:1 }}>
          <Tabs 
            variant="fullWidth"
            scrollButtons="auto"
            value={value} onChange={this.handleChange}
            centered>
            <Tab label="General" />
            <Tab label="Variables" />
            <Tab label="Lines" />
          </Tabs>
        </AppBar>
        {value === 0 && <General />}
        {value === 1 && <Variables />}
        {value === 2 && <LineGenerators />}
      </div>
    )
  }
}

export default TabContainer;
