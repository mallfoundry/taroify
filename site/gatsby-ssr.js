import * as React from "react"

export { default as wrapPageElement } from "./gatsby/wrapPageElement"

const themeScript = `
  (function () {
    try {
      var storedTheme = localStorage.getItem("taroify.themeMode");
      var themeMode = storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      var root = document.documentElement;
      root.classList.toggle("dark", themeMode === "dark");
      root.setAttribute("data-theme", themeMode);
      root.style.colorScheme = themeMode;
    } catch (error) {}
  })();
`

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    React.createElement("script", {
      key: "taroify-theme",
      dangerouslySetInnerHTML: { __html: themeScript },
    }),
  ])
}
