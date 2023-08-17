import {gql} from "@apollo/client";

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!){
        addUser(username: $username, email: $email, password: $password){
            token
            user {
                _id
                usernmae
                email
                bookCount
                savedBooks{
                    bookId
                    authors
                    description
                    image
                    link
                    title
                }
            }
        }
    }    
`;

export const LOGIN_USER = gql`
    mutation login ($email: String!, $password: String!) {
        login(email: $email, password: $password){
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($newBook: InputBook!){
        saveBook (newBook: $newBook){
            _id
            username
            email
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;

//remove book
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: Int!) {
        removeBook(bookId: $bookId) {
            _id
            username
            email
            savedBooks {
                bookId
                authors
                description
                image
                link
                title
            }
        }
    }
`;
