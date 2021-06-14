import React from 'react';


class PaymentCalculator extends React.Component {
  constructor(props){
    super();
    this.state = { 
      text: 29,
      warning: '',
      interestRate: 0,
      paymentAmount: 0,
    }
    // this.state = { text: '', items: []}
  }

  loanAmountChanged = ({target: {value}}) => this.setState({text: value});

  handleSubmit = (e) => {
    e.preventDefault();

    let isValidNumber = false;    

    const number = Number(this.state.text);
    if(!isNaN(number) && number > 300)
    {
      isValidNumber = true;  //TODO VALIDATE
    }
    
    // const newItem = {
    //   text: this.state.text,
    //   id: Date.now(),
    // }

    // this.setState((state) => ({
    //   items: [...this.state.items, newItem],
    //   text:'',    
    // }));  
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
        />

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
      {/* <ToDoList items={this.state.items} /> */}
    </div>);
  }
}

export default PaymentCalculator;