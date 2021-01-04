import React, { useState, useRef, useEffect } from 'react';
import GenreToSendButton from './GenreToSendButton';
import GenreButton from './GenreButton';

// Material UI
import { Grid, Container, Typography } from '@material-ui/core';

// 3rd Party
import axios from 'axios';
import { nanoid } from 'nanoid';

const GenreInputForm = ({
  classes,
  setState,
  state,
  userData,
  registerQuery,
  setRegisterQuery,
}) => {
  const [selectedGenres, setSelectedGenres] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [query, setQuery] = useState({
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: [],
  });
  const [elements, setElements] = useState([]);
  let updated = useRef(selectedGenres);

  // Event Handlers
  const handleClick = item => {
    if (!updated.current[item.genre]) {
      if (Object.keys(updated.current).length === 3) {
        return;
      }
      setSelectedGenres(prev => {
        updated.current = { ...prev, [item.genre]: { ...item } };
        return { ...prev, [item.genre]: { ...item } };
      });
    } else {
      setSelectedGenres(prev => {
        delete prev[item.genre];
        updated.current = { ...prev };
        return { ...prev };
      });
    }
  };

  useEffect(() => {
    Object.keys(selectedGenres).length === 3
      ? setDisabled(false)
      : setDisabled(true);
  }, [selectedGenres]);

  useEffect(() => {
    setQuery({ ...query, isLoading: true });
    axios
      .get('https://watch-this-instead.herokuapp.com/api/genres')
      .then(res => {
        setQuery({
          ...query,
          isLoading: false,
          isSuccess: true,
          data: [...res.data],
        });
      })
      .catch(err =>
        setQuery({ ...query, isLoading: false, isError: true, data: [err] })
      );
  }, []);

  useEffect(() => {
    if (!query.isLoading && query.isError) {
      setElements([]);
    }

    if (!query.isLoading && query.isSuccess) {
      let oldArr = [...query.data];
      var maxVal = 4;
      var delta = Math.floor(oldArr.length / maxVal);

      for (let i = 0; i < oldArr.length; i = i + delta) {
        const items = [];
        for (let j = 0; j < 4; j++) {
          oldArr[i + j] && items.push(oldArr[i + j]);
        }
        const containerItems = items.map(item => {
          return (
            <Grid item xs={12} sm={3} key={nanoid()}>
              <GenreButton
                classes={classes}
                item={item}
                handleClick={handleClick}
                updated={updated}
              />
            </Grid>
          );
        });

        const container = (
          <Grid container spacing={2} key={nanoid()}>
            {containerItems}
          </Grid>
        );
        setElements(prev => {
          return [...prev, container];
        });
      }
    }
  }, [
    query.data,
    query.isLoading,
    query.isSuccess,
    query.isError,
    setSelectedGenres,
    classes.genreButton,
  ]);

  return (
    <>
      {query.isLoading ? (
        <div> Loading... </div>
      ) : query.isError ? (
        <div> Hmm... seems like something went wrong </div>
      ) : (
        <>
          <Container
            component="main"
            disableGutters
            maxWidth="xl"
            className={classes.genreContainer}
          >
            <Typography variant="h2" className={classes.header}>
              Choose 3 Genres:
            </Typography>
            {elements.length > 0 && elements}
            <GenreToSendButton
              disabled={disabled}
              setState={setState}
              data={selectedGenres}
              state={state}
              userData={userData}
              registerQuery={registerQuery}
              setRegisterQuery={setRegisterQuery}
            />
          </Container>
        </>
      )}
    </>
  );
};

export default GenreInputForm;
