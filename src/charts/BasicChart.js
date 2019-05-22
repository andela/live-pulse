import React, { useState } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, CardHeader, IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const BasicChart = ({data}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  if(data === null ){
    return (
      <div>
        No charts data
      </div>
    )
  }else {
  
  const chartOptions = {
    title: {
      text: data.title || 'No graph selected yet'
    },
    yAxis: {
      title: {
        text: 'Number of Employees'
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
  
    series: [{
      name: 'Installation',
      data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }, {
      name: 'Manufacturing',
      data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
      name: 'Sales & Distribution',
      data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    }, {
      name: 'Project Development',
      data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    }, {
      name: 'Other',
      data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    }],
  }

  const showMenu = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const closeMenu = () => {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  return (
    <Card>
      <CardHeader 
        action={
          <IconButton onClick={showMenu} 
            aria-label="More" 
            aria-haspopup={true}
            aria-owns={open ? 'long-menu' : undefined}
            >
            <MoreVertIcon />
          </IconButton>
        }
      />
      <Menu
        open={open}
        onClose={closeMenu}
        anchorEl={anchorEl}
        >
        <MenuItem onClick={closeMenu}>Edit</MenuItem>
        <MenuItem onClick={closeMenu}>Settings</MenuItem>
        <MenuItem onClick={closeMenu}>Delete</MenuItem>
      </Menu>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </Card>
  )
  }
}

export default BasicChart;
