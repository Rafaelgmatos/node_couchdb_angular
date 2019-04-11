const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const view = require('./routes/view')
const model = require('./routes/model')

app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.get('/', view.index)
app.all('/model/:model/:acao', model.metodo);

app.listen(process.env.PORT || 3000, () => {
  console.log('listening on 3000')
})
