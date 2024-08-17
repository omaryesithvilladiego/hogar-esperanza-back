const app = require('./app')
const dbConnect= require('./src/config/dbConnect')

dbConnect().then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => console.log(`server listening on port ${PORT}`))

}).catch((err) => {console.log(err);
})

const PORT = 3000
