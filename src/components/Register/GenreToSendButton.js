import React from 'react';

// Material UI
import { Button } from '@material-ui/core';

// 3rd Party
import axios from 'axios';

const GenreToSendButton = ({
  disabled,
  state,
  setState,
  data,
  userData,
  registerQuery,
  setRegisterQuery,
}) => {
  const handleClick = async () => {
    setRegisterQuery({
      ...registerQuery,
      isLoading: true,
    });

    setState({
      ...state,
      current: 'Loading',
    });
    const createUserData = {
      ...userData,
      genres: Object.keys(data).map(key => key), // Needs to be array
    };

    try {
      const res = await axios.post(
        'https://watch-this-instead.herokuapp.com/api/users/register',
        createUserData
      );
      setRegisterQuery({
        isError: false,
        isSuccess: true,
        isLoading: false,
        data: res.data,
      });

      setState({
        ...state,
        current: 'Success',
      });
    } catch (err) {
      setRegisterQuery({
        isLoading: false,
        isSuccess: false,
        isError: true,
        data: err,
      });
      setState({
        ...state,
        current: 'Error',
      });
    }
  };

  const handleBackClick = () => {
    setState({ ...state, current: 'email' });
  };

  return (
    <>
      <Button onClick={handleBackClick}>Go Back</Button>
      <Button disabled={disabled} onClick={handleClick}>
        Register
      </Button>
    </>
  );
};

export default GenreToSendButton;
