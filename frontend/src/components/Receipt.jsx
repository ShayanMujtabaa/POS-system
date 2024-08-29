// Main Table style Print Format, comment out for generaic text printers


import React from 'react';
import '../Css/Receipt.css';

const Receipt = React.forwardRef(({ cartItems, Discount, Tax, Total, DiscountPrice, change, subTotal, taxAmount, amountReceived }, ref) => {

    return (
        <div ref={ref} className="receipt-container">
            <h1 className="receipt-title">iTech POS</h1>
            <h2 className="subheading-phone">0300-8560857 / 0300-5171615</h2>
            <h3 className="subheading-address">F-5, 1st Floor, Ramzan Plaza</h3>
            <h3 className="subheading-address">Bank Road, Saddar, Rawalpindi</h3>
            <div className="date-time-container">
                <p className="receipt-date">Date: {new Date().toLocaleDateString()}</p>
                <p className="receipt-time">Time: {new Date().toLocaleTimeString()}</p>
            </div>
            <table className="receipt-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Rate</th>
                        <th>Qty.</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(item => (
                        <tr key={item.id}>
                            <td className='td-left'>{item.name}</td>
                            <td className='td-left'>Rs. {item.price}</td>
                            <td>{item.quantity}</td>
                            <td className='td-price td-left'>Rs. {item.price * item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='receipt-summary-container'>
                <div className="receipt-summary">
                    <p className="summary-item">Sub Total: Rs. {subTotal}</p>
                    {Discount > 0 && (
                        <p className="summary-item">Discount: {Discount}% | Rs. {DiscountPrice}</p>
                    )}
                    <p className="summary-item">Tax: {Tax}% | Rs. {taxAmount}</p>
                    <p className="summary-item total-amount">Total: Rs. {Total}</p>
                    <p className="summary-item">Cash: Rs. {amountReceived}</p>
                    <p className="summary-item">Change: Rs. {change}</p>
                    
                </div>
            </div>
        </div>
    );
});

export default Receipt;






// Generic Text 58mm Printers print format, comment out for other printers


// import React from 'react';

// const Receipt = React.forwardRef(({ cartItems, Discount, Tax, Total, DiscountPrice, change, subTotal, taxAmount }, ref) => {
//     return (
//         <div ref={ref}>
//             <div style={{ textAlign: 'center' }}>
//                 <p>******************************</p>
//                 <p>        iTech POS        </p>
//                 <p>******************************</p>
//                 <p> 0300-8560857 / 0300-5171615 </p>
//                 <p> F-5, 1st Floor, Ramzan Plaza </p>
//                 <p> Bank Road, Saddar, Rawalpindi </p>
//             </div>

//             <div style={{ margin: '20px 0', textAlign: 'center' }}>
//                 <p>------------------------------</p>
//                 <p> Date: {new Date().toLocaleDateString()} </p>
//                 <p> Time: {new Date().toLocaleTimeString()} </p>
//                 <p>------------------------------</p>
//             </div>

//             <div>
//                 <p>Item            Qty   Price   Total</p>
//                 <p>------------------------------</p>
//                 {cartItems.map(item => (
//                     <p key={item.id}>
//                         {item.name}  {item.quantity}   {item.price}   {item.price * item.quantity}
//                     </p>
//                 ))}
//                 <p>------------------------------</p>
//             </div>

//             <div style={{ textAlign: 'right' }}>
//                 <p>Subtotal: Rs. {subTotal}</p>
//                 {Discount > 0 && (
//                     <p>Discount: {Discount}% | Rs. {DiscountPrice}</p>
//                 )}
//                 <p>Tax: {Tax}% | Rs. {taxAmount}</p>
//                 <p>Change: Rs. {change}</p>
//                 <p>------------------------------</p>
//                 <p>Total: Rs. {Total}</p>
//                 <p>==============================</p>
//             </div>

//             <div style={{ textAlign: 'center', marginTop: '20px' }}>
//                 <p>*** Thank You! ***</p>
//                 <p>******************************</p>
//             </div>
//         </div>
//     );
// });

// export default Receipt;











