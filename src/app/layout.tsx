import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "React Dev Challenges",
  description: "Completed the challenges provided by devchallenges.io",
};

interface HomeLayoutProps {
  children: Readonly<React.ReactNode>;
}

const HomeLayout: React.FunctionComponent<HomeLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default HomeLayout;
