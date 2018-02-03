import API from '#/API';

export default {
  loadUser (id) {
    return API
      .noAuth()
      .get(`/api/v1/user/${id}`);
  },
  remove (id) {
    return API
      .access()
      .delete(`/api/v1/user/${id}`);
  }
}
