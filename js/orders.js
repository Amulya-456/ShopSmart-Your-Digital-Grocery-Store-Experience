fetch('http://localhost:5000/api/orders')
  .then(response => {
    console.log("Status:", response.status);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {
    console.log("Fetched Orders:", data);
    renderOrders(data);
  })
  .catch(error => {
    console.error("Fetch error:", error);
    document.getElementById("ordersContainer").innerHTML = `
      <div class="error">⚠️ Error loading orders. Try again later.</div>
    `;
  });

function renderOrders(orders) {
  const container = document.getElementById("ordersContainer");

  if (!orders.length) {
    container.innerHTML = "<p>No orders found.</p>";
    return;
  }

  container.innerHTML = orders.map(order => `
    <div class="order-card">
      <h3>${order.firstName} ${order.lastName}</h3>
      <p><strong>Phone:</strong> ${order.phone}</p>
      <p><strong>Address:</strong> ${order.address}</p>
      <p><strong>Payment:</strong> ${order.paymentMethod}</p>
      <p><strong>Total:</strong> ₹${order.total}</p>
      <p><strong>Status:</strong> ${order.status || 'Pending'}</p>
      <div>
        <strong>Items:</strong>
        <ul>
          ${order.items.map(item => `
            <li>${item.name} - ₹${item.price} × ${item.quantity}</li>
          `).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}
