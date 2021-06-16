import React from 'react'
import { Chart } from 'react-charts'
 
const MyChart = (props) => {
       
  console.log(props);
  let payments = props.payments;

  console.log(payments);

  const getBalanceHistory = (payments) => {
    let result = payments.map(({remainingBalance}, i) => [i, Number(remainingBalance)]);
    return result;
  };

  const getInterestSeries = (payments) => {
    let interest = payments.map(({interest}, i) => interest);
    let result = [];
    let sum = 0;
    for (let i = 0; i < interest.length; i++){
      sum += interest[i];
      result = [...result, [i, sum]]
    }
    
    return result;
  };

  const petPaymentsSeries = (payments) => {
    let result = payments.map(({paymentAmount}, i) => [i, Number(paymentAmount)]);
    return result;
  }
  let balanceSeries = [];
    if(payments) {
      balanceSeries = getBalanceHistory(payments);
    }

    let interestSeries = [];
    if(payments) {
      interestSeries = getInterestSeries(payments);
    }

    let paymentsSeries = [];
    if(payments) {
      paymentsSeries = petPaymentsSeries(payments);
    }

    let loanMax = 40000;
    if(payments.length > 0){
      loanMax = payments[0].remainingBalance;
    }

    console.log(payments);
    console.log(interestSeries);

    const series = React.useMemo(
      () => ({
        showPoints: false
      }),
      []
    )

    const axes = React.useMemo(
      () => [
        { 
          primary: true, 
          type: 'linear', 
          position: 'bottom',
          hardMax: 249,
          hardMin: 0
        },
        { 
          type: 'linear', 
          position: 'left',
          hardMin: 0,
          hardMax: loanMax*1.25
        }, 
               
      ], 
      []);

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

   
  return(<div
          style={{
            width: '500px',
            height: '400px'
          }}
        >
          <Chart data={data} axes={axes} series={series} tooltip/>
        </div>);
    
      
}

export default MyChart;