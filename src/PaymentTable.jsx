import React from 'react';
import './PaymentTable.css';

class PaymentTable extends React.Component {

  calculateTotalInterest = (payments) => {
    let result = payments.reduce((sum, {interest}) => sum + interest, 0);    
    return result.toFixed(2);
  }

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
    let remainingBalance = 0;

    console.log(payments);
    if(payments){
        totalInterest = this.calculateTotalInterest(payments);
    }
    if(payments){
      totalPayments = this.calculateTotalPayment(payments);
    }
    if(payments.length > 0){
      remainingBalance = payments[payments.length-1].remainingBalance.toFixed(2);
    }

     return (
       <div class="table">
        <div>Remaining Balance: ${remainingBalance}</div>  
        <div>Total Payments: ${totalPayments}</div>  
        <div>Total Interest Paid: ${totalInterest}</div>    
      </div>         
         )
        }
     
  
  
}

export default PaymentTable;