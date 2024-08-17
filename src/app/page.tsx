/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";

interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = () => {
  const projects = [
    {
      name: "Simple Coffee Listing",
      link: "/simple-coffee-listing",
      image: "/thumbnail/01.png",
    },
    {
      name: "Translate App",
      link: "/translate-app",
      image: "/thumbnail/02.png",
    },
    {
      name: "Github Profile",
      link: "/github-profile",
      image: "/thumbnail/03.png",
    },
  ];

  return (
    <main className="bg-gray-900 min-h-screen">
      <header className="text-center py-10">
        <h1 className="text-4xl font-bold text-white">
          Welcome to React Dev Challenges
        </h1>
        <p className="text-gray-400 mt-4">by Durvesh More</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300"
          >
            <img
              src={project.image}
              alt={project.name}
              className="h-48 w-full object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold text-white mb-2">
              {project.name}
            </h3>
            <p className="text-gray-400 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              lacinia odio vitae vestibulum.
            </p>
            <Link href={project.link}>
              <span className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300">
                View Details
              </span>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
