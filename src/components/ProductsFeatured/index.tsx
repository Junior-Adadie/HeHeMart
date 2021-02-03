import * as React from "react";
import { Link } from "react-router-dom";

import { Carousel, ProductListItem } from "..";
import { generateProductUrl, maybe } from "../../core/utils";
import { TypedFeaturedProductsQuery } from "./queries";

import "./scss/index.scss";

interface ProductsFeaturedProps {
  title?: string;
}

const ProductsFeatured: React.FC<ProductsFeaturedProps> = ({ title }) => {
  return (
    <TypedFeaturedProductsQuery displayError={false}>
      {({ data }) => {
        const products = maybe(
          () => data.shop.homepageCollection.products.edges,
          []
        );

        if (products.length) {
          return (
            <div className="products-featured">
              <div className="container">
                <h3>{title}</h3>
                <Carousel className="carousel">
                  {products.map(({ node: product }) => (
                    <Link
                      to={generateProductUrl(product.id, product.name)}
                      key={product.id}
                    >
                      <ProductListItem product={product} />
                    </Link>
                  ))}
                </Carousel>
              </div>
              <div>
              <div className='divider'><h1>Explore</h1></div>
              <div className="all">
                <div className="container">
                  {products.map(({ node: product }) => (
                    <Link
                      to={generateProductUrl(product.id, product.name)}
                      key={product.id}
                    >
                      <ProductListItem product={product} />
                    </Link>
                  ))}
                </div>
                <div className="container">
                  <div>
                    {products.map(({ node: product }) => (
                      <Link
                        to={generateProductUrl(product.id, product.name)}
                        key={product.id}
                      >
                        <ProductListItem product={product} />
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="container">
                  <div>
                    {products.map(({ node: product }) => (
                      <Link
                        to={generateProductUrl(product.id, product.name)}
                        key={product.id}
                      >
                        <ProductListItem product={product} />
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="container">
                  <div>
                    {products.map(({ node: product }) => (
                      <Link
                        to={generateProductUrl(product.id, product.name)}
                        key={product.id}
                      >
                        <ProductListItem product={product} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              </div>
            </div>
          );
        }
        return null;
      }}
    </TypedFeaturedProductsQuery>
  );
};

ProductsFeatured.defaultProps = {
  title: "Featured",
};

export default ProductsFeatured;
