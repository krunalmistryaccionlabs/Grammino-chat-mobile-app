const COUNTRY_CODES = ["+91", "+1", "+44"];

export const processPhoneNumber = phoneNumber => {
  if (phoneNumber.includes("+")) {
    let trimmedPhoneNumber = phoneNumber;
    for (let i = 0; i < COUNTRY_CODES.length; i++) {
      let countryCode = COUNTRY_CODES[i];
      if (phoneNumber.includes(countryCode)) {
        trimmedPhoneNumber = `+${phoneNumber.replace(/[^0-9]/g, "")}`.replace(
          countryCode,
          ""
        );
        break;
      } else trimmedPhoneNumber = phoneNumber.replace(/[^0-9]/g, "");
    }
    return trimmedPhoneNumber.replace(/\b0+/g, "");
  } else return phoneNumber.replace(/[^0-9]/g, "").replace(/\b0+/, "");
};
