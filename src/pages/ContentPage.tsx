/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import client from "../api/client";
import { socket } from "../api/socket";
import { css } from "@emotion/react";

interface TextBlock {
  type: "text";
  data: { header: string; body: string };
}
interface ImageBlock {
  type: "image";
  data: string;
}
interface VideoBlock {
  type: "video";
  data: string;
}
type Block = TextBlock | ImageBlock | VideoBlock;

interface Article {
  _id: string;
  title: string;
  updatedAt: string;
  blocks: Block[];
}

const hideScrollBarCss = css`
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

export default function ContentPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (!id) return;
    client
      .get<Article>(`/contents/${id}`)
      .then((res) => setArticle(res.data))
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const handler = (updated: Article) => {
      if (updated._id === id) {
        setArticle(updated);
      }
    };
    socket.on("contentUpdated", handler);
    return () => {
      socket.off("contentUpdated", handler);
    };
  }, [id]);

  if (!article) {
    return <div className="p-6 text-center">Loading…</div>;
  }

  return (
    <div className="relative w-screen h-screen bg-[url('/homepage-background.png')] bg-cover bg-center overflow-hidden">
      {/* Dim + blur overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-lg" />

      {/* Scrollable glass panel */}
      <div
        className="
          absolute inset-x-0 top-[10vh] bottom-[5vh]
          mx-auto max-w-3xl
          bg-white/10 backdrop-blur-2xl
          rounded-3xl shadow-2xl
          p-6 overflow-auto
        "
        css={hideScrollBarCss}
      >
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="
            flex items-center gap-2
            mb-4
            p-2
            bg-white/30 text-white
            rounded-lg
            hover:bg-white/40
            transition
            cursor-pointer
          "
        >
          &larr; Back
        </button>

        {/* Title */}
        <h1 className="text-5xl font-bold text-center text-white mb-2">
          {article.title}
        </h1>

        {/* Updated timestamp */}
        <div className="text-center text-gray-200 text-sm mb-6">
          Updated {new Date(article.updatedAt).toLocaleString()}
        </div>

        {/* Content blocks */}
        <article className="space-y-8 text-white">
          {article.blocks.map((blk, i) => {
            if (blk.type === "text") {
              return (
                <div key={i} className="space-y-2">
                  <h2 className="text-2xl font-semibold">{blk.data.header}</h2>
                  <p className="leading-relaxed">{blk.data.body}</p>
                </div>
              );
            }
            if (blk.type === "image") {
              return (
                <img
                  key={i}
                  src={blk.data}
                  alt=""
                  className="w-full rounded-lg shadow-lg"
                />
              );
            }
            if (blk.type === "video") {
              return (
                <video
                  key={i}
                  src={blk.data}
                  controls
                  className="w-full rounded-lg shadow-lg"
                />
              );
            }
            return null;
          })}
        </article>
      </div>
    </div>
  );
}
