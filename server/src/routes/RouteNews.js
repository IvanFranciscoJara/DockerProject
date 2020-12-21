const { Router } = require('express')
const router = Router()
const ModelNews = require('../models/ModelNews')

router.get('/getNews', async (req, res) => {
  let NewsList = await ModelNews.find({})
  NewsList = NewsList.filter(News => !News.deleted)
  res.status(200).json(NewsList)
})

router.delete('/deleteNews', async (req, res) => {
  let ToDelete_created_at = req.body.created_at
  const result = await ModelNews.updateOne({ created_at: ToDelete_created_at }, { deleted: true })
  res.status(200).json(result)
})

router.get('/deleteAllNews', async (req, res) => {
  let result = await ModelNews.deleteMany({})
  res.status(200).json(result)
})
module.exports = router
