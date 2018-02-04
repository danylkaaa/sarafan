import API from '#/API';

export default {
  rating(id){
    return API
      .noAuth()
      .get(`/api/v1/positions/${id}/rating`)
  },
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
  load (id) {
    return API
      .noAuth()
      .get(`/api/v1/position/${id}`)
  }
}
