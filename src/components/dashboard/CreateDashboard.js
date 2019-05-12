import React from 'react';
import Dashboard from './Dashboard';

class CreateDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iterate: ['a', 'b', 'c']
    }
  }
  render() {
    const { iterate } = this.state;
    console.log(typeof(iterate));
    return (
      <div>
        {iterate.map(value => (
          <Dashboard key={value} val={value} />
        ))}
      </div>
    )
  }
}

export default CreateDashboard;
