import React from 'react';
import '../Css/Receipt.css';

const Receipt = React.forwardRef(({cartItems, Discount, Tax, Total, DiscountPrice, change, subTotal, taxAmount}, ref) => {

    return (
        <div ref={ref} className="receipt-container">
        <h1 className="receipt-title">iTech POS</h1>
        <h2 className="subheading-phone">0300-8560857 / 0300-5171615</h2>
        <h3 className="subheading-address">F-5, 1st Floor, Ramzan Plaza</h3>
        <h3 className="subheading-address">Bank Road, Saddar, Rawalpindi</h3>
        <div className="date-time-container">
        <p className="receipt-date">Date: {new Date().toLocaleDateString()}</p>
        <p  className="receipt-time">Time: {new Date().toLocaleTimeString()}</p>
        </div>
        <table className="receipt-table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {cartItems.map(item => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>Rs. {item.price}</td>
                        <td>Rs. {item.price*item.quantity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className='receipt-summary-container'>
        <div className="receipt-summary">
                <p className="summary-item">Subtotal: Rs. {subTotal}</p>
                <p className="summary-item">Change: Rs. {change}</p>
                {Discount > 0 && (
                    <p className="summary-item">Discount: <strong>{Discount}%</strong> | Rs. {DiscountPrice}</p>
                )}
                <p className="summary-item">Tax: {Tax}% | Rs. {taxAmount}</p>
                <p className="summary-item total-amount"><strong>Total: Rs. {Total}</strong></p>
            </div>
            </div>
    </div>
    );
  });

export default Receipt;