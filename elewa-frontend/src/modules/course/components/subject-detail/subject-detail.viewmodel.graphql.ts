import gql from 'graphql-tag';

export const subjectDetailVM = gql`

  query subjectDetailVM($id: String!) { 
    subject(id: $id) {
      name 
      slug
      icon

      courses {
        className
      }
    }
  }
`;
