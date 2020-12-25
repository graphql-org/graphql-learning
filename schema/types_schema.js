const graphql = require('graphql');

const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLFloat } = graphql;

//ScalarTypeDefinition
/* 
String = GraphQLString  
int
Float
Boolean 
ID
*/

//
const Person = new GraphQLObjectType({
    name: 'Person',
    description: 'Represet a Person Type',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        isMarried: { type: GraphQLBoolean },
        gpa: { type: GraphQLFloat }
    })
})

//RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'description',
    fields: {
        person: {
            type: Person,
            resolve(parent, args) {
                let personObj = {
                    name: 'Antinio',
                    age: 35,
                    isMarried: true,
                    gpa: 4.0
                }
                return personObj;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})