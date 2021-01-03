import axios from 'axios';

const validateToken = async token => {
  const axiosAuth = axios.create({
    headers: {
      authorization: token,
    },
  });
  return await axiosAuth.post(
    'https://watch-this-instead.herokuapp.com/api/users/verify'
  );
};

export { validateToken };
