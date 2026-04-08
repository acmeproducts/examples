"use client";

import { Style } from "@/components/Style";
import { Toast } from "@/components/Toast";
import { useState } from "react";
import { GoCommandPalette } from "react-icons/go";
import { RxOpenInNewWindow } from "react-icons/rx";
import { SiCodesandbox, SiGithub, SiStackblitz } from "react-icons/si";

export function Social({
  demoname,
  embed_url,
}: {
  demoname: string;
  embed_url: string;
}) {
  const [show, setShow] = useState(false);

  const command = `npx -y degit pmndrs/examples/demos/${demoname} ${demoname} && cd ${demoname} && npm i && npm run dev`;

  const handleClick = async () => {
    await navigator.clipboard.writeText(command);
    setShow(true);
  };

  return (
    <>
      <nav className="Social">
        <Style
          css={`
            @scope {
              & {
                display: flex;
                gap: 0.1rem;
                padding: 0.3rem;
                border-radius: 999px;
                background: rgb(255 255 255 / 0.82);
                backdrop-filter: blur(10px);
                box-shadow: 0 1px 6px rgb(0 0 0 / 0.1);
              }

              a {
                position: relative;
                display: grid;
                place-items: center;
                width: 1.8rem;
                height: 1.8rem;
                border-radius: 50%;
                color: #555;
                transition:
                  background 0.15s ease,
                  color 0.15s ease;
              }

              a:hover {
                background: rgb(0 0 0 / 0.06);
                color: #111;
              }

              a svg {
                width: 0.95rem;
                height: 0.95rem;
              }

              a > span {
                position: absolute;
                top: 100%;
                left: 50%;
                translate: -50% 0;
                margin-top: 0.45rem;
                padding: 0.25em 0.5em;
                border-radius: 4px;
                background: #222;
                color: white;
                font-size: 0.65rem;
                white-space: nowrap;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.15s ease;
              }

              a:hover > span {
                opacity: 1;
              }
            }
          `}
        />

        <a target="_blank" rel="noopener noreferrer" href={embed_url}>
          <RxOpenInNewWindow />
          <span>fullpage</span>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://github.com/pmndrs/examples/tree/main/demos/${demoname}`}
        >
          <SiGithub />
          <span>code</span>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://stackblitz.com/github/pmndrs/examples/tree/main/demos/${demoname}`}
        >
          <SiStackblitz />
          <span>stackblitz</span>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://codesandbox.io/s/github/pmndrs/examples/tree/main/demos/${demoname}`}
        >
          <SiCodesandbox />
          <span>codesandbox</span>
        </a>
        <a href="javascript:void(0);" onClick={handleClick}>
          <GoCommandPalette />
          <span>degit</span>
        </a>
      </nav>

      <Toast visible={show} onDone={() => setShow(false)}>
        <p>
          Degit command copied. Paste in your terminal to install{" "}
          <strong>{demoname}</strong> locally.
        </p>
      </Toast>
    </>
  );
}
