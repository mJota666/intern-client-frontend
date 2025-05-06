/** @jsxImportSource @emotion/react */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
import { Article } from "../interfaces/Article";
import { AuthContext } from "../context/AuthContext";
import { css } from "@emotion/react";
import ArticleCard from "../components/ArticleCard";

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const { logout } = useContext(AuthContext)!;

  const hideScrollBarCss = css`
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;
  `;

  useEffect(() => {
    console.log("HomePage");
    client
      .get<Article[]>("/contents")
      .then((res) => setArticles(res.data))
      .catch(console.error);
  }, []);

  const navigate = useNavigate();

  return (
    <div className="w-[100vw] h-[100vh] bg-[url('/homepage-background.png')] bg-cover bg-center  bg-repeat-none ">
      <div className="absolute bg-black/30 inset-0 backdrop-blur-sm"></div>
      {/* Navigation */}
      <div className="h-1/10 w-full flex flex-row justify-center items-center gap-4 backdrop-blur-[10px]">
        <img
          onClick={() => {
            navigate("/profile");
          }}
          src="/profile-icon.svg"
          alt="Logout Icon"
          className="absolute w-[50px] cursor-pointer hover:scale-110 transition-all duration-200"
        />

        <img
          onClick={logout}
          src="/logout-icon.svg"
          alt="Logout Icon"
          className="absolute invert right-[20px]  rounded-full border-4 border-white p-2 cursor-pointer hover:scale-110 transition-all duration-200"
        />
      </div>
      {/* Content List */}
      <div className="h-9/10 w-full overflow-auto" css={hideScrollBarCss}>
        <ul className="flex flex-wrap justify-center gap-4 w-full p-10">
          {articles.map((a, index) => (
            <ArticleCard key={index} a={a} />
          ))}
          {articles.length === 0 && (
            <li className="text-gray-500">No articles yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
