import React from 'react';

class PaymentTable extends React.Component {

  calculateTotalInterest = (payments) => {
    let result = payments.reduce((sum, {interest}) => sum + interest, 0);    
    return result.toFixed(2);
  }

  estSeries = (payments) => {
    let interest = payments.map(({interest}, i) => interest);
    let result = [];
    let sum = 0;
    for (let i = 0; i < interest.length; i++){
      sum += interest[i];
      result = [...result, [i, sum]]
    }
    
    return result;
  };

  calculateTotalPayment = (payments) => {
    let result = payments.reduce((sum, {paymentAmount}) => sum + Number(paymentAmount), 0);    
    return result.toFixed(2);
  }

  petPaymentsSeries = (payments) => {
    let result = payments.map(({paymentAmount}, i) => [i, Number(paymentAmount)]);
    return result;
  }


  render() {
    const {payments} = this.props;
    let totalInterest = 0;
    let totalPayments = 0;

    console.log(payments);
    if(payments){
        totalInterest = this.calculateTotalInterest(payments);
    }
    if(payments){
      totalPayments = this.calculateTotalPayment(payments);
  }

     return (
       <div>
        <div>Remaining Balance: {payments.remainingBalance}</div>  
        <div>Total Payments: {totalPayments}</div>  
        <div>Total Interest Paid: {totalInterest}</div>    
      </div>         
         )
        }
     
  
  
}

export default PaymentTable;