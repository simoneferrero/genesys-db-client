/**
 * rgbToRgba
 * Converts a rgb colour into rgba
 * @param  {string} rgb     The rgb colour to convert
 * @param  {number} opacity The desired opacity to add to rgb
 * @return {string}         The resulting rgba colour
 */
const rgbToRgba = (rgb, opacity) =>
  rgb.replace(/rgb/i, 'rgba').replace(/\)/i, `, ${opacity})`)

export default rgbToRgba
