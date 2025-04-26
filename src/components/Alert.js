import React from 'react'
import { getCookie } from '../utils/cartUtils'

export default function Alert(props) {

    const basketIdent = getCookie('basket_ident');

    let mainDivStyle = {
        position: 'fixed',
        top: '15px',
        right: '15px',
        width: '380px',
        height: '110px',
        background: 'linear-gradient(135deg, #0f0f0f, #1a1a1a)',
        border: '2px solid rgb(255, 0, 0)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        padding: '12px',
        boxShadow: '0 0 15px rgb(255, 0, 0)',
        zIndex: '1000',
        fontFamily: 'Orbitron, sans-serif',
        color: '#fff',
        opacity: '0.95',
        animation: 'popFadeIn 0.3s ease-out'
    }

    let imgStyle = {
        width: '100px',
        height: '80px',
        borderRadius: '8px',
        marginRight: '12px',
        objectFit: 'cover',
        boxShadow: '0 0 8px rgb(255, 0, 0)'
    }

    return (
        <>{basketIdent ?
            <div style={mainDivStyle}>
                <img src={props.image} id="packageImage" alt="Item Image" style={imgStyle} />
                <div style={{ flexGrow: 1 }}>
                    <strong id="packageName" style={{ fontSize: '1em', color: 'red' }}>{props.name}</strong>
                    <br />
                    <span style={{ fontSize: '0.9em', color: 'red'}}> Price: $ <span id="packagePrice" style={{ color: 'red' }}>{props.price}</span></span>
                </div>
            </div> : ''
        }
        </>
    )
}
