const graphql = require('graphql');
const _ = require('lodash');

const User = require('../models/User');
const Profile = require('../models/Profile');


const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLList 
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        avatar: {type: GraphQLString},
        date: {type: GraphQLString},
        profile:{
            type: new GraphQLList(ProfileType),
            resolve(parent,args){
                // return _.filter(profiles, {user: parent.id})
                return Profile.find({user: parent.id})
            }
        }
    })
});

const ProfileType = new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        user: {
            type: UserType,
            resolve(parent, args){
                // return _.find(users, {id: parent.user})
                return User.findById(parent.user)
            }
        },
        skills:{
            type: new GraphQLList(GraphQLString)
        },
        company: {
            type: GraphQLString
        },
        website: {
            type: GraphQLString
        },
        location: {
            type: GraphQLString
        },
        status: {
            type: GraphQLString,
            required: true
        },
        bio: {
            type: GraphQLString
        },
        githubusername: {
            type: GraphQLString
        },
        date: {
            type: GraphQLString,
            default: GraphQLString
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        user: {
            type:UserType,
            args:{ id:{ type: GraphQLID } },
            resolve(parent, args){
                // return _.find(users, {id: args.id });
                return User.findOne({ _id: args.id});
            }
        },
        profile: {
            type:ProfileType,
            args:{ id:{ type: GraphQLID } },
            resolve(parent, args){
                // return _.find(profiles, {id: args.id });
                return Profile.findOne({ _id: args.id});
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent,args){
                // return users
                return User.find()
            }
        },
        profiles: {
            type: new GraphQLList(ProfileType),
            resolve(parent,args){
                // return profiles
                return Profile.find()
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addUser:{
            type:UserType,
            args:{
                name:{type:GraphQLString},
                email:{type:GraphQLString},
                password:{type:GraphQLString}
            },
            resolve(parent,args){
                let user = new User(args);
                return user.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
});