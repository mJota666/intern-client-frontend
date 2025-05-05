/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Article } from "../interfaces/Article";

export default function ArticleCard({ a }: { a: Article }) {
  const [hover, setHover] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const cardCss = css`
    position: relative;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 1rem;
    border-top-right-radius: 5rem;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease,
      backdrop-filter 0.3s ease;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(12px);
    }
  `;

  const glowCss = css`
    position: absolute;
    z-index: -1;
    width: 30px;
    height: 30px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    pointer-events: none;
    filter: blur(8px);
    transition: top 0.15s ease-out, left 0.15s ease-out;
  `;

  return (
    <Link
      to={`/article/${a._id}`}
      css={cardCss}
      onMouseEnter={() => setHover(true)}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseLeave={() => setHover(false)}
      className="w-[300px] h-[200px] p-4 flex flex-col justify-evenly cursor-pointer"
    >
      {/* Glow under cursor */}
      {hover && (
        <div
          css={glowCss}
          style={{
            top: pos.y,
            left: pos.x,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      {/* Title */}
      <div className="text-xl font-semibold text-white text-center">
        {a.title}
      </div>

      {/* Updated */}
      <div className="text-gray-200 text-sm text-center">
        Updated {new Date(a.updatedAt).toLocaleString()}
      </div>
    </Link>
  );
}
