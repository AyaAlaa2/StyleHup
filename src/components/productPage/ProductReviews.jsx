import React from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const ProductReviews = ({ product, currentReview }) => {
  const stars = [1, 2, 3, 4, 5];
  const reviewRating = [5, 4, 3, 2, 1];
  return (
    <div>
      <div className="px-[16px] pt-[16px] pb-[8px]">
        <p className="font-bold text-[18px] leading-[23px]">Customer Reviews</p>
      </div>
      <div className="p-[16px] flex gap-[32px]">
        <div className="flex flex-col gap-[8px]">
          <p className="text-black text-[36px] font-black leading-[45px]">
            {product.customer_reviews.average_rating}
          </p>
          <div className="flex gap-[2px] text-[18px]">
            {stars.map((star, idx) => (
              <span key={idx}>
                {Math.round(product.customer_reviews.average_rating) >= star ? (
                  <FaStar />
                ) : (
                  <CiStar />
                )}
              </span>
            ))}
          </div>
          <p className="text-[16px] leading-[24px] font-normal">
            {product.customer_reviews.total_reviews} reviews
          </p>
        </div>
        <div className="flex flex-col gap-[12px]">
          {reviewRating.map((rate, idx) => (
            <div key={idx} className="flex items-center gap-[8px]">
              <p className="text-[14px] leading-[21px]">{rate}</p>
              <progress
                className="progress w-56"
                value={product.customer_reviews.ratings_distribution[rate]}
                max="100"
              ></progress>
              <p className="text-[14px] leading-[21px]">
                {product.customer_reviews.ratings_distribution[rate] > 100
                  ? Math.floor(
                      (product.customer_reviews.ratings_distribution[rate] /
                        200) *
                        100
                    )
                  : Math.floor(
                      (product.customer_reviews.ratings_distribution[rate] /
                        100) *
                        100
                    )}
                %
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="p-[16px] flex flex-col gap-[32px]">
        {currentReview.map((review, idx) => (
          <div key={idx} className="flex flex-col gap-[12px]">
            <div className="flex gap-[12px] items-center">
              <div className="flex gap-[12px]">
                <div className="rounded-full w-[40px] h-[40px]">
                  <img
                    src={review.profile_pic}
                    alt="profile Image"
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <p className="font-medium text-[16px] leading-[24px] text-[#141414]">
                  {review.name}
                </p>
                <p className="font-normal text-[14px] leading-[21px] text-[#757575]">
                  {review.date}
                </p>
              </div>
            </div>
            <div className="flex text-[20px] gap-[2px]">
              {stars.map((star) =>
                review.rating >= star ? <FaStar /> : <CiStar />
              )}
            </div>
            <p className="font-normal text-[16px] leading-[24px]">
              {review.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
