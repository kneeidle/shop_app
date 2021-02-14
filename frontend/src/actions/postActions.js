export const productCounter = (id) => ({
  type: 'PRODUCT_COUNTER',
  id,
});

export const Authorize = (auth) => ({
  type: 'AUTH',
  auth,
});

export const Admin = (admin) => ({
  type: 'ADMIN',
  admin,
});