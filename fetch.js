// function_store.js

// Fetch single product by ID
async function fetchProduct(id) {
    const response = await fetch(`http://localhost:8080/api/products/${id}`);
    const data = await response.json();
    return data;
}

// Fetch all products
async function fetchAllProducts() {
    const response = await fetch('http://localhost:8080/api/products');
    const data = await response.json();
    return data;
}

// Add a new product
async function addProductToAPI(product) {
    const response = await fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    const data = await response.json();
    return data;
}

// Update a product
async function updateProductInAPI(id, updatedProduct) {
    const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
    });
    const data = await response.json();
    return data;
}

// Delete a product
async function deleteProductFromAPI(id) {
    const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    return data;
}

export { fetchProduct, fetchAllProducts, addProductToAPI, updateProductInAPI, deleteProductFromAPI };
