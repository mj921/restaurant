const baseSize = 10;
const setRem = () => {
  const scale = document.documentElement.clientWidth / 750;
  document.documentElement.style.fontSize =
    baseSize * Math.min(scale, 1) + "px";
};
window.addEventListener("resize", setRem);
setRem();