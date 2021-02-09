import gql from "graphql-tag";
import { TypedQuery } from "../../core/queries";
import {
  basicProductFragment,
  productPricingFragment,
} from "../../views/Product/queries";
import {Explore} from "./gqlTypes/Explore";

export const ExploreQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  query Explore{
        products(first: 10) {
          edges {
            node {
              ...BasicProductFields
              ...ProductPricingField
              category{
              id
              name
            }
            }
          }
        }
      }
`
export const TypedExploreQuery = TypedQuery<Explore, {}>(ExploreQuery);
;

