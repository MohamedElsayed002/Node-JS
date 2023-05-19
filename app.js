const express = require('express')
require('express-async-errors');
const dotenv = require('dotenv')
const connectDB = require('./db/connect')
dotenv.config()
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const morgan = require('morgan')
const authRouter = require('./routes/auth.Route')
const userRouter = require('./routes/user.Route')
const productRouter = require('./routes/product.Route')
const reviewRouter = require('./routes/review.Router')
const orderRouter = require('./routes/order.router')
const fileUpload = require('express-fileupload')
const app = express()

app.use(morgan('tiny'))
app.use(express.json())
app.use(express.static('./public'))
app.use(fileUpload())


app.get('/' , (req,res) => {
    res.send("<h1>Hello Mohamed</h1>")
})

app.use('/api/v1/auth' , authRouter)
app.use('/api/v1/user' , userRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/review', reviewRouter)
app.use('/api/v1/order',orderRouter )

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

const PORT = process.env.PORT || 3005

const start = async () => {
    try {
        await connectDB(process.env.CONNECTION)
        app.listen(PORT , console.log(`Server is listening on port ${PORT}`))
    }catch(error) {
        console.log(error)
    }
}

start()