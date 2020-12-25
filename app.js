const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 4000;

const schema = require('./schema/schema');
const testSchema = require('./schema/types_schema')


const app = express();

app.use(cors());
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}),
);

mongoose.connect(`mongodb+srv://admin:GXtBLKaH3pxdS8zZ@cluster0.qhmkv.mongodb.net/user_db?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('We are connected');
        app.listen(port);
    }).catch(err => {
        console.log(err);
    })