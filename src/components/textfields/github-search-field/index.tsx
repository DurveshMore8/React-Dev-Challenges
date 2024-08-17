import Image from "next/image";
import { FunctionComponent } from "react";
import "./style.css";

interface GithubSearchFieldProps {}

const GithubSearchField: FunctionComponent<GithubSearchFieldProps> = () => {
  return (
    <div className="github-search-field">
      <Image src="/03/Search.svg" alt="" width={24} height={24} />
      <input
        type="text"
        placeholder="username"
        className="github-search-field-input"
      />
    </div>
  );
};

export default GithubSearchField;
