import React from 'react';
import PaymentTable from './PaymentTable';

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

  handleSubmit = (e) => {
    e.preventDefault();

    let isValidNumber = false;    

    const number = Number(this.state.paymentAmount);
    if(!isNaN(number) && number > 300)
    {
      isValidNumber = true;  //TODO VALIDATE
    }
    
     const newItem = {
       paymentAmount: this.state.paymentAmount,
       id: Date.now(),
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
      {<PaymentTable items={this.state.payments} />}
    </div>);
  }
}

export default PaymentCalculator;