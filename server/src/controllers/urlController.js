const Urls = require('../models/user')
const Setting = require ('../models/setting')
const axios = require('axios')

exports.generateUrl = async (req, res) => {
  let {email, phone_number_normal, phone_number_user, phone_number_callcenter} = req.body
  var token = await getToken()
  var userId = "22" + Math.round(new Date().getTime() / 1000) 
  const baseUrl = 'https://192.168.1.4:9001/#/incall?username=' 
  var urls =   baseUrl + userId + '&?des=' + phone_number_callcenter + '&?token=' + token
  Urls.create({
    email,
    phone_number_normal,
    phone_number_user,
    phone_number_callcenter,
    token,
    urls
  })
  .then(urls => {
    console.log('success')
    console.log('urls email : '+ urls.email)
    // sendEmail(urls.email, 'headerEmail', urls.urls)
    res.status(200).json(urls)
  })
  .catch(
    err => res.send(err)
  )
}

exports.getSingleUrls = async (req, res) => {
  let id  = parseInt(req.query.id)
  console.log('dddsdfs :' + id)
  const urls = await Urls.findOne({
    where: {
      id: id
    },
  })
  .then((url) => {
    res.status(200).json(url)
  })
  .catch(err => console.log(err))
}

exports.getUrlsLimit = async (req, res) => {
  let limit  = parseInt(req.query.limit)
  Urls.findAndCountAll()
  .then((data) => {
      Urls.findAll({
        limit: limit,
        order: [
          ['id', 'DESC'],
       ],
    })
    .then((urls) => {
      res.status(200).json(urls)
    })
  })
  .catch((err) => {
    res.status(500).send('Internal Server Error');
  })  
}

exports.sendMail =  async(req, res) => {
  let { email, subject, mail_html } = req.body 
  sendEmail(email, subject, mail_html)  
  res.status(200)
}

exports.updateToken = async(req,res) => {
  var phone_number_callcenter = parseInt(req.body.phone_number_callcenter)
  var newToken = await getToken()
  var userId = "22" + Math.round(new Date().getTime() / 1000) 
  const baseUrl = 'https://192.168.1.4:9001/#/incall?username=' 
  var newUrls =   baseUrl + userId + '&?des=' + phone_number_callcenter + '&?token=' + newToken
  //Generate New Link
  Urls.update({
    token: newToken,
    urls: newUrls,
  },
  { 
    where: {id: req.params.id}
  })
  .then(() => {
    res.status(200).send("updated successfully")
  })
  .catch((err) => {
    res.send(err)
  })
}

exports.settingUrls = async(req,res) => {
  Setting.update({
    base_url: req.body.base_url,
    time_url: req.body.time_url,
    subject_email: req.body.subject_email,
    descriptions_email: req.body.descriptions_email
  },
  {
    where: {id: 1}
  })
  .then((rowsUpdated) => {
    res.json(rowsUpdated)
  })
  .catch((err) => {
    res.error(err)
  })
}

async function getToken(time) {

  if( time == null) {
    time = 5
    console.log('time : ' + time)
  } 

  let res = await axios.get('https://token.kaensom.com/gentoken?expire=' + time)
  console.log(res.data.token)
  return res.data.token
}

function sendEmail (email, subject, mail_html){
  var request = require('request');
  var dataString = 'from=noreply@dome.cloud&to='+email+'&subject='+subject+'&body='+mail_html

  var options = {
      headers: {'content-type' : 'application/x-www-form-urlencoded'},
      url: 'https://us-central1-utils-db.cloudfunctions.net/sendmail',
      method: 'POST',
      body: dataString
  };

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
          console.log(body);
      }else{
        console.log(error);
        console.log(response);
      }
  }

  request(options, callback);
}
