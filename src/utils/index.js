export const createPath = (name) => {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "-")
    .replace('%', "-")
    .toLowerCase();
};

export const currency = new Intl.NumberFormat([], {
  style: "currency",
  currency: "BRL",
});

const sum = (x, y) => x + y;

export const sumCartField = (products, field) => {
  return products.map((product) => product[field]).reduce(sum, 0);
};
