import API from '#/API';
import Query from 'query-string';

export default {
  loadByQuery (query) {
    console.log(Query.stringify(query))
    return API
      .noAuth()
      .get(`/api/v1/company?${Query.stringify(query)}`);
  },
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
