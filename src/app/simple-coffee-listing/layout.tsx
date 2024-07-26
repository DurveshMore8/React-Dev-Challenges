import { Metadata } from "next";
import { DM_Sans } from "next/font/google";

export const metadata: Metadata = {
  title: "Simple Coffee Listing",
};

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

interface SimpleCoffeeListingLayoutProps {
  children: Readonly<React.ReactNode>;
}

const SimpleCoffeeListingLayout: React.FunctionComponent<
  SimpleCoffeeListingLayoutProps
> = ({ children }) => {
  return children;
};

export default SimpleCoffeeListingLayout;
