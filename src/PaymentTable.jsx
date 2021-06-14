import React from 'react';

class PaymentTable extends React.Component {


  render() {
    const {items} = this.props;

     return (
       <ul>
         {items.map(item => (
           <li key={item.id}>{item.interest}</li>
         ))}
       </ul>
     )
  }
  
}

export default PaymentTable;