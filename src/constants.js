const localhost = 'http://127.0.0.1:8000';

const apiURL = '/api';

export const endpoint = `${localhost}${apiURL}`;

export const productListURL = `${endpoint}/product-list/`;
export const addToCartURL = `${endpoint}/add-to-cart/`;
export const orderSummaryURL = `${endpoint}/order-summary/`;
export const orderItemDeleteURL = id => `${endpoint}/order-items/${id}/delete/`;
export const orderItemUpdateQuantityURL = `${endpoint}/order-item/update-quantity/`;
// export const productDetailURL = id => `${endpoint}/products/${id}/`;

