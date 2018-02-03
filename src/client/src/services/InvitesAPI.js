import API from '#/API';

export default {
  remove(id){
    return API
      .access()
      .delete(`/api/v1/invite/${id}`);
  },
  load (id) {
    return API
      .access()
      .get(`/api/v1/company/${id}/invites`);
  },
  create(id,args){
    return API
      .access()
      .post(`/api/v1/company/${id}/invite/`,args)
  }
}
