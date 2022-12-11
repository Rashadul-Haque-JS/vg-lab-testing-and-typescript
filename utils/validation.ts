/* Three functons (almost identical) for validation of email, personalnumber and zipCode have been created as these function's names
are mentioned in instructions separately. Otherwise it would be possible to implement DRY concept here by creating
one function for format validation.
*/

import { TClient, Terror } from "../types/types";

export const validateEmail = (key: string, value: string) => {
  const validEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (key === "email" && value.length && !value.match(validEmail)) {
    return false;
  } else {
    return true;
  }
};

export const validatePersonalNumber = (key: string, value: string) => {
  const validPnr =
    /^\d{2}([0][1-9]|[1][0-2])([0][1-9]|[1-2][0-9]|[3][0-1])-\d{4}$/;

  if (key === "personalnumber" && value.length && !value.match(validPnr)) {
    return false;
  } else {
    return true;
  }
};

export const validateZipCode = (key: string, value: string) => {
  const validZipCode = /^(s-|S-){0,1}[0-9]{3}\s?[0-9]{2}$/;
  if (key === "zipCode" && value.length && !value.match(validZipCode)) {
    return false;
  } else {
    return true;
  }
};

export const validateText = (object: TClient) => {
  // This is for checking if any key is missing from client site
  const errorMissingKey: Terror[] = [];
  const keys = [
    "firstname",
    "lastname",
    "email",
    "personalnumber",
    "address",
    "zipCode",
    "city",
    "country",
  ];
  keys.forEach((key) => {
    if (!object.hasOwnProperty(key)) {
      errorMissingKey.push({ error: `${key} is missing` });
    } else {
      return errorMissingKey;
    }
  });

  if (errorMissingKey.length) {
    return errorMissingKey;
  }

  // if check in above is passed , then check for following emphasized validation

  const errorInEphasizedCheck: Terror[] = [];
  Object.entries(object).forEach(([key, value]) => {
    if (value.length === 0) {
      errorInEphasizedCheck.push({ error: `${key} must not be empty` });
    }

    const isEmail = validateEmail(key, value);
    const isPnr = validatePersonalNumber(key, value);
    const isZipCode = validateZipCode(key, value);

    !isEmail
      ? errorInEphasizedCheck.push({ error: "email is not valid" })
      : errorInEphasizedCheck;
    !isPnr
      ? errorInEphasizedCheck.push({ error: "personal number is not valid" })
      : errorInEphasizedCheck;
    !isZipCode
      ? errorInEphasizedCheck.push({ error: "zip code is not valid" })
      : errorInEphasizedCheck;
  });

  console.log(errorInEphasizedCheck);
  return errorInEphasizedCheck;
};
