const route = require('express').Router();
const CategoryCtrl = require('../controller/categoryCtrl');

const auth = require('../middleware/auth');
const adminAuth = require('../middleware/AdminAuth')

route.get(`/getAll`, CategoryCtrl.getAll)
route.get(`/get/:id`, CategoryCtrl.getSingle);

route.post(`/create`, CategoryCtrl.create)
route.put(`/update/:id`, CategoryCtrl.update)
route.delete(`/delete/:id`, CategoryCtrl.delete)

module.exports = route;