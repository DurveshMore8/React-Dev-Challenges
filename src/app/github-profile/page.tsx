import { FunctionComponent, Suspense, use } from "react";
import "./page.css";
import { Be_Vietnam_Pro } from "next/font/google";
import GithubSearchField from "@/components/textfields/github-search-field";
import Image from "next/image";

const vietnam = Be_Vietnam_Pro({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

interface GithubProfileProps {}

const fetchProfile = async (name: string) => {
  const response = await fetch(`https://api.github.com/users/${name}`);
  return await response.json();
};

const fetchRepo = async (url: string) => {
  const response = await fetch(url);
  return await response.json();
};

const GithubProfile: FunctionComponent<GithubProfileProps> = () => {
  const data = use(fetchProfile("GitHub"));
  const repo = use(fetchRepo(data.repos_url));

  return (
    <Suspense>
      <main className={`github ${vietnam.className}`}>
        <section className="github-top">
          <GithubSearchField />
        </section>
        <section className="github-stats">
          {/* github profile image and profile statisitics */}
          <div className="github-stats-detail">
            <div className="github-stats-detail-image">
              <Image
                src={data.avatar_url}
                alt=""
                width={120}
                height={120}
                style={{ borderRadius: 16 }}
              />
            </div>
            <div className="github-stats-detail-numbers">
              <div className="github-stats-detail-numbers-card">
                <span className="github-stats-details-numbers-card-text">
                  Followers
                </span>
                <div className="github-stats-details-numbers-card-divider"></div>
                <span className="github-stats-details-numbers-card-number">
                  {data.followers}
                </span>
              </div>
              <div className="github-stats-detail-numbers-card">
                <span className="github-stats-details-numbers-card-text">
                  Following
                </span>
                <div className="github-stats-details-numbers-card-divider"></div>
                <span className="github-stats-details-numbers-card-number">
                  {data.following}
                </span>
              </div>
              <div className="github-stats-detail-numbers-card">
                <span className="github-stats-details-numbers-card-text">
                  Location
                </span>
                <div className="github-stats-details-numbers-card-divider"></div>
                <span className="github-stats-details-numbers-card-number">
                  {data.location}
                </span>
              </div>
            </div>
          </div>
          {/* github profile name and bio */}
          <div className="github-stats-header">
            <h2 className="github-stats-header-title">{data.name}</h2>
            <span className="github-stats-header-body">{data.bio}</span>
          </div>
          {/* github profile repository grid */}
          <div className="github-stats-grid">
            {repo.map((e: any, i: number) => {
              return (
                <div key={i} className="github-stats-profile-card">
                  <h3 className="github-profile-card-name">{e.name}</h3>
                  <span className="github-profile-card-description">
                    {e.description}
                  </span>
                  <div className="github-profile-card-stats">
                    <div className="github-profile-card-stats-div">
                      <Image
                        src="/03/Nesting.svg"
                        alt=""
                        width={24}
                        height={24}
                      />
                      <span className="github-profile-card-stats-div-text">
                        {e.forks_count}
                      </span>
                    </div>
                    <div className="github-profile-card-stats-div">
                      <Image src="/03/Star.svg" alt="" width={24} height={24} />
                      <span className="github-profile-card-stats-div-text">
                        {e.stargazers_count}
                      </span>
                    </div>
                    <span className="github-profile-card-stats-updated">
                      updated 4 days ago
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </Suspense>
  );
};

export default GithubProfile;
