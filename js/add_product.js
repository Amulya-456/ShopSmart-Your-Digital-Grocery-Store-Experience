document.getElementById("productForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const product = {
    productname: document.getElementById("productname").value.trim(),
    rating: parseFloat(document.getElementById("rating").value),
    price: parseFloat(document.getElementById("price").value),
    image: document.getElementById("image").value.trim(),
    category: document.getElementById("category").value,
    countInStock: parseInt(document.getElementById("countInStock").value),
    description: document.getElementById("description").value.trim(),
  };

  try {
    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error adding product");
    }

    alert("✅ Product added successfully!");
    document.getElementById("productForm").reset();
  } catch (err) {
    console.error(err);
    alert("❌ Error adding product.");
  }
});
