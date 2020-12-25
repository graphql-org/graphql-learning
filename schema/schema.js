const graphql = require('graphql');
const _ = require('lodash');
const User = require('../model/user');
const Hobby = require('../model/hobby');
const Post = require('../model/post');

const { GraphQLObjectType, GraphQLId, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList } = graphql

// dummy data 
var userData = [
    { id: '1', name: 'Bond', age: 36, profession: 'coder' },
    { id: '2', name: 'James', age: 37, profession: 'coder' },
    { id: '3', name: 'Rajesh', age: 38, profession: 'coder' }
]
var hobbiesData = [
    { id: '1', title: 'programming', description: 'COder life', userId: '1' },
    { id: '2', title: 'coder', description: 'COder habit', userId: '1' },
    { id: '3', title: 'coder', description: 'COder passion', userId: '2' },
]

var postData = [
    { id: '1', comment: 'Building a Mind', userId: '1' },
    { id: '2', comment: 'GraphQL is Cmazing', userId: '1' },
    { id: '3', comment: 'I want to change the world', userId: '2' },
]

/**Begin Type Decalrations Step 1 */
//Step 1 Type 
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for User',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },
        // making relationships
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return _.filter(postData, { userId: parent.id })
            }
        },
        hobbies: {
            type: new GraphQLList(HoobyType),
            resolve(parent, args) {
                return _.filter(hobbiesData, { userId: parent.id })
            }
        }
    })
})


//Post Type {id,comments}
const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'post description',
    fields: () => ({
        id: { type: GraphQLString },
        comment: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(userData, { id: parent.userId }) // Look for ParentuserId
            }
        }
    })
})

const HoobyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Hobby Desc',
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        comment: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(userData, { id: parent.userId }) // Look for ParentuserId
            }
        }
    })
})

/**End Type Decalrations Step 1 */

/**Begin Root Query Decalarion Step 2 */
//RootQuery Mapping the Types (SQL)
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'description',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return _.find(userData, { 'id': args.id })
            }

        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return userData
            }
        },
        hobby: {
            type: HoobyType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return _.find(hobbiesData, { 'id': args.id })
            }
        },
        hobbies: {
            type: new GraphQLList(HoobyType),
            resolve(parent, args) {
                // return hobbiesData
            }

        },
        post: {
            type: PostType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                //return _.find(postData, { 'id': args.id })
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                // return postData
            }
        }
    }
});
/**End Root Query Decalarion Step 2 */

//Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
                profession: { type: GraphQLString }
            },
            resolve(parent, args) {
                let user = new User({
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                });
                user.save().then(result => {
                    console.log('user result=>' + result);
                }).catch(err => {
                    console.log('Error Message' + JSON.stringify(err));
                })
                return user;
            }
        },
        createPost: {
            type: PostType,
            args: {
                comment: { type: GraphQLString },
                userId: { type: GraphQLString }
            },
            resolve(parent, args) {
                let post = new Post({
                    comment: args.comment,
                    userId: args.userId
                })
                console.log('args.post::' + JSON.stringify(post));
                try { let result = post.save(); }
                catch (err) { conesole.log('post save error::' + err); }
                return post;
            }
        },
        createHobby: {
            type: HoobyType,
            args: {
                //id
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                userId: { type: GraphQLString }
            },
            resolve(parent, args) {
                let hobby = new Hobby({
                    title: args.title,
                    description: args.description,
                    userId: args.userId
                })
                console.log('JSON Stringfy::' + JSON.stringify(hobby));
                try { let result = hobby.save(); }
                catch (err) { conesole.log('post save error::' + err); }
                return hobby;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})