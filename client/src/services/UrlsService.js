import Api from '@/services/Api'

export default {
  getUrls (params) {
    return Api().get('urls', params)
  },

  createUrls (params) {
    return Api().post('urls', params)
  }

  // getUrls (params) {
  //   return Api().post('geturls/', params)
  // }

//   deleteUrls (id) {
//     return Api().delete('urls/' + id)
//   }

}
