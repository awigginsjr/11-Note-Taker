// dependencies
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// port
const PORT = process.env.PORT || 3001;

// create app and route middleware
express()
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(express.static('public'))
  .use('/api', apiRoutes)
  .use('/', htmlRoutes)
  .listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));