import API from '#/API';

export default {
  loadUser (id) {
    return {
      data: {
        success: true,
        item: {
          email: 'EMAIL',
          id: 'user_id',
          name: 'NAME',
          role: 'admin',
          created:'DATE',
          facebook:{
            picture:'http://www.catster.com/wp-content/uploads/2017/06/small-kitten-meowing.jpg'
          }
        }
      }
    }
    return API
      .noAuth()
      .get(`/users/${id}`)
  },
}
