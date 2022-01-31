import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
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

export const GET_BOOK = gql`
  query book {
    book {
      bookId
      authors
      description
      image
      link
      title
    }
  }
`;

export const GET_SAVEDBOOKS = gql`
  query book {
    book {
      bookId
      authors
      description
      image
      link
      title
    }
  }
`;