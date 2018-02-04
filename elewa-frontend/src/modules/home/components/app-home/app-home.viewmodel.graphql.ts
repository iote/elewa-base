
import gql from 'graphql-tag';

export const appHomeViewModel = gql`

  query appHomeViewModel { 
    subjects {
      id
      name 
      slug
      icon
    }
  }

`;
