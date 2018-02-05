import gql from 'graphql-tag';

export const subjectSelectionViewModel = gql`

  query subjectSelectionViewModel { 
    subjects {
      id
      name 
      slug
      icon
    }
  }

`;
