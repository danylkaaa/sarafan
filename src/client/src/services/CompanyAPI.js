import API from '#/API';

export default {
  loadCompany (id) {
    return API
      .noAuth()
      .get(`/api/v1/company/${id}`);
  },
  remove (id) {
    return API
      .access()
      .delete(`/api/v1/company/${id}`);
  },
  create (data) {
    return API
      .access()
      .post('/api/v1/company/create', data);
  }
}
