// Spinner.js
import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px; /* Customize the size */
  color: silver; /* Customize the color */
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Spinner = () => {
  return (
    <SpinnerContainer>
      <FaSpinner />
    </SpinnerContainer>
  );
};

export default Spinner;
