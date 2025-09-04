// server.js
import jsonServer from 'json-server'
import auth from 'json-server-auth'
import cors from 'cors'

const app = jsonServer.create()
const router = jsonServer.router('./data/db.json')

// กำหนด rules สำหรับ json-server-auth
const rules = auth.rewriter({
  users: 600,
  reviews: 644,
  shows: 644
})

app.db = router.db

app.use(cors())
app.use(jsonServer.defaults())
app.use(rules)
app.use(auth)
app.use(router)

app.listen(5001, () => {
  console.log('JSON Server with Auth running on port 5001')
})
