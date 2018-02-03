import API from '#/API';

export default {
  loadCompany (id) {
    // return {
    //   data: {
    //     success: true,
    //     item: {
    //       address: {
    //         area: 'AREA',
    //         city: 'CITY',
    //         street: 'STREET',
    //         building: 'BUILDING'
    //       },
    //       administration: [
    //         '1', '2', '3'
    //       ],
    //       staff: [
    //         '1', '2', '3'
    //       ],
    //       info: 'BLA bla'
    //     }
    //   }
    // }
    return API
      .noAuth()
      .get(`/api/v1/company/${id}`);
  },
  create (data) {
    return API
      .access()
      .post('/api/v1/company/create', data);
  }
}
