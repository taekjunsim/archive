import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { observe, useState } from "./hooks/useState";

const [count, setCount] = useState(0);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div id="test"></div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

export const render = () => {
  document.getElementById("test")!.innerHTML = `
  <div style="display: flex; flex-direction: column; gap: 20px" class="card">
    <button id="counter" type="button">${count()}</button>
    <input id="input" style="padding-bottom: 8px; border: none; border-bottom: 1px solid  black; text-align: center; outline: none" value="${count()}" />
    </div>
    `;

  const buttonEl = document.getElementById("counter");
  buttonEl!.addEventListener("click", () => setCount(count() + 1));
};

observe(render);
