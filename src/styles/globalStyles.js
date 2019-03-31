import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Helvetica, sans-serif;
  }

  table {
    border: 1px solid rgb(238, 238, 238);
    width: 100%;

    th, td {
      border: 1px solid rgb(238, 238, 238);
      padding: 8px;
    }
  }
`
