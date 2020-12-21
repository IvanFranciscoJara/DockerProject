const ModelNews = require('../src/models/ModelNews')
const fetch = require('node-fetch')

const GetAndInsertData = async () => {
  let DataBase = await ModelNews.find({})
  let result
  try {
    result = await fetch('https://hn.algolia.com/api/v1/search_by_date?query=nodejs')
    result = await result.json()
    result = result.hits.map(
      theNew =>
        new ModelNews({
          created_at: new Date(theNew.created_at),
          title: theNew.title,
          author: theNew.author,
          story_title: theNew.story_title,
          url: theNew.url,
          story_url: theNew.story_url,
          deleted: false
        })
    )
  } catch (error) {
    console.log(error)
  }

  let simpleDataBase = DataBase.map(theNew => theNew.created_at.toISOString()) // only dates to compare
  let ResultToInsert = result.filter(res => {
    // compare data from api with simpledatabase
    return !simpleDataBase.includes(res.created_at.toISOString())
  })
  return await ModelNews.insertMany(ResultToInsert, { ordered: false }) // insert Result to database
}

const DeleteAllNews = async () => {
  return await ModelNews.deleteMany({})
}
module.exports = { GetAndInsertData, DeleteAllNews }
