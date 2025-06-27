window.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("ordersContainer");

  try {
    const response = await fetch("http://localhost:5000/api/orders"); // ✅ Use full URL

    if (!response.ok) throw new Error(`Status: ${response.status}`);

    const orders = await response.json();

    if (!orders.length) {
      container.innerHTML = "<p>No orders found.</p>";
      return;
    }

    container.innerHTML = "";

    orders.forEach(order => {
      const card = document.createElement("div");
      card.className = "order-card";
      card.innerHTML = `
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Name:</strong> ${order.firstName} ${order.lastName}</p>
        <p><strong>Phone:</strong> ${order.phone}</p>
        <p><strong>Address:</strong> ${order.address}</p>
        <p><strong>Date:</strong> ${new Date(order.placedAt).toLocaleString()}</p>
        <p><strong>Total:</strong> ₹${order.total}</p>
        <p><strong>Status:</strong> ${order.status || "Pending"}</p>
        <p><strong>Payment:</strong> ${order.paymentMethod}</p>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = "<p>⚠️ Error loading orders. Try again later.</p>";
    console.error("Error fetching orders:", err);
  }
});
