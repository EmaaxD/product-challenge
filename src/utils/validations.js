export const validationString = (string) =>
  new Promise((resolve, reject) => {
    if (string.trim() === "") {
      reject({ message: "Todos los campos son requeridos" });
      return;
    }

    if (/(<[a-z>(')/<]*)/.exec(string)) {
      reject({ message: "No se aceptan caracteres especiales" });
      return;
    }

    resolve(string.trim().toLowerCase());
  });

export const validationNumber = (number) =>
  new Promise((resolve, reject) => {
    if (number < 0) {
      reject({ message: "EL producto necesita un precio" });
    } else {
      resolve(number);
    }
  });

export const validationArray = (arr, type) =>
  new Promise((resolve, reject) => {
    if (arr.length < 0) {
      if (type === "colors") {
        reject({ message: "EL producto necesita colores" });
      } else {
        reject({ message: "EL producto necesita medidas" });
      }
    } else {
      resolve(arr);
    }
  });

export const validateQuantity = (str) => {
  let strSanitized = str;

  if (str && str.length > 106) {
    strSanitized = str.substring(0, 106) + "...";
  }

  return strSanitized;
};
