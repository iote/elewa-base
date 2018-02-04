
import gql from 'graphql-tag';

export const allSubjectsLinks = gql`

  query allSubjectsLinks { 
    subjects {
      id
      name 
      color
      icon
    }
  }

`;
