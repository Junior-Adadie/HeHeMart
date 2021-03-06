import "./scss/index.scss";

import classNames from "classnames";
import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import {Explore} from "../../components/Explore"
import { Button, Loader, ProductsFeatured} from "../../components";
import { generateCategoryUrl, maybe } from "../../core/utils";

import {
  ProductsList_categories,
  ProductsList_shop,
  ProductsList_shop_homepageCollection_backgroundImage,
  ProductsList_shop_homepageCollection
} from "./gqlTypes/ProductsList";
import { Carousel } from "../../components";

import { structuredData } from "../../core/SEO/Homepage/structuredData";

import noPhotoImg from "../../images/no-photo.svg";
import {ProductDetails_product} from "../Product/gqlTypes/ProductDetails";

const Page: React.FC<{
  loading: boolean;
  categories: ProductsList_categories;
  backgroundImage: ProductsList_shop_homepageCollection_backgroundImage;
  shop: ProductsList_shop;
}> = ({ loading, categories, backgroundImage, shop }) => {
  const categoriesExist = () => {
    return categories && categories.edges && categories.edges.length > 0;
  };
  
  const intl = useIntl();
  return (
    <div className="home-page">
      <script className="structured-data-list" type="application/ld+json">
        {structuredData(shop)}
      </script>
      <div
        className="home-page__hero"
        style={
          backgroundImage
            ? { backgroundImage: `url(${backgroundImage.url})` }
            : null
        }
      >
        <div className="home-page__hero-text">
          <div>
            <span className="home-page__hero__title">
              <h1>
                <FormattedMessage defaultMessage="PLACE ORDER" />
              </h1>
            </span>
          </div>
          <div>
            <span className="home-page__hero__title">
              <h1>
                <FormattedMessage defaultMessage="BEFORE 4PM" />
              </h1>
            </span>
          </div>
        </div>
        <div className="home-page__hero-action">
          {loading && !categories ? (
            <Loader />
          ) : (
            categoriesExist() && (
              <Link
                to={generateCategoryUrl(
                  categories.edges[0].node.id,
                  categories.edges[0].node.name
                )}
              >
                <Button
                  className="home-page__hero-action__button"
                  testingContext="homepageHeroActionButton"
                >
                  <FormattedMessage defaultMessage="Explore" />
                </Button>
              </Link>
            )
          )}
        </div>
      </div>
      {categoriesExist() && (
        <div className="home-page__categories">
          <div className="container">
            <h3>
              <FormattedMessage defaultMessage="Shop by category" />
            </h3>
            <div className="home-page__categories__list">
                {categories.edges.map(({ node: category }) => (
                  <div key={category.id}>
                    <Link
                      to={generateCategoryUrl(category.id, category.name)}
                      key={category.id}
                    >
                      <div
                        className={classNames(
                          "home-page__categories__list__image",
                          {
                            "home-page__categories__list__image--no-photo": !category.backgroundImage,
                          }
                        )}
                        style={{
                          backgroundImage: `url(${
                            category.backgroundImage
                              ? category.backgroundImage.url
                              : noPhotoImg
                          })`,
                        }}
                      />
                      <h2>{category.name}</h2>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      <ProductsFeatured
        title={intl.formatMessage({ defaultMessage: "Featured" })}
      />
      <Explore
      />
    </div>
  );
};

export default Page;
