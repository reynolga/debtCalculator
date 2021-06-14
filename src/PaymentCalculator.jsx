import React from 'react';


class PaymentCalculator extends React.Component {
  constructor(props){
    super();
    this.state = { 
      text: 'emp',
      warning: ''
    }
    // this.state = { text: '', items: []}
  }

  handleChange = ({target: {value}}) => this.setState({text: value});

  handleSubmit = (e) => {
    e.preventDefault();

    let isValidNumber = false;    

    const number = Number(this.state.text);
    if(!isNaN(number) && number > 300)
    {
      isValidNumber = true; 
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

  render() {
    return (
    <div>
      <h2>Debt Calculator</h2>
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="loanAmount">Loan Amount:</label>
        <br />
        <input 
        onChange={this.handleChange} 
        type="text"
        autoComplete="off"
        value={this.state.text}
        />
        <button>Make Payment</button>
      </form>
      {/* <ToDoList items={this.state.items} /> */}
    </div>);
  }
}

export default PaymentCalculator;