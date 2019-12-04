const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000;

app.prepare()
.then(() => {
  const server = express()

  server.get('/posts/:year/:month', (req, res) => {
    console.log(req.params, req)
    const actualPage = '/post';
    const queryParams = { id: 1 };
    app.render(req, res, actualPage, queryParams);
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})