export const validateEmail = (email: string) => {
  const validEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email) {
        throw "Email is required";
      } else if (email && !email.match(validEmail)) {
        throw "Invalid email";
      } else {
        return true;
      }
};

export const validatePersonalNumber = (pnr: string) => {
  const validPnr = /^\d{2}([0][1-9]|[1][0-2])([0][1-9]|[1-2][0-9]|[3][0-1])-\d{4}$/;

  if (!pnr) {
    throw "Person number is required";
  } else if (pnr && !pnr.match(validPnr)) {
    throw "Invalid person number";
  } else {
    return true;
  }
};


export const validateZipCode= (zip: string)=> {
    const validZip = /^(s-|S-){0,1}[0-9]{3}\s?[0-9]{2}$/
    if (!zip) {
        throw "Zip is required";
      } else if (zip && !zip.match(validZip)) {
        throw "Invalid zip";
      } else {
        return true;
      }
}


export const validateText= (str: string)=> {
  // .......
}