const express = require('express')
const router = express.Router()
const controller = require('../controllers/urlController')

router.get('/urls', controller.getUrlsLimit)
router.post('/mail', controller.sendMail)
router.post('/urls', controller.generateUrl) 
router.put('/urls/', controller.settingUrls)

module.exports = router