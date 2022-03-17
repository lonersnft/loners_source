import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Source Sans Pro', sans-serif;
  }
  *:before,
  *:after {
    box-sizing: border-box;
  }
  html,
  body {
    height: 100%;
    position: relative;
    background: #fcfcf7;
  }

  .main-container {
    min-height: 100vh; /* will cover the 100% of viewport */
    overflow: hidden;
    display: block;
    position: relative;
    padding-bottom: 331px; /* height of your footer */
   }
`;

export const Button = styled.button`
  border-radius: 30px;
  background: ${({ primary }) => (primary ? "#F8C708" : "#242424")};
  white-space: nowrap;
  padding: ${({ big }) => (big ? "12px 64px" : "10px 20px")};
  color: #fff;
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  outline: none;
  border: none;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    transition: all 0.3s ease-out;
    transform: scale(2);
  }

  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

export default GlobalStyle;