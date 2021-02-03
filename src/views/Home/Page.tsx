import "./scss/index.scss";

import classNames from "classnames";
import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { ProductsFeatured } from "../../components";
import { generateCategoryUrl } from "../../core/utils";

import {
  ProductsList_categories,
  ProductsList_shop,
  ProductsList_shop_homepageCollection_backgroundImage,
} from "./gqlTypes/ProductsList";

import { structuredData } from "../../core/SEO/Homepage/structuredData";

import noPhotoImg from "../../images/no-photo.svg";
import shoppinglady from "../../images/shoppinglady.svg";
import shoppinglady2 from "../../images/shoppinglady2.svg";
import comein from "../../images/comein.jpg";
import bg from "../../images/blackbg.jpg";

const Page: React.FC<{
  loading: boolean;
  categories: ProductsList_categories;
  backgroundImage: ProductsList_shop_homepageCollection_backgroundImage;
  shop: ProductsList_shop;
}> = ({ categories, shop }) => {
  const categoriesExist = () => {
    return categories && categories.edges && categories.edges.length > 0;
  };
  const intl = useIntl();

  return (
    <div className= 'home'>
      <script className="structured-data-list" type="application/ld+json">
        {structuredData(shop)}
      </script>
      <div className="home-page__hero">
        <div className="home-page_cover">
          <img
            className="home-page_coverImg"
            src={shoppinglady}
            alt="image"
          ></img>
          <div className="home-page_intro">
          <img
            className="home-page_coverImg"
            src={shoppinglady2}
            alt="image"
          ></img>
          </div>
        </div>
      </div>
      <hr ></hr>

      {categoriesExist() && (
        <div className="home-page__categories">
          <div className="container">
            <h3>
              <FormattedMessage defaultMessage="Shop By Category" />
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
                    <h3>{category.name}</h3>
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
    </div>
  );
};

export default Page;
