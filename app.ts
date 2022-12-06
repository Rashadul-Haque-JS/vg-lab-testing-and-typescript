import express from 'express'
const app = express()

app.get('/', (req, res) => {
    res.send('Project started')
})

export default app