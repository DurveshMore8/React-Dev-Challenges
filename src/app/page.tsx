import Link from "next/link";

interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = () => {
  const projects = [
    {
      name: "Simple Coffee Listing",
      link: "/simple-coffee-listing",
    },
  ];

  return (
    <main className="pt-8 flex justify-center items-center flex-col mb-3">
      <span className="text-2xl">Welcome to Dev Challenges</span>
      {projects.map((project, index) => (
        <Link key={index} href={project.link}>
          {index + 1}. {project.name}
        </Link>
      ))}
    </main>
  );
};

export default Home;
