import React from 'react';
import PaymentTable from './PaymentTable';
import MyChart from './MyChart';
import './PaymentCalculator.css';
class PaymentCalculator extends React.Component {
  constructor(props){
    super();
    this.state = { 
      loanAmount: 29,
      warning: ' ',
      interestRate: "0",
      paymentAmount: "0",
      payments: [], // {balance, principal, interest}
      congratulations: ''
    }
  }

  loanAmountChanged = ({target: {value}}) => {
    if(isNaN(value)){
      return;
    }
    
    const newItem = {
      id: Date.now(),
      paymentAmount: 0,
      interest: 0,
      remainingBalance: Number(value)
    }

    this.setState(
    {
      loanAmount: value,
      payments: [newItem],
    }
    )};

  calculateRemainingBalance = () => {
    let loanAmount = Number(this.state.loanAmount);
    console.log(loanAmount);
    let totalPayments = this.totalPayments();
    let totalInterest = this.totalInterest();

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

    const number = Number(this.state.paymentAmount);

    console.log('Payment is ' + number); 
    if(isNaN(number)){
      this.setState((state) => ({
        warning: 'Please a valid number',      
      })); 
    } else if (number < Number(this.state.loanAmount*0.01)) {
      this.setState((state) => ({
        warning: 'Please put a value that is greater than 1% of the balance',      
      })); 
    } else {      
      let remainingBalance = this.calculateRemainingBalance() - this.state.paymentAmount + this.calculateInterest();
      let tempPayment = Number(this.state.paymentAmount); 

      if(remainingBalance < 0){
        remainingBalance = 0;
        tempPayment = this.calculateRemainingBalance() + this.calculateInterest() + 1;

        this.setState((state) => ({
          paymentAmount: 0,
          congratulations: 'Congratulations your loan has been paid off!!'
        }))
      }
      const newItem = {
        id: Date.now(),
        paymentAmount: tempPayment,
        interest: this.calculateInterest(),
        remainingBalance: remainingBalance
      }
 
     this.setState((state) => ({
       payments: [...this.state.payments, newItem],      
     })); 
    } 
  }

  interestRateChanged = ({target: {value}}) => this.setState({interestRate: value});

  paymentAmountChanged = ({target: {value}}) => this.setState({
      paymentAmount: value,
      warning: ' '
    })


  render() {
    return (
    <div>
      <h2>Debt Calculator</h2>
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="loanAmount">Loan Amount:</label>
        <br />
        <input 
        className="input-field"
        onChange={this.loanAmountChanged} 
        type="text"
        autoComplete="off"
        value={this.state.text}
        />        
        <br /><br />
        <label htmlFor="interestRate">Interest Rate: </label>
        <br />
        <input 
        className="input-field"
        onChange={this.interestRateChanged} 
        type="text"
        autoComplete="off"
        value={this.state.interestRate}
        /> %
        <br /><br />
        <label htmlFor="paymentAmount">Payment Amount: </label> <br />
        <input         
        className="input-field"
        onChange={this.paymentAmountChanged} 
        type="text"
        autoComplete="off"
        value={this.state.paymentAmount}
        />        
        <button className="button">Make Payment</button> <br />
        <label className="warning">{this.state.warning}</label>
      </form>
      {<PaymentTable payments={this.state.payments} />}
      <MyChart payments={this.state.payments} />
      <label class="congratulations">{this.state.congratulations}</label>
    </div>);
  }
}

export default PaymentCalculator;