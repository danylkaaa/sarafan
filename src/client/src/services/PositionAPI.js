import API from '#/API';

export default {
  loadByCompany (id) {
    return API
      .access()
      .get(`/api/v1/company/${id}/positions`);
  },
  loadByUser (id) {
    return API
      .access()
      .get(`/api/v1/user/${id}/positions`);
  },
}
