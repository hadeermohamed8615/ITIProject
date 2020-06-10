const path = require('path');

const express = require('express');
const app = express();

const port = 3000

const cors = require('cors')

const sequelize = require('./util/database')
const Product = require('./models/product')
const User = require('./models/user')
const Order = require('./models/order')

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json())

app.use(express.urlencoded())

app.use(cors())

Product.belongsTo(User);
User.hasMany(Product);

User.belongsToMany(Product, {through : Order});
Product.belongsToMany(User, {through : Order});


const userRouter = require('./routes/user')

app.use('/api/user', userRouter)


sequelize
.sync()
.then(result => {
    app.listen(port,()=>{
        console.info(`server listening on port ${port}`)
    });
})
.catch(err => {
    console. log(err)
})

