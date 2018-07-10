const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send(
    [{
      title: "Hello World!",
      description: "Hi there! How are you?"
    }]
  )
})

app.listen(process.env.PORT || 8081)
