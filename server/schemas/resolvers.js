// File should be like user-controller.js

//Imports the user model
const {AuthenticationError} = require ('apollo-server-express');
const {User} = require('../models');

// Imports sign tocken function from auth
const {signToken} =  require('../utils/auth');

const resolvers = {
    Query: {
        //returns if the user name exist. 
        user: async (parent, {username}) => {
            return User.findOne({username});
        },

        //finds a user by the ID. 
        userId: async (parent, {_id}) => {
            return User.findOne({_id});
        } 
    },

    Mutation: {
        addUser: async (parent,args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return {token, user};
        },

        login: async (parent, {email ,password}) => {
            const user = await User.findOne({ email });
            
            if (!user) {
                throw new AuthenticationError("No user found with this email address")
            }

            const correctPW = await user.isCorrectPassword(password);
            if (!correctPW){
                throw new AuthenticationError("Incorrect credentials");
            }

            const token = signToken(user);

            return {token, user};
        },

           // By adding context to our query, we can retrieve the logged in user without specifically searching for them

        savebook: async (parent, args, context) => {
            console.log(context);
            if(context.user){
                const updatedUser = await User.findOneAndUpdate(
                  {_id: user._id},
                  {$addToSet: {savedBooks: args.input}},
                  {new: true, runValidators: true}
                );

                return updatedUser;
            }
            throw new AuthenticationError("You need to be logged in");
        },

        deleteBook: async(parent, args, context) => {
            if(context.user){
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedBooks: {bookId: args.bookId}}},
                    {new:true}
                );

                console.log(updatedUser);
                return updatedUser;
            }
            
            throw new AuthenticationError("Could not find user with this ID")
        }
    },  
};

module.exports = resolvers;