import React from 'react'
import { Chart } from 'react-charts'
 
class MyChart extends React.Component {
    
   
  getBalanceHistory = (payments) => {
    let result = payments.map(({remainingBalance}, i) => [i, Number(remainingBalance)]);
    return result;
  };

  getInterestSeries = (payments) => {
    let interest = payments.map(({interest}, i) => interest);
    let result = [];
    let sum = 0;
    for (let i = 0; i < interest.length; i++){
      sum += interest[i];
      result = [...result, [i, sum]]
    }
    
    return result;
  };

  petPaymentsSeries = (payments) => {
    let result = payments.map(({paymentAmount}, i) => [i, Number(paymentAmount)]);
    return result;
  }
   
  render () {
    let payments = this.props.payments;
    

    let balanceSeries = [];
    if(payments) {
      balanceSeries = this.getBalanceHistory(payments);
    }

    let interestSeries = [];
    if(payments) {
      interestSeries = this.getInterestSeries(payments);
    }

    let paymentsSeries = [];
    if(payments) {
      paymentsSeries = this.petPaymentsSeries(payments);
    }

    console.log(payments);
    console.log(interestSeries);

    const axes = [
        { primary: true, type: 'linear', position: 'bottom' },
        { type: 'linear', position: 'left' }
      ];

    const data = [
        {
          label: 'Balance',
          data: balanceSeries,
        },
        {
          label: 'Interest',
          data: interestSeries,
        },        
        {
          label: 'Payments',
          data: paymentsSeries,
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