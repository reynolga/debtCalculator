import React from 'react'
import { Chart } from 'react-charts'
import { Resizable } from "re-resizable";
 
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
    let paymentsArray = payments.map(({paymentAmount}, i) =>  Number(paymentAmount));
    let result = [];
    let sum = 0;

    for (let i = 0; i < paymentsArray.length; i++){
      sum += paymentsArray[i];
      result = [...result, [i, sum]]
    }

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
      loanMax = Number(payments[0].remainingBalance);
    }

    console.log(payments);
    console.log(interestSeries);

    const series = React.useMemo(
      () => ({
        showPoints: true
      }),
      []
    )

    console.log(loanMax);

    let xAxisMax = payments?.length+2;

    const axes = React.useMemo(
      () => [
        { 
          primary: true, 
          type: 'linear', 
          position: 'bottom',
          hardMax: xAxisMax,
          hardMin: -0.1
        },
        { 
          type: 'linear', 
          position: 'left',
          hardMin: 0,
          hardMax: loanMax*1.25
        },                
      ], 
      [loanMax, payments]);

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

      
const style = {
  backgroundColor: 'white',
  marginTop: '30px'    
}
   
  return(<div>
          <Resizable style={style}
              defaultSize={{
                width: 800,
                height: 600,
              }}
>
            <Chart data={data} axes={axes} series={series} tooltip />
          </Resizable>
        </div>);
    
      
}

export default MyChart;