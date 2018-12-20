import React from 'react';
import MDSpinner from 'react-md-spinner';

const Spinner = props => {
  return (
    <MDSpinner
      size={120}
      borderSize={7}
      singleColor="var(--primary)"
      {...props}
    />
  );
};

export default Spinner;
