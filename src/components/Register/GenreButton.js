import React, { useState } from 'react';

// Material UI
import { Button } from '@material-ui/core';

const GenreButton = ({ item, classes, handleClick, updated }) => {
  const [selected, setSelected] = useState(false);

  return (
    <Button
      color="primary"
      variant="contained"
      className={!selected ? classes.genreButton : classes.genreActive}
      onClick={() => {
        handleClick(item);
        console.log(updated.current);
        if (item.genre in updated.current) {
          setSelected(true);
        } else {
          setSelected(false);
        }
      }}
    >
      {item.genre}
    </Button>
  );
};

export default GenreButton;
