import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { individualProduct } from "../../../store/shopProducts/product-slice";
import {
  allReview,
  deleteReview,
  sendReview,
} from "../../../store/shopProducts/review";

const Review = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productList2 } = useSelector((state) => state.shopProduct);
  const { reviewList } = useSelector((state) => state.review);
  const { user } = useSelector((state) => state.auth);
  console.log(reviewList);
  console.log(user.user.id);
  const [form, setform] = useState({
    text: "",
    rating: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendReview({ data: form, id }))
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setform({ ...form });
  };

  const changeHandle = (e) => {
    let { value, name } = e.target;
    setform({ ...form, [name]: value });
  };

  console.log(form);

  useEffect(() => {
    dispatch(individualProduct(id)).then((res) => {
      console.log(res);
    });
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(allReview(id))
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [dispatch, id]);

  return (
    <>
      <div className="max-w-xl mx-auto p-6">
        {/* Product Information */}
        <div className="mb-8 w-full">
          <img
            src={productList2?.image}
            alt="product"
            className="w-[400px] h-[250px] object-cover bg-gray-100 rounded-lg"
          />

          <h1 className="text-md font-bold mt-4">Product Name</h1>

          <p className="text-gray-600 mt-2">{productList2?.description}</p>

          <p className="text-xl font-semibold mt-3">
            ₹ {productList2?.salePrice}
          </p>
        </div>

        {/* Review Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Write a Review</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Rating */}
            <div>
              <label className="block mb-1 font-medium">Rating</label>

              <select
                name="rating"
                value={form.rating}
                onChange={changeHandle}
                className="border p-2 w-full"
              >
                <option value="">Select Rating</option>
                <option value="1">1 ⭐</option>
                <option value="2">2 ⭐⭐</option>
                <option value="3">3 ⭐⭐⭐</option>
                <option value="4">4 ⭐⭐⭐⭐</option>
                <option value="5">5 ⭐⭐⭐⭐⭐</option>
              </select>
            </div>

            {/* Review Text */}
            <div>
              <label className="block mb-1 font-medium">Review</label>

              <textarea
                name="text"
                rows="4"
                value={form.text}
                onChange={changeHandle}
                placeholder="Write your review..."
                className="border p-2 w-full"
              />
            </div>

            {/* Button */}
            <button type="submit" className="bg-black text-white px-6 py-2">
              Submit Review
            </button>
          </form>
        </div>
      </div>
      {/* {id=== } */}
      <div className="mt-12 w-full">
        <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>

        {reviewList?.length === 0 ? (
          <p className="text-gray-500">No reviews for this product</p>
        ) : (
          <div className="flex flex-wrap gap-6">
            {reviewList.map((review) => (
              <div
                key={review._id}
                className="w-[220px] p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition"
              >
                {/* User + Rating */}
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-sm truncate">
                    {review.user?.userName}
                  </p>

                  <div className="text-yellow-500 text-sm whitespace-nowrap">
                    {"⭐".repeat(review.rating)}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-sm break-words line-clamp-3">
                  {review.text}
                </p>

                {/* Date */}
                <p className="text-xs text-gray-400 mt-3">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>

                {/* Delete Button */}
                {user?.user?.id === review.user?._id && (
                  <button
                    onClick={() => dispatch(deleteReview(review._id))}
                    className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white text-sm py-1 rounded transition"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Review;
