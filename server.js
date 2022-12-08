require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const {notFound, errorHandler } = require('./middlewares/errorhandler')
const connectDB = require('./middlewares/connectDB')
const AuthRoutes = require('./routes/auth')
const UserRoutes = require('./routes/user')
const ProductRoutes = require('./routes/products')

connectDB()

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors())


app.get('/', (req, res) => {
    res.json({"message": "connected"})
})

app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/products', ProductRoutes);

app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))