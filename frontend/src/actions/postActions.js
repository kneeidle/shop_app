export const deletePost = (id) => ({
  type: 'DELETE_POST',
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