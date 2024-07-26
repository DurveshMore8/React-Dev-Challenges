import { DM_Sans } from "next/font/google";
import coffee_data from "../../public/01/data.json";
import CoffeeCard from "@/components/coffee-card";
import "./style.css";

const dmSans = DM_Sans({
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "1000",
  ],
  subsets: ["latin"],
});

interface SimpleCoffeeListingProps {}

const SimpleCoffeeListing: React.FunctionComponent<
  SimpleCoffeeListingProps
> = () => {
  return (
    <main className={`coffee-listing ${dmSans.className}`}>
      <div className="coffee-listing-section">
        <h1>Our Collection</h1>
        <span className="coffee-listing-section-description">
          Introducing our Coffee Collection, a selection of unique coffees from
          different roast types and origins, expertly roasted in small batches
          and shipped fresh weekly.
        </span>
        <div className="coffee-listing-section-options">
          <span className="coffee-listing-section-options-option selected">
            All Products
          </span>
          <span className="coffee-listing-section-options-option">
            Available Now
          </span>
        </div>
        <div className="coffee-listing-section-grid">
          {coffee_data.map((coffee, index) => (
            <CoffeeCard key={index} coffee={coffee} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default SimpleCoffeeListing;
