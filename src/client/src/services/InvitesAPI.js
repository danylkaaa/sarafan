import API from '#/API';

export default {
  load (id) {
    return API
      .access()
      .get(`/api/v1/company/${id}/invites`);
  },
}
