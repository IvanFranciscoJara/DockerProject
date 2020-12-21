const express = require('express')
const app = express()
const RouteNew = require('./routes/RouteNews')
var CronJob = require('cron').CronJob
const cors = require('cors')
require('./database')
const utils = require('./utils')

app.use(cors())
app.use(express.json())
app.use(RouteNew)

var job = new CronJob(
  //1=segundos,
  //2=minutos,
  //3=horas,
  //4=day of month,
  //5=month
  //6=day of week
  '0 0 */1 * * *',
  async function () {
    let NewsInserted = await utils.GetAndInsertData()
    console.log(`Cron Job: ${NewsInserted.length} new news inserted 📰 ${new Date()}`)
  },
  null,
  true,
  'America/Los_Angeles',
  null,
  true
)
job.start()

app.listen(5000)
console.log('Server on Portt', 5000)
