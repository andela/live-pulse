import React, { Component } from 'react'
import { AppBar, Tabs, Tab, Typography } from '@material-ui/core';
import General from './General';
import Variables from './Variables';
import LineGenerators from './LineGenerators';

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
            variant="scrollable"
            scrollButtons="auto"
            value={value} onChange={this.handleChange}>
            <Tab label="General" />
            <Tab label="Variables" />
            <Tab label="Line Generators" />
            <Tab label="Lines" />
            <Tab label="DataSource" />
            <Tab label="Hooks" />
          </Tabs>
        </AppBar>
        {value === 0 && <General />}
        {value === 1 && <Variables />}
        {value === 2 && <LineGenerators />}
        {value === 3 && <Typography>Lines</Typography>}
        {value === 4 && <Typography>DataSource</Typography>}
        {value === 5 && <Typography>Hooks</Typography>}
      </div>
    )
  }
}

export default TabContainer;
