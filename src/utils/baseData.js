// const baseData = {
//   link: "https://mesto.nomoreparties.co/v1/cohort-42",
//   headers: {
//     authorization: "46d3309c-d21b-4304-b85e-0ef00fe8d618",
//     "Content-Type": "application/json",
//   },
// };

// const baseData = {
//   link: "http://localhost:3000",
//   headers: {
//     authorization: `Bearer ${localStorage.getItem('token')}`,
//     "Content-Type": "application/json",
//   },
// };

const baseData = {
  baseUrl: "https://api.kogrms.nomoredomains.monster",
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "application/json",
  },
};

export default baseData;
