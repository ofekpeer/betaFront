export const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

 
export const beautifulTitel = (title) => {
  if (title.length < 15) {
    return title;
  }
  title = title.slice(0, 15);
  return title + '...';
};