const counter = 0;

const countVotes = async (req, res, next) => {
  counter += 1;
  next();
};

const count = () => {
  return counter;
};

export { count, countVotes };
