import { createGlobalStyle } from 'styled-components/macro'

import fonts from 'styles/fonts'
import { colours, fontFamilies } from 'styles/constants'

import backgroundImage from 'images/background-blue.jpg'

export default createGlobalStyle`
  ${fonts}

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Helvetica, sans-serif;
    background-image: url(${backgroundImage});
    background-position: center;
    background-repeat: no-repeat;

    font-family: "${fontFamilies.MinionPro}", Times New Roman, serif;
  }

  table {
    border: 1px solid rgb(238, 238, 238);
    width: 100%;

    th, td {
      border: 1px solid rgb(238, 238, 238);
      padding: 8px;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: "${fontFamilies.Monkirta}", Helvetica, sans-serif;
    color: ${colours.teal};
  }
`
