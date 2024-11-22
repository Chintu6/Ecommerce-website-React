import { useOrder } from "./OrderContext.jsx";
import './orders.css'; // Add CSS for styling

const OrderHistory = () => {
  const { orders } = useOrder();

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Order History</h2>
      {orders.length === 0 ? (
        <div className="no-orders text-center">
          <img src="https://th.bing.com/th/id/OIP.t2ItWxlFbrYwNEJZ0U8NHwAAAA?pid=ImgDet&w=143&h=157&c=7" alt="" />
          <h3>There is no order yet.</h3>
          <p>Explore SV Textiles now and start shopping!</p>
          <button className="btn btn-dark mt-3" onClick={() => window.location.href = '/shop'}>
            Shop Now
          </button>
        </div>
      ) : (
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="order-row d-flex align-items-center mb-4">
              {/* Order Image */}
              <div className="order-image">
                <img
                  src={order.items[0]?.imageUrl || "https://via.placeholder.com/150"}
                  alt="Order Item"
                  className="img-fluid rounded"
                />
              </div>
              {/* Order Details */}
              <div className="order-details flex-grow-1 ms-4">
                <h5>Order #{index + 1}</h5>
                <p><strong>Date:</strong> {order.orderDate}</p>
                <p><strong>Total:</strong> ₹{order.total}</p>
                <p>
                  <strong>Address:</strong> {`${order.address.village}, ${order.address.city}, ${order.address.state}, ${order.address.pincode}`}
                </p>
                <ul className="item-list">
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {item.name} - {item.quantity} x ₹{item.price} = ₹{item.quantity * item.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
