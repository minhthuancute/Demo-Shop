
import React, { Component } from 'react'

class Counter extends Component {
   state = {
      quantity: this.props.quan
   }

   addQuantity = () => {
      this.setState(prevState => {
         return {
            quantity: prevState.quantity + 1
         }
      }, () => this.props.handleQuantity(this.state.quantity))
   }

   subQuantity = () => {
      if (this.state.quantity > 1) {
         this.setState(prevState => {
            return {
               quantity: prevState.quantity - 1
            }
         }, () => this.props.handleQuantity(this.state.quantity))
      }
   }

   changeQuantity = (e) => {
      this.setState({
         quantity: parseInt(e.target.value)
      }, () => this.props.handleQuantity(this.state.quantity))
   }

   render() {
      return (
         <div className='edit-cart d-flex align-items-center justify-content-between'>
            <button className='decre btn' onClick={this.subQuantity}>
               <span><i className="fas fa-minus" /></span>
            </button>

            <div style={{ fontSize: '20px' }}>
               <input onChange={this.changeQuantity} value={this.state.quantity} name="quantity" className='text-center' type='number' />
            </div>

            <button className='incre btn' onClick={this.addQuantity}>
               <span><i className="fas fa-plus" /></span>
            </button>
         </div>
      )
   }
}

export default Counter
