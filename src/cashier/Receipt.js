import React from 'react';

const Receipt = React.forwardRef(({ formattedCart, order_date, customerName, paymentMethod, totalAmount }, ref) => (
  <div className="Receipt" ref={ref}>
    <h2>------------------------------</h2>
    <h2>Teras Kopi 54</h2>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <h5>Order Date :</h5>
      <h5>{order_date}</h5>
    </div>
    <h2>------------------------------</h2>
    {formattedCart.map((item) => (
      <div style={{ display: 'flex', justifyContent: 'space-between' }} key={item.product_id}>
        <h5>{item.product_name} ({item.variant_type}) x {item.quantity_order}</h5>
        <h5>Rp.{item.total_price}</h5>
      </div>
    ))}
    <h2>------------------------------</h2>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <h5>Customer Name :</h5>
        <h5>{customerName}</h5>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <h5>Payment :</h5>
        <h5>{paymentMethod}</h5>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <h5>Total :</h5>
        <h5>Rp.{totalAmount}</h5>
      </div>
    </div>
    <h5 style={{ textAlign: 'center' }}>Terima Kasih</h5>
    <h5 style={{ textAlign: 'center' }}>Jl.Panorama 54 GegerKalong Bandung JawaBarat</h5>
  </div>
));

export default Receipt;
