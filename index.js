const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/ashadul', (req, res) => {
  res.send({name : 'Ashadul Mridha'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})