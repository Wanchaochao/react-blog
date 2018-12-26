export const dva = {
  config: {
    onError(err) {
      console.log(err)
      err.preventDefault();
      // console.error(err.message);
    },
  },
};

