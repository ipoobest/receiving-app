<template>
        <div class="main-panel">
            <div class="content">
                <div class="content">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-lg-6 col-md-12">
                                    <div class="card">
                                        <div class="card-header card-header-icon" data-background-color="rose">
                                            <i class="material-icons">insert_link</i>
                                        </div>
                                        <div class="card-content">
                                            <h4 class="card-title">Generate Urls</h4>
                                            <form v-on:submit.prevent="createUrls">
                                                <div class="form-group label-floating">
                                                    <label class="control-label">อีเมล์</label>
                                                    <input v-model="email" type="text" class="form-control">
                                                </div>
                                                <div class="form-group label-floating">
                                                    <label class="control-label">เบอร์โทรคนหูดี</label>
                                                    <input v-model="phone_number_normal" type="tel" class="form-control">
                                                </div>
                                                <div class="form-group label-floating">
                                                    <label class="control-label">เบอร์โทรคนหูหนวก</label>
                                                    <input v-model="phone_number_user" type="tel" class="form-control" >
                                                </div>
                                                <div class="form-group label-floating">
                                                        <label class="control-label">เบอร์โทรล่าม</label>
                                                        <input v-model="phone_number_callcenter" type="tel" class="form-control" >
                                                </div>
                                                <button class="btn btn-fill btn-rose" type="submit">ส่ง</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12">
                                        <div class="card">
                                            <div class="card-header card-header-icon" data-background-color="green">
                                                <i class="material-icons">assignment</i>
                                            </div>
                                            <div class="card-content">
                                                <table class="table">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                               <h5>อีเลล์ : </h5>
                                                            </td>
                                                            <td>{{ user.email }}</td>
                                                        </tr>
                                                         <tr>
                                                            <td>
                                                               <h5>เบอร์คนหูดี : </h5>
                                                            </td>
                                                            <td>{{ user.phone_number_normal}}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                               <h5>เบอร์คนหูหนวก : </h5>
                                                            </td>
                                                            <td>{{ user.phone_number_user}}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                               <h5>เบอร์ล่าม : </h5>
                                                            </td>
                                                            <td>{{ user.phone_number_callcenter }}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                               <h4>urls : </h4>
                                                            </td>
                                                            <td>{{ user.urls }}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            <button class="btn btn-info"  @click="updateLinks(user.id)">ส่ง link อีกครั้ง</button>
                                        </div >
                                    </div>
                            </div>
                        </div>
                    </div>
                <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-header card-header-icon" data-background-color="purple">
                                        <i class="material-icons">assignment</i>
                                    </div>
                                    <div class="card-content">
                                        <h4 class="card-title">History</h4>
                                        <div class="material-datatables">
                                            <table id="datatables" class="table table-striped table-no-bordered table-hover" cellspacing="0" width="100%" style="width:100%">
                                                <thead>
                                                    <tr>
                                                        <th>อีเมล์</th>
                                                        <th>urls</th>
                                                        <th>เบอร์โทรคนหูดี</th>
                                                        <th>เบอร์คนหูหนวก</th>
                                                        <th>เบอร์ล่าม</th>
                                                        <th>เวลา</th>
                                                    </tr>
                                                </thead>
                                                <tfoot>
                                                    <tr>
                                                        <th>อีเมล์</th>
                                                        <th>urls</th>
                                                        <th>เบอร์โทรคนหูดี</th>
                                                        <th>เบอร์คนหูหนวก</th>
                                                        <th>เบอร์ล่าม</th>
                                                        <th>เวลา</th>
                                                    </tr>
                                                </tfoot>
                                                <tbody>
                                                <tr v-for="(user) in users" v-bind:key="user.id" v-bind:email="user.email">
                                                    <td>{{user.email}}</td>
                                                    <td>{{user.urls}}</td>
                                                    <td>{{user.phone_number_normal}}</td>
                                                    <td>{{user.phone_number_user}}</td>
                                                    <td>{{user.phone_number_callcenter}}</td>
                                                    <td>{{ user.createdAt | formatDate  }}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <!-- end content-->
                                </div>
                                <!--  end card  -->
                            </div>
                            <!-- end col-md-12 -->
                        </div>
                        <!-- end row -->
                    </div>
            </div>
        </div>
     </div>
</template>

<script>
import UrlsService from '@/services/UrlsService'

export default {
  name: 'Index',
  data () {
    return {
      user: [],
      users: [],
      email: '',
      phone_number_normal: '',
      phone_number_user: '',
      phone_number_callcenter: '',
      url: '',
      limit: '10'
    }
  },
  mounted () {
    this.getUrls()
  },
  methods: {
    async getUrls () {
      var response = await UrlsService.getUrls({params: {limit: this.limit}})
      this.users = response.data
    },
    async getSingleUrls (id) {
      var response = await UrlsService.getSingleUrls({params: {id: id}})
      console.log('id : ' + id)
      this.user = response.data
    },
    async createUrls () {
      await UrlsService.createUrls({
        email: this.email,
        phone_number_normal: this.phone_number_normal,
        phone_number_user: this.phone_number_user,
        phone_number_callcenter: this.phone_number_callcenter
      }).then((response) => {
        this.user = response.data
        this.getUrls()
      }).catch((err) => {
        console.log(err)
      })
    },
    async updateLinks (id) {
      await UrlsService.updateToken({
        id: id,
        phone_number_callcenter: this.user.phone_number_callcenter
      }).then(() => {
        console.log('generate success')
        this.getSingleUrls(id)
        this.getUrls()
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
