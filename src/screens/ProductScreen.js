import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { productData } from "../actions/productActions";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { error, product, loading } = productDetails;

  useEffect(() => {
    dispatch(productData(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  if (loading) return <div> Loading </div>;
  if (error) return <div className="error"> {error} </div>;
  return (
    <div>
      <Link to="/">Back to Home</Link>
      <div className="row top">
        <div className="col-2">
          <img className="large" src={product.image} alt={product.name} />
        </div>
        <div className="col-1">
          <ul>
            <li>
              <h1>{product.name}</h1>
            </li>
            <li>
              <Rating
                rating={product.rating}
                reviewsCount={product.reviewsCount}
              />
            </li>
            <li>Price: ${product.price}</li>
            <li>
              Description: <p>{product.description}</p>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <div className="row">
                  <div>Price</div>
                  <div className="price">${product.price}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Status</div>
                  <div className="status">
                    <span className={product.stockCount ? "success" : "error"}>
                      {product.stockCount ? "Stock Available" : "Out of Stock"}
                    </span>
                  </div>
                </div>
              </li>
              {product.stockCount > 0 && (
                <>
                  <li>
                    <div className="row">
                      <div>Quantity</div>
                      <div>
                        <select
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.stockCount).keys()].map((val) => (
                            <option key={val + 1} value={val + 1}>
                              {val + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </li>
                  <li>
                    <button
                      onClick={addToCartHandler}
                      className="primary block"
                    >
                      Add to Cart
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
