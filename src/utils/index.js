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

export const onlynumber = (event)  => {
  const theEvent = event || window.event;
  let key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );   
  const regex = /^[0-9]+$/;
  if( !regex.test(key) ) {
     theEvent.returnValue = false;
     if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

const sum = (x, y) => x + y;

export const sumCartField = (products, field) => {
  return products.map((product) => product[field]).reduce(sum, 0);
};
