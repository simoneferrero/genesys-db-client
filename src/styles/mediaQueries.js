/*
 * Media queries
 *
 * Apply conditional styles based on device width, e.g.:
 * @media ${mq.desktop}: {
 *   color: 'red',
 * },
 *
 */

const mq = {
  phone: 'only screen and (max-width: 599px)',
  tablet: 'only screen and (min-width: 600px) and (max-width: 899px)',
  laptop: 'only screen and (min-width: 900px) and (max-width: 1199px)',
  desktop: 'only screen and (min-width: 1200px) and (max-width: 1799px)',
  bigDesktop: 'only screen and (min-width: 1800px)',
}

export default mq
