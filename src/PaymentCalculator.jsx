import React from 'react';
import PaymentTable from './PaymentTable';
import MyChart from './MyChart';

class PaymentCalculator extends React.Component {
  constructor(props){
    super();
    this.state = { 
      loanAmount: 29,
      warning: '',
      interestRate: "0",
      paymentAmount: "0",
      payments: [], // {balance, principal, interest}
    }
    // this.state = { loanAmount: '', items: []}
  }

  loanAmountChanged = ({target: {value}}) => this.setState({loanAmount: value});

  calculateRemainingBalance = () => {
    let loanAmount = Number(this.state.loanAmount);
    console.log(loanAmount);
    let totalPayments = this.totalPayments();
    let totalInterest = this.totalInterest();
    // console.log(`total payments is: ${totalPayments}`);
    return loanAmount - totalPayments + totalInterest;
  }

  totalInterest = () => {
    return this.state.payments.reduce((acc, {interest}) =>  {      
      return acc + Number(interest)}, 0);
  }

  totalPayments = () => {
    return this.state.payments.reduce((acc, {paymentAmount}) =>  {      
      return acc + Number(paymentAmount)}, 0);
  }

  calculateInterest = () => {
    let interest = Number(this.state.interestRate);
    let interestPerMonth = interest / 100.0 / 12.0; //12 months per year
    let balance = this.calculateRemainingBalance(); //TODO calculate this.    
    return (interestPerMonth * balance);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let isValidNumber = false;    

    const number = Number(this.state.paymentAmount);
    if(!isNaN(number) && number > 300)
    {
      isValidNumber = true;  //TODO VALIDATE
    }
    
     const newItem = {
       id: Date.now(),
       paymentAmount: this.state.paymentAmount,
       interest: this.calculateInterest(),
       remainingBalance: this.calculateRemainingBalance()-this.state.paymentAmount + this.calculateInterest(),
     }

    this.setState((state) => ({
      payments: [...this.state.payments, newItem],      
    }));  
  }

  interestRateChanged = ({target: {value}}) => this.setState({interestRate: value});

  paymentAmountChanged = ({target: {value}}) => this.setState({paymentAmount: value})


  render() {
    return (
    <div>
      <h2>Debt Calculator</h2>
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="loanAmount">Loan Amount:</label>
        <br />
        <input 
        onChange={this.loanAmountChanged} 
        type="text"
        autoComplete="off"
        value={this.state.text}
        />        
        <br /><br />
        <label htmlFor="interestRate">Interest Rate: </label>
        <br />
        <input 
        onChange={this.interestRateChanged} 
        type="text"
        autoComplete="off"
        value={this.state.interestRate}
        /> %
        <br /><br />
        <label htmlFor="paymentAmount">Payment Amount: </label> <br />
        <input 
        label htmlFor=""
        onChange={this.paymentAmountChanged} 
        type="text"
        autoComplete="off"
        value={this.state.paymentAmount}
        />
        <button>Make Payment</button>
      </form>
      {/* {<PaymentTable payments={this.state.payments} />} */}
      <MyChart payments={this.state.payments} />
    </div>);
  }
}

export default PaymentCalculator;