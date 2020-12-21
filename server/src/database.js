const mongoose = require('mongoose')

mongoose
  .connect('mongodb://mongodb/mydatabase', { useNewUrlParser: true })
  .then(db => console.log('DB is connected to', db.connection.host))
  .catch(err => console.log(err))
