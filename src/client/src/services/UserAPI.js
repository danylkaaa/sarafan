import API from '#/API';

export default {
  loadUser (id) {
    return API
      .noAuth()
      .get(`/api/v1/user/${id}`);
  },
}
