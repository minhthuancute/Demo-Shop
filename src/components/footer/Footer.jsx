
import React from 'react'
import './footer.scss'

const Footer = () => {
    return (
        <div className='foot d-flex justify-content-center align-items-center' style={{
            height: '70px'
        }}>
            <p>©2019 /  Created by<a href='https://www.facebook.com/su.thuan.16' rel="noopener noreferrer" target='_blank' style={{
                color: '#8e44ad'
            }}> Minh Thuan</a></p>
        </div>
    )
}

export default Footer
