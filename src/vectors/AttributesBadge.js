import React from 'react'
import PropTypes from 'prop-types'

import { colours } from 'styles/constants'

import { ATTRIBUTES } from 'utils/definitions'

export const TYPES = {
  ...ATTRIBUTES,
  XP_AVAILABLE: 'xpAvailable',
  XP_TOTAL: 'xpTotal',
}

const DerivedStat = ({ type, width }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    x="0px"
    y="0px"
    viewBox="20 15 140 70"
    style={{ enableBackground: 'new 0 0 180 108' }}
    width={`${width}px`}
  >
    <g id="SotB_Block">
      <path
        fill={colours.lightOrange}
        d="M36.1,24.1l-0.1,0.1l-1.1,8.1c-0.1,0.5-0.1,1.2-0.1,1.9l0.1,1.4l-5.3,3.3c-0.4,0.3-0.9,0.8-1.2,1.4l-0.1,0.2   c-0.3,0.6-0.5,1.2-0.5,1.8V60c0,1.3,0.8,3.3,1.7,4.2l10,10.7c0.8,0.9,2.8,1.7,4,1.7h92.7c1.3,0,3.2-0.8,4-1.7l10.1-10.7   c0.9-0.9,1.7-2.9,1.7-4.2V42.1c0-0.5-0.2-1.2-0.5-1.9l0-0.1c-0.3-0.6-0.8-1.2-1.3-1.5l-4.7-3.2l0.1-1.4c0-0.7,0-1.4-0.1-1.9   l-1.1-8.1l-0.1-0.1H36.1z M136.2,81.5H43.4c-2.6,0-5.8-1.4-7.6-3.3l-10-10.7c-1.7-1.9-3-5-3-7.6V42.1c0-1.3,0.4-2.8,1.1-4.1   l0.1-0.2c0.8-1.4,1.8-2.4,2.9-3.2l2.9-1.8c0-0.5,0-0.9,0.1-1.3l1.1-8.1c0.3-2.5,2.5-4.4,5-4.4h108.2c2.5,0,4.7,1.9,5,4.4l1.1,8.1   c0.1,0.4,0.1,0.9,0.1,1.3l2.5,1.7c1.1,0.8,2.1,1.9,2.8,3.2l0.1,0.1c0.7,1.4,1.1,2.8,1.1,4.1V60c0,2.5-1.3,5.7-3,7.6l-10.1,10.7   C142,80.2,138.8,81.5,136.2,81.5"
      />
      <g>
        <defs>
          <rect x="14.4" y="26.4" width="149.2" height="53.4" />
        </defs>
        <polygon
          fill={colours.veryLightGreen}
          points="33.3,34.5 26.2,39 26.2,63.2 40.3,78.5 139.3,78.5 153.6,63.2 153.6,39 147,34.5   "
        />
        <defs>
          <filter
            id="Adobe_OpacityMaskFilter"
            filterUnits="userSpaceOnUse"
            x="26.1"
            y="34"
            width="127.5"
            height="44.8"
          >
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
            />
          </filter>
        </defs>
        <mask
          maskUnits="userSpaceOnUse"
          x="26.1"
          y="34"
          width="127.5"
          height="44.8"
          id="SVGID_4_"
        >
          <g filter="url(#Adobe_OpacityMaskFilter)">
            <g>
              <defs>
                <rect
                  id="SVGID_5_"
                  x="14.4"
                  y="26.4"
                  width="149.1"
                  height="54.7"
                />
              </defs>
              <clipPath id="SVGID_6_" clipPath="url(#SVGID_3_)">
                <use href="#SVGID_5_" style={{ overflow: 'visible' }} />
              </clipPath>
              <g style={{ clipPath: 'url(#SVGID_6_)' }}>
                <image
                  style={{ overflow: 'visible' }}
                  width="256"
                  height="94"
                  href="data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEAfAB8AAD/7AARRHVja3kAAQAEAAAAHgAA/+4AIUFkb2JlAGTAAAAAAQMA EAMCAwYAAAK7AAAFXwAAB4//2wCEABALCwsMCxAMDBAXDw0PFxsUEBAUGx8XFxcXFx8eFxoaGhoX Hh4jJSclIx4vLzMzLy9AQEBAQEBAQEBAQEBAQEABEQ8PERMRFRISFRQRFBEUGhQWFhQaJhoaHBoa JjAjHh4eHiMwKy4nJycuKzU1MDA1NUBAP0BAQEBAQEBAQEBAQP/CABEIAGABAgMBIgACEQEDEQH/ xACOAAEBAAMBAQAAAAAAAAAAAAAABQMEBgIBAQEAAAAAAAAAAAAAAAAAAAAAEAACAQMEAQUBAQEA AAAAAAAAARQCAwQREwYWEhAgITE1BWBQEQACAQIFAgUDBAMAAAAAAAAAMQECA5HRkjM1IAUQIbN0 hBEENEBQQTJRElMSAQAAAAAAAAAAAAAAAAAAAGD/2gAMAwEAAhEDEQAAAImlrzywjiwjiwjiwjiw jiwjiwjiwjiwjiwjiwjiwjiwjiwjiwjjpUoJ9CePvzIfPefdJ3qzlIS8IK8IK8IK8IK8IK8IK8IK 8IPy/wCSBju6hK87WueQUAJ9CeNnX3ChT17B52N/dIy6IS6IS6IS6IS6IS6IS6IS6IWPoMJzc/po 5zs23HNcFACfQnn3d0tkv3OdsnRb8agb/wB1vRnYBnYBnYBnYBnYBnYBnYBl12sa0SjGJkWnJMQK AE+hPGXF9KlbnN06je5faOk9c76Ogc+Ogc+Ogc+Ogc+Ogc+Ogc+Ogc+LutJwm7MxaB50veM+AoAT 6egY2QeMnwZs2oN71PFBoDfaA32gN9oDfaA32gN9ofDex6oyYg8fMgxsg3GQf//aAAgBAgABBQD/ AE3/2gAIAQMAAQUA/wBN/9oACAEBAAEFAP7XKOQWP7PbuSnbuSnbuSnbuSnbuSnbuSnbuSnbuSnb uSnbuSnbuSnbuSnbuSnbuSnbuSnbuSnbuSnbuSnbuSnbuSnbuSnbuSnbuSnbuSnbuSnbuSnbuSnb uSnbuSnbuSnbuSnaOQHIP3v+ByD970SFRqK02LHbIrItRFqItRFqItRFqItRFqItRFqItRFqItRF qItRFqItQ8Zjx2h2mh06e3kH73pRTqWrPkWsQoxELEIhEIhEIhEIhEIhEIhEIhEIhEIg8QrxEXsb QuW9CpaezkH7wvuzTq8aytLGPqWsPUpwSCQSCQSCQSCQSCQSCQSCQSCQSCV4RdxNDIsaGVZ0Lq0f ryD94X3irV4tJi20yxYTVGOiMiMiMiMiMiMiMiMiMiMiMiMiMiMiMiMh4yLmOjIsoy7ehl0/F9fP ryD94X3iv5xGYbRj6aW0hJHijxR4o8UeKPFHijxR4o8UeKPFHijxRoipIu6aZOhmNGY/i/8AfryD 94X3Yq0eJd+MS8kY2Qi1kIWQjfRvo30b6N9G+jfRvo30b6N9G+jfRvo30VZCL2QtMm+jLvJmZcLr 1fryD970t1aPFvaGPkaFjL0LeaLNJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqKs0u5hfytTJyDIu+Tq evs5B+96Jlu5oWclotZaKMsWYyYTCYTCYTCYTCYTCYTCYTCYVZjK8su5aL2Q6iuvUb9nIP3vVMpu NFGQ0U5bQs1k5k1k1k1k1k1k1k1k1k1k1k1k1k1jzmPNZVlNlV9sqr1G/b/fsX3/AHY+QR8gj5BH yCPkGxkGzkGzkGzkmzkm1km1km1km1km1km1km1km1km1km1km1km1kmzkmzkmxkGxkEfII+QR8g j5BHyDYvn//aAAgBAgIGPwBN/9oACAEDAgY/AE3/2gAIAQEBBj8A+/sWfvrtFq19zeot0RMfSmmm 5VFMR5fxByN7GMjkb2MZHI3sYyORvYxkcjexjI5G9jGRyN7GMjkb2MZHI3sYyORvYxkcjexjI5G9 jGRyN7GMjkb2MZHI3sYyORvYxkcjexjI5G9jGRyN7GMjkb2MZHI3sYyORvYxkcjexjI5G9jGRyN7 GMjkb2MZHI3sYyORvYxkcjexjI5G9jGRyN7GMj867+N/u4/t/lHc/d3/AFKv2D4h3P3d/wBSrqQh CEIQhCEIQhCEIQhdXxDufu7/AKlXT5wIQhCEIQhCEIQhCEIQhdPxDufu7/qVeMESR5CEIQhCEIQh CEIQhCEIkno+Idz93f8AUq8YIII8hCEIQhCEIQhCEIQhE+RJPR8Q7n7u/wCpV4wQQR+kkkno+Idz 93f9SrxggggfgxjGMYxjGMYxjGMkk+nR8Q7n7u/6lXREEeZHmMYxjGMYxjGMYxjGMnzJ6fiHc/d3 /Uq6Y8xjGMYxjGMYxjGMYxjH1fEO5+7v+pV1MYxjGMYxjGMYxjGMY+r4h3KYt1TE/d35iYpn/pUb VemTar0ybVemTar0ybVemTar0ybVemTar0ybVemTbr0ybdemTbr0ybdemTbr0ybdemTbr0ybdemT br0ybdemTbr0ybdemTbr0ybVemTar0ybVemTar0ybVemTar0ybVemTar0ybVemTbq/E+n9ZP/9k="
                  transform="matrix(0.5824 0 0 0.5824 14.4476 26.4449)"
                />
              </g>
            </g>
          </g>
        </mask>
        <rect
          x="26.1"
          y="34"
          clipPath="url(#SVGID_3_)"
          mask="url(#SVGID_4_)"
          fill={colours.white}
          width="127.5"
          height="44.8"
        />
      </g>
      <path
        fill={colours.softBlue}
        d="M136.2,79.3H43.4c-1.9,0-4.5-1.1-5.8-2.5L27.7,66c-1.3-1.4-2.3-4-2.3-5.9v-18c0-2,1.3-4.4,3-5.4l4.5-2.8   l0.9,1.4L29.2,38C28,38.8,27,40.7,27,42.1v18c0,1.5,0.9,3.7,1.9,4.8l10,10.7c1,1.1,3.1,2,4.6,2h92.7c1.5,0,3.6-0.9,4.6-2l10.1-10.7   c1-1.1,1.9-3.3,1.9-4.8v-18c0-1.4-1-3.3-2.2-4.2l-4-2.7l0.9-1.4l4,2.7c1.6,1.1,2.9,3.5,2.9,5.5v18c0,1.9-1,4.5-2.3,5.9L142,76.8   C140.7,78.2,138.1,79.3,136.2,79.3"
      />
      <path
        fill="#FFF0DD"
        d="M146.2,41.6c-0.2,1.7-1.8,3-3.5,3H37.6c-1.7,0-3.2-1.4-3.5-3l-0.7-5.1c-0.2-1.7-0.2-4.4,0-6.1l0.7-5.1   c0.2-1.7,1.8-3,3.5-3h105.1c1.7,0,3.2,1.4,3.5,3l0.7,5.1c0.2,1.7,0.2,4.4,0,6.1L146.2,41.6z"
      />
      <g>
        <defs>
          <rect id="SVGID_7_" x="21.7" y="14.3" width="135.9" height="31.5" />
        </defs>
        <clipPath id="SVGID_8_">
          <use xlinkHref="#SVGID_7_" style={{ overflow: 'visible' }} />
        </clipPath>
        <g clipPath="url(#SVGID_8_)">
          <defs>
            <path
              id="SVGID_9_"
              d="M37.6,22.2c-1.7,0-3.2,1.4-3.5,3l-0.7,5.1c-0.1,0.8-0.2,1.9-0.2,3c0,1.1,0.1,2.2,0.2,3l0.7,5.1      c0.2,1.7,1.8,3,3.5,3h105.1c1.4,0,2.7-0.9,3.2-2.1V24.4c-0.5-1.2-1.8-2.1-3.2-2.1H37.6z"
            />
          </defs>
          <clipPath id="SVGID_10_">
            <use xlinkHref="#SVGID_9_" style={{ overflow: 'visible' }} />
          </clipPath>
          <g clipPath="url(#SVGID_10_)">
            <defs>
              <rect
                id="SVGID_11_"
                x="32.1"
                y="22.2"
                width="113.9"
                height="23.9"
              />
            </defs>
            <clipPath id="SVGID_12_">
              <use xlinkHref="#SVGID_11_" style={{ overflow: 'visible' }} />
            </clipPath>
            <g style={{ clipPath: 'url(#SVGID_12_)' }}>
              <image
                style={{ overflow: 'visible' }}
                width="391"
                height="82"
                xlinkHref="data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEA9wD3AAD/7AARRHVja3kAAQAEAAAAHgAA/+4AIUFkb2JlAGTAAAAAAQMA EAMCAwYAAAKrAAADfwAABKj/2wCEABALCwsMCxAMDBAXDw0PFxsUEBAUGx8XFxcXFx8eFxoaGhoX Hh4jJSclIx4vLzMzLy9AQEBAQEBAQEBAQEBAQEABEQ8PERMRFRISFRQRFBEUGhQWFhQaJhoaHBoa JjAjHh4eHiMwKy4nJycuKzU1MDA1NUBAP0BAQEBAQEBAQEBAQP/CABEIAFYBhwMBIgACEQEDEQH/ xACAAAEBAQEBAAAAAAAAAAAAAAAAAQIDBgEBAQEBAQAAAAAAAAAAAAAAAAECAwQQAAEFAQADAQEA AAAAAAAAAAABESECEgNAUDIxExEAAwADAAMBAQAAAAAAAAAAAAEyUHECEZHhITESAQADAQEBAQAA AAAAAAAAAAAxoUIBQGAh/9oADAMBAAIRAxEAAAD2+U83aolqCoKgqCoKgqCoKgqCoKgqCoKgqCoK gqCoKgqCsjcssBQAAAAAAAAAAAAAAAAAAhKIsAiBdyzWVAAAAAAAAAAAAAAAAAACLAFCIAJdSzWQ WoSoKgqCoKgqCoKgqCoKgqCoKgqCoLBQAgQACXUTUqIqCoKgqCoKgqCoKgqCoKgqCoKgqCoKgqCw AAlgO0OmAAAAAAAAAAAAAAAAAAAAAAAAP//aAAgBAgABBQBVV3UdR1HUdR1HUdR1HUdR1HUdR1HU dR1HUdR1HUdR1F/fIX98hf3yF/fIVngggggggggggggggggggggggg//2gAIAQMAAQUAREZkGQZB kGQZBkGQZBkGQZBkGQZBkGQZBkGQZBkGQZBPzyE/PIT88hPzyJJJJJJJJJJJJJJJJJJJJJJJJJP/ 2gAIAQEAAQUAve6W3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c 3c3c3c3c3c3c3c3c3c3c3c3c3c/pc/pc/pc/pc/pcv8AfsL/AH7C/wBewv8AXsL/AF7C/wBewv8A XsL/AH7C/wB+wtXlrPEzxM8TPEzxM8TPEzxM8TPEzxM8TPEzxM8TPEzxM8TPEzxM8TPEzxM8TPEz xM8TPEzxM8TPEzxM8TPEzxM8TPEzxM8TPEzxM8TPEzxM8TPEzxM8T//aAAgBAgIGPwDv6nqep6nq ep6nqep6nqep6nqep6nqep6nqep6nqep676e+nvp76cWxbFsWxbFsWxbFsWxbFsWxbFsWxbFsWxb FsWxbFsW/9oACAEDAgY/AIQhCEIQhCEIQhCEIQhCEI+l01TVNU1TVNU1TVNU1TVNU1TVNU1TVNU1 TVNU1TVNU//aAAgBAQEGPwBpN/1lMplMplMplMplMplMplMplMplMplMplMplMplMplMplMplMpl MplMplMplMplMplMplMplMpnW3ketvI9beR628j1t5HrbyPW3ketvI9beRfnp+fP6UymUymUymUy mUymUymUymUymUymUymUymUymUymUymUymUymUymUymUymUymUymUymUyn6+FP18Kfr4f//Z"
                transform="matrix(0.2912 0 0 0.2912 32.0641 22.2291)"
              />
            </g>
          </g>
        </g>
        <defs>
          <filter
            id="Adobe_OpacityMaskFilter_1_"
            filterUnits="userSpaceOnUse"
            x="32.8"
            y="21.9"
            width="113.6"
            height="23.9"
          >
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
            />
          </filter>
        </defs>
        <mask
          maskUnits="userSpaceOnUse"
          x="32.8"
          y="21.9"
          width="113.6"
          height="23.9"
          id="SVGID_13_"
        >
          <g className="st23">
            <g>
              <defs>
                <rect
                  id="SVGID_14_"
                  x="21.7"
                  y="14.3"
                  width="135.7"
                  height="33.2"
                />
              </defs>
              <clipPath id="SVGID_15_" clipPath="url(#SVGID_8_)">
                <use xlinkHref="#SVGID_14_" style={{ overflow: 'visible' }} />
              </clipPath>
              <g
                transform="matrix(1 0 0 1 0 9.536743e-07)"
                style={{ clipPath: 'url(#SVGID_15_)' }}
              >
                <image
                  style={{ overflow: 'visible' }}
                  width="233"
                  height="57"
                  xlinkHref="data:image/jpeg;base64,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 uppO6mk7qaTuppvS+s/6PS5ule81H9aP1P/Z"
                  transform="matrix(0.5824 0 0 0.5824 21.7271 14.3124)"
                />
              </g>
            </g>
          </g>
        </mask>
        <rect
          x="32.8"
          y="21.9"
          opacity="0.75"
          clipPath="url(#SVGID_8_)"
          mask="url(#SVGID_13_)"
          fill={colours.white}
          width="113.6"
          height="23.9"
        />
      </g>
      <path
        fill={colours.softBlue}
        d="M36.1,23.1c-0.4,0-0.9,0.4-0.9,0.8L34.1,32c-0.1,0.8-0.1,2.1,0,2.9l1.1,8.1c0.1,0.4,0.5,0.8,0.9,0.8h108.2   c0.4,0,0.9-0.4,0.9-0.8l1.1-8.1c0.1-0.8,0.1-2.1,0-2.9l-1.1-8.1c-0.1-0.4-0.5-0.8-0.9-0.8H36.1z M144.2,45.4H36.1   c-1.3,0-2.4-1-2.6-2.2l-1.1-8.1c-0.1-0.9-0.1-2.4,0-3.3l1.1-8.1c0.2-1.3,1.3-2.2,2.6-2.2h108.2c1.3,0,2.4,1,2.6,2.2l1.1,8.1   c0.1,0.9,0.1,2.4,0,3.3l-1.1,8.1C146.6,44.4,145.5,45.4,144.2,45.4"
      />
      <rect x="22.9" y="19.1" fill="none" width="134" height="62.4" />
      <rect x="22.9" y="19.1" fill="none" width="134" height="62.4" />
    </g>
    {type === TYPES.XP_AVAILABLE && (
      <g fill={colours.softBlue}>
        <g>
          <path d="M62.2,39.9h-1.8L60,37.7h-2.2l-0.3,2.1h-1.7l1.9-11.7h2.7L62.2,39.9z M58,36.2h1.8l-0.9-5.9L58,36.2z" />
          <path d="M65.4,37.7l1.4-9.5h1.7l-1.8,11.7H64l-1.8-11.7H64L65.4,37.7z" />
          <path d="M74.9,39.9H73l-0.3-2.1h-2.2l-0.3,2.1h-1.7l1.9-11.7H73L74.9,39.9z M70.7,36.2h1.8l-0.9-5.9L70.7,36.2z" />
          <path d="M75.7,28.2h1.8v11.7h-1.8V28.2z" />
          <path d="M78.9,28.2h1.8v10h3v1.7h-4.8V28.2z" />
          <path d="M90.4,39.9h-1.8l-0.3-2.1H86l-0.3,2.1H84l1.9-11.7h2.7L90.4,39.9z M86.3,36.2H88l-0.9-5.9L86.3,36.2z" />
          <path d="M96.8,30.9v0.4c0,1.2-0.4,2-1.2,2.3c1,0.4,1.4,1.3,1.4,2.5v0.9c0,1.8-0.9,2.8-2.8,2.8h-2.9V28.2H94    C95.9,28.2,96.8,29.1,96.8,30.9z M93.1,29.9v3.1h0.7c0.7,0,1.1-0.3,1.1-1.2v-0.6c0-0.8-0.3-1.2-0.9-1.2L93.1,29.9L93.1,29.9z     M93.1,34.6v3.6h1c0.6,0,0.9-0.3,0.9-1.1v-1c0-1.1-0.3-1.4-1.2-1.4H93.1z" />
          <path d="M98,28.2h1.8v10h3v1.7H98L98,28.2L98,28.2z" />
          <path d="M105.5,33.1h2.5v1.7h-2.5v3.4h3.2v1.7h-5V28.2h5v1.7h-3.2V33.1z" />
          <path d="M118.5,28.2l-1.9,5.7l2,6h-1.9l-1.5-4.6l-1.5,4.6H112l2-6l-1.9-5.7h1.9l1.4,4.3l1.4-4.3H118.5z" />
          <path d="M125,31.1v1.5c0,1.9-0.9,2.9-2.7,2.9h-0.9v4.4h-1.8V28.2h2.7C124.1,28.2,125,29.2,125,31.1z M121.4,29.9v3.9    h0.9c0.6,0,0.9-0.3,0.9-1.1V31c0-0.8-0.3-1.1-0.9-1.1H121.4z" />
        </g>
      </g>
    )}
    {type === TYPES.XP_TOTAL && (
      <g fill={colours.softBlue}>
        <g>
          <path d="M67.8,28.2h5.6v1.7h-1.9v10h-1.8v-10h-1.9V28.2z" />
          <path d="M74.1,31c0-1.9,1-2.9,2.8-2.9c1.8,0,2.8,1.1,2.8,2.9v6c0,1.9-1,2.9-2.8,2.9c-1.8,0-2.8-1.1-2.8-2.9V31z     M75.9,37.2c0,0.8,0.4,1.1,0.9,1.1c0.6,0,0.9-0.3,0.9-1.1v-6.3c0-0.8-0.4-1.1-0.9-1.1c-0.6,0-0.9,0.3-0.9,1.1V37.2z" />
          <path d="M80.3,28.2h5.6v1.7H84v10h-1.8v-10h-1.9V28.2z" />
          <path d="M92,39.9h-1.8l-0.3-2.1h-2.2l-0.3,2.1h-1.7l1.9-11.6h2.7L92,39.9z M87.9,36.2h1.8l-0.9-5.9L87.9,36.2z" />
          <path d="M92.9,28.2h1.8v10h3v1.7h-4.8V28.2z" />
          <path d="M107.2,28.2l-1.9,5.6l2,6h-1.9l-1.5-4.6l-1.5,4.6h-1.7l2-6l-1.9-5.6h1.9l1.4,4.3l1.4-4.3H107.2z" />
          <path d="M113.6,31.1v1.5c0,1.9-0.9,2.9-2.7,2.9h-0.9v4.4h-1.8V28.2h2.7C112.7,28.2,113.6,29.2,113.6,31.1z     M110.1,29.9v3.9h0.9c0.6,0,0.9-0.3,0.9-1.1V31c0-0.8-0.3-1.1-0.9-1.1H110.1z" />
        </g>
      </g>
    )}
    {(type === TYPES.DEFENSE_MELEE || type === TYPES.DEFENSE_RANGED) && (
      <>
        <g fill={colours.softBlue}>
          <g>
            <defs>
              <rect x="88.7" y="44.8" width="2.3" height="32.9" />
            </defs>
            <clipPath>
              <use style={{ overflow: 'visible' }} />
            </clipPath>
            <path d="M90.7,49.1v-4.3h-1.6v4.3c-0.2,0.2-0.4,0.5-0.4,0.8V72c0,0.3,0.1,0.6,0.4,0.8v4.8h1.6v-4.8    c0.2-0.2,0.4-0.5,0.4-0.8V49.9C91,49.6,90.9,49.3,90.7,49.1" />
          </g>
        </g>
        <g fill={colours.softBlue}>
          <g>
            <path d="M57.2,36.5l1.3-8.4h2.6V40h-1.8v-8.5L58,40h-1.8l-1.4-8.4V40h-1.6V28.1h2.6L57.2,36.5z" />
            <path d="M66.9,28.1h1.6L63.9,40h-1.6L66.9,28.1z" />
            <path d="M73.6,40c-0.1-0.3-0.2-0.5-0.2-1.5v-1.9c0-1.1-0.4-1.5-1.2-1.5h-0.6V40h-1.9V28.1h2.8c1.9,0,2.8,0.9,2.8,2.7    v0.9c0,1.2-0.4,2-1.2,2.4c0.9,0.4,1.2,1.3,1.2,2.5v1.8c0,0.6,0,1,0.2,1.4H73.6z M71.6,29.8v3.7h0.7c0.7,0,1.1-0.3,1.1-1.3V31    c0-0.8-0.3-1.2-1-1.2H71.6z" />
            <path d="M80,28.1h3c1.9,0,2.8,1,2.8,2.9v6c0,1.9-0.9,2.9-2.8,2.9h-3V28.1z M81.9,29.8v8.5h1.1c0.6,0,1-0.3,1-1.2    v-6.2c0-0.8-0.4-1.2-1-1.2H81.9z" />
            <path d="M89.2,33.1h2.6v1.7h-2.6v3.5h3.2V40h-5.1V28.1h5.1v1.7h-3.2V33.1z" />
            <path d="M95.9,33.4h2.4v1.7h-2.4V40H94V28.1h4.9v1.7h-3.1V33.4z" />
            <path d="M102.1,33.1h2.6v1.7h-2.6v3.5h3.2V40h-5.1V28.1h5.1v1.7h-3.2V33.1z" />
            <path d="M108.6,31.4V40h-1.7V28.1h2.3l1.9,7.1v-7.1h1.7V40h-1.9L108.6,31.4z" />
            <path d="M117.1,28c1.8,0,2.8,1.1,2.8,3v0.4h-1.8v-0.5c0-0.8-0.3-1.2-0.9-1.2c-0.6,0-0.9,0.3-0.9,1.2    c0,2.4,3.7,2.9,3.7,6.3c0,1.9-1,3-2.8,3s-2.8-1.1-2.8-3v-0.7h1.8v0.8c0,0.8,0.4,1.2,1,1.2s1-0.3,1-1.2c0-2.4-3.7-2.9-3.7-6.3    C114.3,29,115.3,28,117.1,28z" />
            <path d="M123.2,33.1h2.6v1.7h-2.6v3.5h3.2V40h-5.1V28.1h5.1v1.7h-3.2V33.1z" />
          </g>
        </g>
      </>
    )}
    {type === TYPES.WOUNDS && (
      <g fill={colours.softBlue}>
        <g>
          <path d="M44.9,33.5l-0.7,6.4h-2.6l-1.3-11.9h1.8l1,9.4l0.9-9.4h1.8l0.9,9.5l1-9.5h1.6l-1.3,11.9h-2.5L44.9,33.5z" />
          <path d="M50.2,30.7c0-1.9,1-3,2.8-3c1.8,0,2.8,1.1,2.8,3v6.2c0,1.9-1,3-2.8,3c-1.8,0-2.8-1.1-2.8-3V30.7z M52.1,37.1    c0,0.9,0.4,1.2,1,1.2c0.6,0,1-0.3,1-1.2v-6.4c0-0.9-0.4-1.2-1-1.2c-0.6,0-1,0.3-1,1.2V37.1z" />
          <path d="M58.9,27.9v9.2c0,0.9,0.4,1.2,1,1.2c0.6,0,1-0.3,1-1.2v-9.2h1.8V37c0,1.9-1,3-2.8,3S57,38.9,57,37v-9.1H58.9    z" />
          <path d="M65.5,31.2v8.6h-1.7V27.9h2.3l1.9,7.1v-7.1h1.7v11.9h-1.9L65.5,31.2z" />
          <path d="M71.1,27.9h3c1.9,0,2.8,1,2.8,2.9v6c0,1.9-0.9,2.9-2.8,2.9h-3V27.9z M73,29.6v8.5h1.1c0.6,0,1-0.3,1-1.2    v-6.2c0-0.9-0.4-1.2-1-1.2H73z" />
          <path d="M80.2,27.9H86v1.7h-2v10.2h-1.9V29.6h-2V27.9z" />
          <path d="M88.7,39.8h-1.9V27.9h1.9V33h2.1v-5.1h1.9v11.9h-1.9v-5.1h-2.1V39.8z" />
          <path d="M98,39.8c-0.1-0.3-0.2-0.5-0.2-1.5v-1.9c0-1.1-0.4-1.5-1.2-1.5h-0.6v4.9h-1.9V27.9h2.8    c1.9,0,2.8,0.9,2.8,2.7v0.9c0,1.2-0.4,2-1.2,2.4c0.9,0.4,1.2,1.3,1.2,2.5v1.8c0,0.6,0,1,0.2,1.4H98z M95.9,29.6v3.7h0.7    c0.7,0,1.1-0.3,1.1-1.3v-1.2c0-0.9-0.3-1.2-1-1.2H95.9z" />
          <path d="M102.8,32.9h2.6v1.7h-2.6v3.5h3.2v1.7h-5.1V27.9h5.1v1.7h-3.2V32.9z" />
          <path d="M109.7,27.7c1.8,0,2.8,1.1,2.8,3v0.4h-1.8v-0.5c0-0.9-0.3-1.2-0.9-1.2c-0.6,0-0.9,0.3-0.9,1.2    c0,2.5,3.7,2.9,3.7,6.3c0,1.9-1,3-2.8,3s-2.8-1.1-2.8-3v-0.7h1.8v0.9c0,0.9,0.4,1.2,1,1.2c0.6,0,1-0.3,1-1.2    c0-2.5-3.7-2.9-3.7-6.3C106.9,28.8,107.9,27.7,109.7,27.7z" />
          <path d="M115.4,39.8h-1.9V27.9h1.9V33h2.1v-5.1h1.9v11.9h-1.9v-5.1h-2.1V39.8z" />
          <path d="M120.7,30.7c0-1.9,1-3,2.8-3c1.8,0,2.8,1.1,2.8,3v6.2c0,1.9-1,3-2.8,3c-1.8,0-2.8-1.1-2.8-3V30.7z     M122.5,37.1c0,0.9,0.4,1.2,1,1.2c0.6,0,1-0.3,1-1.2v-6.4c0-0.9-0.4-1.2-1-1.2c-0.6,0-1,0.3-1,1.2V37.1z" />
          <path d="M127.6,27.9h1.9v10.2h3.1v1.7h-5V27.9z" />
          <path d="M133.3,27.9h3c1.9,0,2.8,1,2.8,2.9v6c0,1.9-0.9,2.9-2.8,2.9h-3V27.9z M135.2,29.6v8.5h1.1c0.6,0,1-0.3,1-1.2    v-6.2c0-0.9-0.4-1.2-1-1.2H135.2z" />
        </g>
      </g>
    )}
    {type === TYPES.STRAIN && (
      <g fill={colours.softBlue}>
        <g>
          <path d="M43.6,27.7c1.8,0,2.8,1.1,2.8,3v0.4h-1.8v-0.5c0-0.9-0.3-1.2-0.9-1.2c-0.6,0-0.9,0.3-0.9,1.2    c0,2.5,3.7,2.9,3.7,6.3c0,1.9-1,3-2.8,3s-2.8-1.1-2.8-3v-0.7h1.8v0.9c0,0.9,0.4,1.2,1,1.2c0.6,0,1-0.3,1-1.2    c0-2.5-3.7-2.9-3.7-6.3C40.8,28.8,41.8,27.7,43.6,27.7z" />
          <path d="M46.9,27.9h5.8v1.7h-2v10.2h-1.9V29.6h-2V27.9z" />
          <path d="M57.4,39.8c-0.1-0.3-0.2-0.5-0.2-1.5v-1.9c0-1.1-0.4-1.5-1.2-1.5h-0.6v4.9h-1.9V27.9h2.8    c1.9,0,2.8,0.9,2.8,2.7v0.9c0,1.2-0.4,2-1.2,2.4c0.9,0.4,1.2,1.3,1.2,2.5v1.8c0,0.6,0,1,0.2,1.4H57.4z M55.4,29.6v3.7h0.7    c0.7,0,1.1-0.3,1.1-1.3v-1.2c0-0.9-0.3-1.2-1-1.2H55.4z" />
          <path d="M66.4,39.8h-1.9l-0.3-2.2h-2.3l-0.3,2.2h-1.7l1.9-11.9h2.7L66.4,39.8z M62.1,36h1.8L63,30L62.1,36z" />
          <path d="M67.3,27.9h1.9v11.9h-1.9V27.9z" />
          <path d="M72.2,31.2v8.6h-1.7V27.9h2.3l1.9,7.1v-7.1h1.7v11.9h-1.9L72.2,31.2z" />
          <path d="M79.9,27.9h5.8v1.7h-2v10.2h-1.9V29.6h-2V27.9z" />
          <path d="M88.4,39.8h-1.9V27.9h1.9V33h2.1v-5.1h1.9v11.9h-1.9v-5.1h-2.1V39.8z" />
          <path d="M97.7,39.8c-0.1-0.3-0.2-0.5-0.2-1.5v-1.9c0-1.1-0.4-1.5-1.2-1.5h-0.6v4.9h-1.9V27.9h2.8    c1.9,0,2.8,0.9,2.8,2.7v0.9c0,1.2-0.4,2-1.2,2.4c0.9,0.4,1.2,1.3,1.2,2.5v1.8c0,0.6,0,1,0.2,1.4H97.7z M95.6,29.6v3.7h0.7    c0.7,0,1.1-0.3,1.1-1.3v-1.2c0-0.9-0.3-1.2-1-1.2H95.6z" />
          <path d="M102.5,32.9h2.6v1.7h-2.6v3.5h3.2v1.7h-5.1V27.9h5.1v1.7h-3.2V32.9z" />
          <path d="M109.4,27.7c1.8,0,2.8,1.1,2.8,3v0.4h-1.8v-0.5c0-0.9-0.3-1.2-0.9-1.2c-0.6,0-0.9,0.3-0.9,1.2    c0,2.5,3.7,2.9,3.7,6.3c0,1.9-1,3-2.8,3s-2.8-1.1-2.8-3v-0.7h1.8v0.9c0,0.9,0.4,1.2,1,1.2c0.6,0,1-0.3,1-1.2    c0-2.5-3.7-2.9-3.7-6.3C106.6,28.8,107.6,27.7,109.4,27.7z" />
          <path d="M115.1,39.8h-1.9V27.9h1.9V33h2.1v-5.1h1.9v11.9h-1.9v-5.1h-2.1V39.8z" />
          <path d="M120.3,30.7c0-1.9,1-3,2.8-3c1.8,0,2.8,1.1,2.8,3v6.2c0,1.9-1,3-2.8,3c-1.8,0-2.8-1.1-2.8-3V30.7z     M122.2,37.1c0,0.9,0.4,1.2,1,1.2c0.6,0,1-0.3,1-1.2v-6.4c0-0.9-0.4-1.2-1-1.2c-0.6,0-1,0.3-1,1.2V37.1z" />
          <path d="M127.2,27.9h1.9v10.2h3.1v1.7h-5V27.9z" />
          <path d="M133,27.9h3c1.9,0,2.8,1,2.8,2.9v6c0,1.9-0.9,2.9-2.8,2.9h-3V27.9z M134.9,29.6v8.5h1.1c0.6,0,1-0.3,1-1.2    v-6.2c0-0.9-0.4-1.2-1-1.2H134.9z" />
        </g>
      </g>
    )}
    {type === TYPES.SOAK && (
      <g fill={colours.softBlue}>
        <g>
          <path d="M78.9,28c1.8,0,2.8,1.1,2.8,3v0.4h-1.8v-0.5c0-0.8-0.3-1.2-0.9-1.2c-0.6,0-0.9,0.3-0.9,1.2    c0,2.4,3.7,2.9,3.7,6.3c0,1.9-1,3-2.8,3s-2.8-1.1-2.8-3v-0.7h1.8v0.8c0,0.8,0.4,1.2,1,1.2c0.6,0,1-0.3,1-1.2    c0-2.4-3.7-2.9-3.7-6.3C76.2,29,77.1,28,78.9,28z" />
          <path d="M83,30.9c0-1.9,1-3,2.8-3c1.8,0,2.8,1.1,2.8,3v6.2c0,1.9-1,3-2.8,3c-1.8,0-2.8-1.1-2.8-3V30.9z M84.9,37.2    c0,0.8,0.4,1.2,1,1.2c0.6,0,1-0.3,1-1.2v-6.4c0-0.8-0.4-1.2-1-1.2c-0.6,0-1,0.3-1,1.2V37.2z" />
          <path d="M96.4,40h-1.9l-0.3-2.2h-2.3L91.5,40h-1.7l1.9-11.9h2.7L96.4,40z M92.1,36.2h1.8l-0.9-6L92.1,36.2z" />
          <path d="M100.1,35.2l-0.6,1.1V40h-1.9V28.1h1.9v5.2l2.4-5.2h1.9l-2.6,5.3l2.6,6.6h-1.9L100.1,35.2z" />
        </g>
      </g>
    )}
  </svg>
)

DerivedStat.propTypes = {
  type: PropTypes.oneOf(Object.values(TYPES)).isRequired,
  width: PropTypes.number.isRequired,
}

export default DerivedStat
