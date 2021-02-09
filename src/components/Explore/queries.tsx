import gql from "graphql-tag";
import { ProductsList } from "./gqlTypes/ProductsList";

export const Explore = gql`
  query ProductsList{
  shop {
      description
      name
      homepageCollection {
        id
        backgroundImage {
          url
        }
        name
        products(first: 10) {
          edges {
            node {
              id
              name
              category {
                id
                name
              }
            }
          }
        }
      }
    }
      
  }
`;
