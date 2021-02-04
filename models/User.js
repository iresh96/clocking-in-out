const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');

const UserDetail = new mongoose.Schema({
    username: String,
    password: String
  });

  UserDetail.plugin(passportLocalMongoose);

  module.exports = mongoose.model('userInfo', UserDetail, 'userInfo')