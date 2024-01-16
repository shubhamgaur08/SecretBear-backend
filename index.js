const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 

connectToMongo();
const app = express()
const port = 5000

app.use(cors({
  origin: '*'
}));
app.use(express.json())

app.get('/', (req, res) => {
  res.send('you are in SecretBear!')
})

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/Secrets', require('./routes/secrets'))
app.use('/api/GoogleAuth', require('./routes/GoogleAuth'))


app.listen(port, () => {
  console.log(`SecretBear listening at http://localhost:${port}`)
})