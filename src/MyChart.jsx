import React from 'react'
import { Chart } from 'react-charts'
 
class MyChart extends React.Component {
    constructor(props) {
      super();
      this.state = { 
        
      }
    }
 
   
  render () {

  const axes = [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ];

  const data = [
      {
        label: 'Balance',
        data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]],
      },
      {
        label: 'Series 2',
        data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
      }
    ];
  

  return (
    <div
      style={{
        width: '400px',
        height: '300px'
      }}
    >
      <Chart data={data} axes={axes} />
    </div>);
  }
  
}

export default MyChart;