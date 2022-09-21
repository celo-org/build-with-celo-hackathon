export const Constant = {
  APP_NAME: "Eventnexo",
  APP_URL: "http://localhost:3000",
  PRODUCTION: process.env.NODE_ENV === "production",
  DEBUG: process.env.NODE_ENV !== "production",
  BREAKPOINT: {
    100: {
      slidesPerView: 2,
      spaceBetween: 2,
    },
    640: {
      slidesPerView: 4,
      spaceBetween: 2,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 4,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 4,
    },
  },
};
