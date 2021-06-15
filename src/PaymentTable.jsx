import React from 'react';

class PaymentTable extends React.Component {


  render() {
    const {items} = this.props;

     return (
       <ul>
         {items.map(item => (
           <li key={item.id}>
             <div>{item.remainingBalance}</div>  
             <div>{item.paymentAmount}</div>  
             <div>{item.interest}</div>  
           </li>
         ))}
       </ul>
     )
  }
  
}

export default PaymentTable;