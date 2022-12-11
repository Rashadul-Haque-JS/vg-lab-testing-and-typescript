/* Here all keys in TClient are marked with '?' to test missing key, 
  unless typescript will indicate any missing key automatically while testing 
  with object that not match with TClient. */

export type TClient = {
  firstname?: string;
  lastname?: string;
  email?: string;
  personalnumber?: string;
  address?: string;
  zipCode?: string;
  city?: string;
  country?: string;
};

export type Terror = {
  error: string;
};
