import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import { ProductsList } from "./gqlTypes/ProductsList";
import {
  basicProductFragment,
  productPricingFragment,
} from "../Product/queries";

export const homePageQuery = gql`
${basicProductFragment}
${productPricingFragment}
  query ProductsList {
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
              ...BasicProductFields
              ...ProductPricingField
              category {
                id
                name
              }
            }
          }
        }
      }
    }
    categories(level: 0, first: 5) {
      edges {
        node {
          id
          name
          backgroundImage {
            url
          }
        }
      }
    }
}
`;

export const TypedHomePageQuery = TypedQuery<ProductsList, {}>(homePageQuery);
