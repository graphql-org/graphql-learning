const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./schema/schema');
const testSchema = require('./schema/types_schema')


const app = express();


app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}),
);

mongoose.connect(`mongodb+srv://admin:GXtBLKaH3pxdS8zZ@cluster0.qhmkv.mongodb.net/event_db?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('We are connected');
        app.listen(4000);
    }).catch(err => {
        console.log(err);
    })