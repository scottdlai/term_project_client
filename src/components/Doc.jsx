import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const Doc = () => {
  return (
    <SwaggerUI url='https://comp-4537-term-project-7zchu.ondigitalocean.app/api/v0/docs' />
  );
};

export default Doc;
