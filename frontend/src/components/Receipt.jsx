import React from 'react';
import '../Css/Receipt.css';

const Receipt = React.forwardRef(({cartItems, totalAmount, discount, tax}, ref) => {

    return (
        <div ref={ref} style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Receipt</h1>
        <p>Date: {new Date().toLocaleDateString()}</p>
        <p>Time: {new Date().toLocaleTimeString()}</p>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Item</th>
                    <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Quantity</th>
                    <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Price</th>
                </tr>
            </thead>
            <tbody>
                {cartItems.map(item => (
                    <tr key={item.id}>
                        <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{item.name}</td>
                        <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{item.quantity}</td>
                        <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{item.price.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <p>Subtotal: {totalAmount}</p>
        <p>Discount: {discount}</p>
        <p>Tax: {tax}</p>
        <p><strong>Total: {totalAmount}</strong></p>
    </div>
    );
  });

export default Receipt;