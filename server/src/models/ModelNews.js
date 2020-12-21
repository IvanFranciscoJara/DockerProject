const mongoose = require('mongoose')

const NewsSchema = mongoose.Schema({
  created_at: Date,
  title: String,
  author: String,
  story_title: String,
  url: String,
  story_url: String,
  deleted: Boolean
})

module.exports = mongoose.model('News', NewsSchema)
