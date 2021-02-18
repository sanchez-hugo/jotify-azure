// const themeOptions = ["sheet-light", "sheet-dark", "sheet-blue", "sheet-pink"];

const getThemeById = (id) => {
  return themeOptions[id];
};

const lightColor = "#e2e2e2";
const darkColor = "#212529";

const themeOptions = [
  {
    id: 0,
    name: "Light",
    style: "sheet-light",
    iconColor: { color: darkColor },
  },
  {
    id: 1,
    name: "Dark",
    style: "sheet-dark",
    iconColor: { color: lightColor },
  },
  {
    id: 2,
    name: "Blue",
    style: "sheet-blue",
    iconColor: { color: lightColor },
  },
  {
    id: 3,
    name: "Pink",
    style: "sheet-pink",
    iconColor: { color: lightColor },
  },
];

export { themeOptions, getThemeById };
