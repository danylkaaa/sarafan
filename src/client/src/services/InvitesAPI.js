import API from '#/API';

export default {
  loadProfessions (str) {
    return API
      .noAuth()
      .get(`/api/v1/profession/${str}`);
  },
  remove (id) {
    return API
      .access()
      .delete(`/api/v1/invite/${id}`);
  },
  accept (id) {
    return API
      .access()
      .post(`/api/v1/invite/${id}`)
  },
  load (id) {
    return API
      .access()
      .get(`/api/v1/company/${id}/invites`);
  },
  loadByUser (id) {
    return API
      .access()
      .get(`/api/v1/user/${id}/invites`);
  },
  create (id, args) {
    return API
      .access()
      .post(`/api/v1/company/${id}/invite/`, args)
  }
}
