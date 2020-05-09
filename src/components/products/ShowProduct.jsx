
import React, { Component } from 'react'
import { CardTitle, Container, Row, Col, CardImg } from 'reactstrap'
import Modal from '../modal/Modal'
import Counter from '../counter/Counter'
import './products.scss'

class ShowProduct extends Component {
   state = {
      showModal: false,
      src: '',
      cost: '',
      name: '',
      quantity: 1,
      indexAdd: -1,
      added: false
   }

   showModal = () => {
      this.setState({
         showModal: true
      })
   }

   hideModal = () => {
      this.setState({
         showModal: false
      })
   }

   valuesModal = (src, cost, name) => {
      this.setState({
         showModal: true,
         src, cost, name,
      })
   }

   handleQuantity = quantity => {
      this.setState({ quantity })
   }

   handleAdd = (name, src, cost, quantity) => {
      this.setState({
         added: true
      })

      setTimeout(() => {
         this.setState({
            added: false
         })
      }, 900);

      this.setState({
         indexAdd: this.props.products.findIndex(item => item.name === name)
      }, this.props.addCart(name, src, cost, quantity))
   }

   render() {
      const { src, cost, name, quantity, showModal, added } = this.state;

      return (
         <div>
            <div className="products">
               <Container>
                  {
                     this.state.showModal &&
                     <Modal src={src} cost={cost} name={name} showModal={showModal} hideModal={this.hideModal} />
                  }

                  <Row>
                     {this.props.products && this.props.products.map((product, index) => (
                        <Col className='product' md='4' sm='6' key={index}>
                           <div className="item">
                              <div className='list-img'>
                                 <div onClick={() => this.valuesModal(product.src, product.cost, product.name)}>
                                    <CardImg style={{
                                       width: '200px',
                                       height: '210px',
                                       cursor: 'zoom-in'
                                    }} src={`/assets/${product.src}.jpg`} title={product.name} />
                                 </div>
                              </div>

                              <div className='title'>
                                 <CardTitle>{product.name}</CardTitle>
                                 <p>$: {product.cost}</p>
                              </div>

                              <Counter quan={quantity} handleQuantity={this.handleQuantity} />

                              <div className='add-cart'>

                                 {
                                    added && index === this.state.indexAdd
                                       ? <button style={{
                                          background: '#fc7710',
                                       }} className='btn' onClick={() => this.handleAdd(product.name, product.src, product.cost, quantity)}>
                                          <span><i className="fas fa-check" /> ADDED</span>
                                       </button>
                                       : <button className='btn' onClick={() => this.handleAdd(product.name, product.src, product.cost, quantity)}>
                                          <span> ADD TO CART</span>
                                       </button>
                                 }
                              </div>
                           </div>
                        </Col>
                     ))}
                  </Row>
               </Container>
            </div>
         </div>
      )
   }
}

export default ShowProduct