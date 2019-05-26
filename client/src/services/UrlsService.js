import Api from '@/services/Api'

export default {
  getUrls (params) {
    return Api().get('urls', params)
  },

  getSingleUrls (params) {
    return Api().get('url', params)
  },

  createUrls (params) {
    return Api().post('urls', params)
  },

  updateToken (params) {
    return Api().put('token/' + params.id, params)
  }

}
