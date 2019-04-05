import { createGlobalStyle, css } from 'styled-components/macro'

import fonts from 'styles/fonts'
import { colours, fontFamilies } from 'styles/constants'

import backgroundImage from 'images/background-blue.jpg'

const globalStyle = css`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Helvetica, sans-serif;
    background: url(${backgroundImage}) no-repeat center center fixed;
    background-size: cover;
    overflow-x: hidden;
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

export default createGlobalStyle`
  ${fonts}
  ${globalStyle}
`
