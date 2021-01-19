// const themeOptions = ["sheet-light", "sheet-dark", "sheet-blue", "sheet-pink"];

const getThemeById = (id) => {
  return themeOptions[id];
};

const themeOptions = [
  {
    id: 0,
    name: "Light",
    style: "sheet-light",
  },
  {
    id: 1,
    name: "Dark",
    style: "sheet-dark",
  },
  {
    id: 2,
    name: "Blue",
    style: "sheet-blue",
  },
  {
    id: 3,
    name: "Pink",
    style: "sheet-pink",
  },
];

export { themeOptions, getThemeById };
