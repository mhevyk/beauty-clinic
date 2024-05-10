export const EMPLOYEE_SHOWCASE_SECTION_ID = "meet-lily";
export const CONTACTS_SECTION_ID = "contact";

export const PERSISTED_STORAGE_KEYS = {
  cart: "__meet-lily-cart",
  auth: "__meet-lily-auth-token",
};

export const CUSTOM_EVENTS = {
  CALENDAR_NEXT_PAGE: "calendar-next-page",
};

export const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
export const EMAIL_PATTERN =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PHONE_NUMBER_PATTERN = [
  "(",
  /[1-9]/,
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];
