import request from '../axios'
export const shopAPI = {
  getAllProducts() {
    return request.get("/product").then((response) => {
      return response;
    });
  },
  updateProduct(productId, productData) {
    return request.put(`/Product/${productId}`, productData);
  },
  createProduct(productData) {
    return request.post("/Product", productData);
  },
  deleteProduct(productId) {
    return request.delete(`/product/${productId}`);
  },
  deleteProductImage(imagesUrl) {
    return request.delete(`/product/ProductImage/${imagesUrl}`);
  },
  getProductCategories() {
    return request.get('/ProductCategory')
  },
  createCategory(categoryData) {
    console.log("API createCategory called with:", categoryData);
    return request.post("/ProductCategory", categoryData);
  },
  updateCategory(categoryId, categoryData) {
    return request.put(`/ProductCategory/${categoryId}`, categoryData);
  },
  deleteCategory(categoryId) {
    return request.delete(`/ProductCategory/${categoryId}`);
  },
  updateProductStatus(productId, status) {
    return request.put(`/Product/${productId}/status`, JSON.stringify(status), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
