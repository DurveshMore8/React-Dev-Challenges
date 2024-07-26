import { CoffeeType } from "@/types/coffee-type";
import "./style.css";
import StarIcon from "@/components/icons/Star";
import StarFillIcon from "@/components/icons/StarFill";

/* eslint-disable @next/next/no-img-element */
interface CoffeeCardProps {
  coffee: CoffeeType;
}

const CoffeeCard: React.FunctionComponent<CoffeeCardProps> = ({ coffee }) => {
  return (
    <div className="coffee-card">
      {coffee.popular && <span className="coffee-card-popular">Popular</span>}
      <img src={coffee.image} alt="" />
      <div className="coffee-card-details-one">
        <h4>{coffee.name}</h4>
        <span>{coffee.price}</span>
      </div>
      <div className="coffee-card-details-two">
        <div className="coffee-card-details-two-ratings">
          {coffee.rating ? <StarFillIcon /> : <StarIcon />}
          {coffee.rating ? (
            <>
              <span className="coffee-card-details-two-ratings-rate">
                {coffee.rating}
              </span>
              <span className="coffee-card-details-two-ratings-votes">
                ({coffee.votes} votes)
              </span>
            </>
          ) : (
            <span className="coffee-card-details-two-ratings-votes">
              No ratings
            </span>
          )}
        </div>
        {!coffee.available && (
          <div className="coffee-card-details-two-sold">Sold Out</div>
        )}
      </div>
    </div>
  );
};

export default CoffeeCard;
