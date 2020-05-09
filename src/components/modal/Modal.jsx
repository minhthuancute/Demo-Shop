
import React, { Component } from 'react'
import './modal.scss'

class Modal extends Component {

    modalContent = React.createRef();
    modal = React.createRef();

    handleClickOutside = (e) => {
        if (this.modal.current.classList.contains("active")) {
            if (!this.modalContent.current || !this.modalContent.current.contains(e.target)) {
                this.props.hideModal()
                e.stopPropagation()
            }
        }
    }

    componentDidMount = () => {
        document.addEventListener('click', this.handleClickOutside, true)
    }

    componentWillUnmount = () => {
        document.removeEventListener('click', this.handleClickOutside, true)
    }

    render() {
        const { name, cost, src, showModal } = this.props;
        return (
            <div ref={this.modal} className={showModal ? "active wrap d-flex justify-content-center align-items-center active" : "wrap d-flex justify-content-center align-items-center active"}>
                <div ref={this.modalContent} className='display-product d-flex justify-content-center align-items-center'>
                    <i onClick={() => this.props.hideModal()} className="fas fa-times" />
                    <div>
                        <img src={`/assets/${src}.jpg`} alt={name} title={name} />
                        <div className='des d-flex align-items-center'>
                            <p className='name'>{name}</p>
                            <p className='cost'>$: {cost}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default React.memo(Modal)
