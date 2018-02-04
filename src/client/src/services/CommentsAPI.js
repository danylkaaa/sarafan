import API from '#/API';

export default {
  loadByPosition (id) {
    return API
      .noAuth()
      .get(`/api/v1/position/${id}/reviews`);
  },
  save (data) {
    return API
      .access()
      .post('/api/v1/review', data);
  }
}
