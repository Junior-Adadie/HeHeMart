import * as React from "react";
import { Explore_products_edges_node } from "./gqlTypes/Explore";
import { Link } from "react-router-dom";
import {TypedExploreQuery} from "./queries";
import { generateProductUrl, maybe } from "../../core/utils";
import { Carousel, ProductListItem } from "..";


interface EploredProps {
  title?: string;
}
export const Explore: React.FC<EploredProps> = ({title}) => {
  return (
    <>
    <TypedExploreQuery >
    {({ data }) => {
      const products = maybe(
        () => data.products.edges,
        []
      );
      console.log(data)
        if (products.length) {
          return (
            <div className="products-featured">
              <div className="container">
                <h3 style={{color:"black"}}>{title}</h3>
                  {products.map(({ node: product }) => (
                    <Link
                      to={generateProductUrl(product.id, product.name)}
                      key={product.id}
                    >
                      <ProductListItem exploreProduct={product} product={product}/>
                    </Link>
                  ))}
              </div>
            </div>
          );
        }
        return null;
        }}
      </TypedExploreQuery>
    </>
  );
};

Explore.defaultProps = {
  title: "Explore",
};
