import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { CHARACTERISTICS } from 'utils/definitions'

import { colours } from 'styles/constants'

/** A badge to display one of the character's characteristics. */
export const CharacteristicsBadge = ({ type, height }) => (
  <svg
    data-testid={`characteristics-badge-${type}`}
    style={{ enableBackground: 'new 0 0 144 144' }}
    version="1.1"
    viewBox="20 25 104 103"
    height={`${height}px`}
    x="0px"
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    y="0px"
  >
    <g>
      <path
        fill={colours.lightOrange}
        d="M118.7,59.7l-5.2-2.9c-1.1-0.6-2.3-0.9-3.6-0.9c-1.1,0-2.1,0.2-3,0.7c-0.1-1.4-0.5-2.8-1.2-3.9L93.3,31   c-1.7-2.9-5.3-5-8.6-5H59.7c-3.3,0-6.9,2.1-8.6,5L38.7,52.6c-0.7,1.2-1.1,2.5-1.2,3.9c-0.9-0.4-1.9-0.6-3-0.6c-1.3,0-2.6,0.3-3.7,1   l-5,2.8c-2.9,1.6-5,5.2-5,8.5l-0.2,21.9h0v3.1l0,3.1h0v16c0,7.9,6.4,14.3,14.3,14.3h14.7h59.8c7.9,0,14.3-6.4,14.3-14.3v-19v-25   C123.8,64.9,121.7,61.3,118.7,59.7"
      />
      <path
        fill={colours.veryLightOrange}
        d="M58.2,89.6c-2.2,0-4.8-1.5-6-3.3L37,61.9c-0.5-0.9-1.5-1.3-2.5-1.3c-0.5,0-1,0.1-1.4,0.4l-5,2.8   c-1.4,0.8-2.7,2.9-2.7,4.6l-0.2,25v19c0,5.4,4.4,9.7,9.7,9.7h14.7h59.8c5.4,0,9.7-4.4,9.7-9.7v-19v-25c0-1.7-1.2-3.7-2.7-4.5   l-5.2-2.9c-0.4-0.2-0.9-0.3-1.3-0.3c-1,0-1.9,0.5-2.4,1.4l-14,24.3c-1.1,1.9-3.7,3.4-5.9,3.4H58.2z"
      />
      <g>
        <defs>
          <rect id="SVGID_4_" x="11" y="51" width="121.2" height="73" />
        </defs>
        <clipPath id="SVGID_5_">
          <use href="#SVGID_4_" style={{ overflow: 'visible' }} />
        </clipPath>
        <g clipPath="url(#SVGID_5_)">
          <defs>
            <path
              id="SVGID_6_"
              d="M107.5,61.9l-14,24.3c-1.1,1.9-3.7,3.4-5.9,3.4H58.2c-2.2,0-4.8-1.5-6-3.3L37,61.9      c-0.5-0.9-1.5-1.3-2.5-1.3c-0.5,0-1,0.1-1.4,0.4l-5,2.8c-1.4,0.8-2.7,2.9-2.7,4.6l-0.2,25v19c0,5.4,4.4,9.7,9.7,9.7h14.7h59.8      c5.4,0,9.7-4.4,9.7-9.7v-19v-25c0-1.7-1.2-3.7-2.7-4.5l-5.2-2.9c-0.4-0.2-0.9-0.3-1.3-0.3C109,60.5,108,61,107.5,61.9"
            />
          </defs>
          <clipPath id="SVGID_7_">
            <use href="#SVGID_6_" style={{ overflow: 'visible' }} />
          </clipPath>
          <g clipPath="url(#SVGID_7_)">
            <defs>
              <rect id="SVGID_8_" x="25" y="60.3" width="94.3" height="62" />
            </defs>
            <clipPath id="SVGID_9_">
              <use href="#SVGID_8_" style={{ overflow: 'visible' }} />
            </clipPath>
            <g
              transform="matrix(1 0 0 1 -1.907349e-06 0)"
              style={{ clipPath: 'url(#SVGID_9_)' }}
            >
              <image
                style={{ overflow: 'visible' }}
                width="269"
                height="177"
                href="data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEAzQDNAAD/7AARRHVja3kAAQAEAAAAHgAA/+4AIUFkb2JlAGTAAAAAAQMA EAMCAwYAAALJAAADkQAABL//2wCEABALCwsMCxAMDBAXDw0PFxsUEBAUGx8XFxcXFx8eFxoaGhoX Hh4jJSclIx4vLzMzLy9AQEBAQEBAQEBAQEBAQEABEQ8PERMRFRISFRQRFBEUGhQWFhQaJhoaHBoa JjAjHh4eHiMwKy4nJycuKzU1MDA1NUBAP0BAQEBAQEBAQEBAQP/CABEIALMBDgMBIgACEQEDEQH/ xACEAAEBAQEBAAAAAAAAAAAAAAAAAQIDBgEBAQEBAQAAAAAAAAAAAAAAAAECAwQQAAIABgMBAAAA AAAAAAAAAAABQDECIgMTUBIyEREAAgEFAQEAAwEAAAAAAAAAAAEyUHECQqKxMSFRYcESAAMBAQEB AQEAAAAAAAAAAAAxQgFAgZFwQf/aAAwDAQACEQMRAAAA9szPL32wNsDbA2wNsDbA2wNsDbA2wNsD bA2wNsDbA3eerJLM0FAAAAAAAAAAAAAAazqySyFBKIFAAAAAAAAAAURKJrOqgAAIsgFAAAAAAAAF QKAms6IAAACLIBQAAAAABUCgAJqUgACqiwCIoioiiKIoiiKoAAABZSAFAsASliiKiKIoiiKIqpQA SiCFlIBZQLAAAAAAAAAAAAWCFlIACigQAAAAAAAAAARQhZSEKBYKiqgqCoKgqCoKgqCoKgCAJrOi SyKgqKqCoKgqCoKgqCoKgqCoKiLAazqqN5AAAAAAAAAAAAAAAUs//9oACAECAAEFAOzOzOzOzOzO zOzOzOzOzOzOzOzOzOzOzE3AqBU4BQKgVOAU4BTgFOAUCoFH/9oACAEDAAEFAPiPiPiPiPiPiPiP iPiPiPiPiPiPiPiPiGlAuBcC4FwLgXAuBcC4FwX/2gAIAQEAAQUAeSv7syGzIbMhsyGzIbMhsyGz IbMhsyGzIbMhsyGzIbMhsyGzIbMhsyGzIbMhsyGzIbMhsyGzIbMhsyGzIbMhsyGzIU5K+rnwFPlz 4Cny58BT5c+Ap8ufAU+XPgKfLnwFPlz4Cny58BT5c+Ap8ufAU+XPgKfLnwFPlz4Cny58BT5c+Ap8 ufAU+XPgKfLnwFPlz4Cny58BT5fX7aWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlPXr/ AP/aAAgBAgIGPwB6PR6PR6PR6PR6PR6PR6PR6PR7/eHzeHzeHzeHzeH7w/eH7w/eHzeHzSCCCCCC CCCCCCCCCCD/2gAIAQMCBj8AQhCEIQhCEIQhCF+V0UUUUUUUUUUUUUUUUf/aAAgBAQEGPwCTJMky TJMkyTJMkyTJMkyTJMkyTJMkyTJMkyTJMkyTJMkyTJMkyTJMkzL8/F/tCysvVQsrL1ULKy9VCysv VQsrL1ULKy9VCysvVQsrL1ULKy9VCysvVQsrL1ULKy9VCysvVQsrL1ULKy9VCysvVQsrL1ULKy9V CysvVQsrL1ULKy9Rr0a9GvRr0a9GvRr0a9GvRr0a9GvRr0a9GvRr0a9GvRr0a9GvRr0a9GvRr0a9 GvRr0a9GvRr0a9GvRl8+f39n/9k="
                transform="matrix(0.3505 0 0 0.3505 25.0365 60.2762)"
              />
            </g>
          </g>
        </g>
        <defs>
          <filter
            id="Adobe_OpacityMaskFilter"
            filterUnits="userSpaceOnUse"
            x="24.3"
            y="60.8"
            width="95.3"
            height="62.4"
          >
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
            />
          </filter>
        </defs>
        <mask
          maskUnits="userSpaceOnUse"
          x="24.3"
          y="60.8"
          width="95.3"
          height="62.4"
          id="SVGID_10_"
        >
          <g filter="url(#Adobe_OpacityMaskFilter)">
            <g>
              <defs>
                <rect
                  id="SVGID_11_"
                  x="11"
                  y="51"
                  width="120.6"
                  height="74.3"
                />
              </defs>
              <clipPath id="SVGID_12_" clipPath="url(#SVGID_5_)">
                <use href="#SVGID_11_" style={{ overflow: 'visible' }} />
              </clipPath>
              <g
                transform="matrix(1 0 0 1 0 -3.814697e-06)"
                style={{ clipPath: 'url(#SVGID_12_)' }}
              >
                <image
                  style={{ overflow: 'visible' }}
                  width="172"
                  height="106"
                  xlinkHref="data:image/jpeg;base64,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 k//Z"
                  transform="matrix(0.7011 0 0 0.7011 11.0152 50.9795)"
                />
              </g>
            </g>
          </g>
        </mask>
        <rect
          x="24.3"
          y="60.8"
          clipPath="url(#SVGID_5_)"
          mask="url(#SVGID_10_)"
          fill={colours.white}
          width="95.3"
          height="62.4"
        />
      </g>
      <path
        fill={colours.softBlue}
        d="M119.1,112.3c0,5.4-4.4,9.7-9.7,9.7H49.7H35c-5.4,0-9.7-4.4-9.7-9.7v-19l0.2-25c0-1.7,1.2-3.7,2.7-4.6l5-2.8   c1.3-0.7,3.1-0.3,3.9,1l15.2,24.4c1.2,1.9,3.8,3.3,6,3.3h29.4c2.2,0,4.8-1.5,5.9-3.4l14-24.3c0.8-1.3,2.4-1.8,3.8-1l5.2,2.9   c1.4,0.8,2.7,2.9,2.7,4.5v25V112.3z M117.2,62.4l-5.2-2.9c-2.1-1.1-4.7-0.4-5.8,1.6l-14,24.3c-0.8,1.4-2.9,2.6-4.6,2.6H58.2   c-1.7,0-3.8-1.2-4.7-2.6L38.3,61.1c-1.2-2-3.9-2.7-5.9-1.5l-5,2.8c-1.9,1.1-3.4,3.7-3.5,5.9l-0.2,25l0.8,0h-0.8v19   c0,6.2,5.1,11.3,11.3,11.3h14.7h59.8c6.2,0,11.3-5.1,11.3-11.3v-19v-25C120.7,66.1,119.2,63.5,117.2,62.4"
      />
      <rect x="20.6" y="26.1" fill="none" width="103.2" height="100.6" />
      <g>
        <defs>
          <rect id="SVGID_13_" x="26.5" y="19.5" width="90.6" height="68.6" />
        </defs>
        <clipPath id="SVGID_14_">
          <use href="#SVGID_13_" style={{ overflow: 'visible' }} />
        </clipPath>
        <path
          clipPath="url(#SVGID_14_)"
          fill={colours.veryLightBlue}
          d="M59.6,85.7h26.1c1.7,0,3.9-1.3,4.8-2.8l13-22.6c0.9-1.5,0.9-4,0-5.5l-13-22.6c-0.9-1.5-3.1-2.8-4.8-2.8H59.6    c-1.7,0-3.9,1.3-4.8,2.8l-13,22.6c-0.9,1.5-0.9,4,0,5.5l13,22.6C55.6,84.4,57.8,85.7,59.6,85.7"
        />
        <defs>
          <filter
            id="Adobe_OpacityMaskFilter_1_"
            filterUnits="userSpaceOnUse"
            x="43.3"
            y="29.3"
            width="58.9"
            height="56.1"
          >
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
            />
          </filter>
        </defs>
        <mask
          maskUnits="userSpaceOnUse"
          x="43.3"
          y="29.3"
          width="58.9"
          height="56.1"
          id="SVGID_15_"
        >
          <g filter="url(#Adobe_OpacityMaskFilter_1_)">
            <g>
              <defs>
                <rect
                  id="SVGID_16_"
                  x="26.5"
                  y="19.5"
                  width="90.4"
                  height="69.4"
                />
              </defs>
              <clipPath id="SVGID_17_" clipPath="url(#SVGID_14_)">
                <use href="#SVGID_16_" style={{ overflow: 'visible' }} />
              </clipPath>
              <g style={{ clipPath: 'url(#SVGID_17_)' }}>
                <image
                  style={{ overflow: 'visible' }}
                  width="129"
                  height="99"
                  href="data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEAZwBnAAD/7AARRHVja3kAAQAEAAAAHgAA/+4AIUFkb2JlAGTAAAAAAQMA EAMCAwYAAAI5AAADlgAABLj/2wCEABALCwsMCxAMDBAXDw0PFxsUEBAUGx8XFxcXFx8eFxoaGhoX Hh4jJSclIx4vLzMzLy9AQEBAQEBAQEBAQEBAQEABEQ8PERMRFRISFRQRFBEUGhQWFhQaJhoaHBoa JjAjHh4eHiMwKy4nJycuKzU1MDA1NUBAP0BAQEBAQEBAQEBAQP/CABEIAGQAggMBIgACEQEDEQH/ xACEAAEBAAMBAQAAAAAAAAAAAAAABQMEBgIBAQEAAAAAAAAAAAAAAAAAAAAAEAABBAIBBAIDAQAA AAAAAAABABECBAMFFhAgNQYhEkBQMRQRAAECBAcAAwEAAAAAAAAAAAABAyAhMQLSk7MEdAU1EDAR QBIBAAAAAAAAAAAAAAAAAAAAUP/aAAwDAQACEQMRAAAA53RTygnignignignignignignignihPo TwB6bpr5a26c946jCcxjuTDUffgABQn0J4+/PZsXNHojNUz1CTrdJrHHQ+1505PDRnnwAFCfQnjL iyl7peZ6U6OjNomTDmwkrmuk5o5uRXkHkAFCfQnj15FfoeQtHa1eOpnR60rXMvPZ4hpaOTEAAUJ9 CeAetvS+l3c5r2dLhheCnOxeB8AAChPAAAAAAAAD/9oACAECAAEFAP3/AP/aAAgBAwABBQD9/wD/ 2gAIAQEAAQUA3m83eLd8g3y5BvlyDfLkG+XIN8uQb5cg3y5BvlyDfLkG+XIN8uQb5cg3y5BvlyDf LkG+XsHnvwPYPPdggSo4DJRpyK/wyUqkgpYSEYt3ewee6wi5r1jJYKQWOiSjQKyUSBYprPhMTIMe z2Dz3QBzWwmRp1firSdYqAY0A2eiGt02V2t8Zsf1PZ7B57pjDmhiVHA6p1g2KuGOANnrhrtYNewM ruP6ykPnr7B57phDyoRDa+AapANjiGZZYhrsA2wgFsIqf96+wee6YS0qEw2vyBqmQNjkG+wWWYa7 kDbCYWwmp/3r7B57pAsaOZlRsMqdoNishjYDZ7Ia7aCvZ3VzL9pE9nsHnugVfKYmpa+Kt1li2AY7 ANmvgi1cdXLLrLNz2ewee6xkxw5zFYLqheRvrJeCz3XWXKZEl+32Dz3YJMo5iELUl/rkjZkUchKJ fu9g89+B/9oACAECAgY/AH//2gAIAQMCBj8Af//aAAgBAQEGPwDsGmuw3Vjdm6etsstectttttcu REREukiHp7vPcxHp7vPcxHp7vPcxHp7vPcxHp7vPcxHp7vPcxHp7vPcxHp7vPcxHp7vPcxHp7vPc xHp7vPcxHp7vPcxHp7vPcxHp7vPcxHp7vPcxHp7vPcxHZ8t/Uu/h7Plv6l0dChT6Oz5b+pdCkhJF ChQWQsouz5b+pdAkhE/BJFChQWQshYez5b+pdB+iSEkUKFBZCyFh7Plv6l3ygggkCixdny39S75Q QQSBRT8h7Plv6l0CIJMSZUqVFmLMWHs+W/qXQIJMSZUqVFmKiLF2fLf1LoUmVKlSoqIsfZ8t/Uui qVKlfo7Plv6l38P/2Q=="
                  transform="matrix(0.7011 0 0 0.7011 26.486 19.5337)"
                />
              </g>
            </g>
          </g>
        </mask>
        <rect
          x="43.3"
          y="29.3"
          clipPath="url(#SVGID_14_)"
          mask="url(#SVGID_15_)"
          fill={colours.white}
          width="58.9"
          height="56.1"
        />
      </g>
      <path
        fill={colours.softBlue}
        d="M60.1,30.7c-1.7,0-3.7,1.2-4.6,2.6L43.1,54.9c-0.8,1.4-0.8,3.9,0,5.3l12.5,21.6c0.8,1.4,2.9,2.6,4.6,2.6h24.9   c1.7,0,3.8-1.2,4.6-2.6l12.5-21.6c0.8-1.4,0.8-3.9,0-5.3L89.6,33.3c-0.8-1.4-2.9-2.6-4.6-2.6H60.1z M85.1,86H60.1   c-2.2,0-4.8-1.5-5.9-3.4L41.8,61c-1.1-1.9-1.1-4.9,0-6.8l12.5-21.6c1.1-1.9,3.7-3.4,5.9-3.4h24.9c2.2,0,4.8,1.5,5.9,3.4l12.5,21.6   c1.1,1.9,1.1,4.9,0,6.8L91,82.6C89.9,84.5,87.3,86,85.1,86"
      />
      <rect x="20.6" y="26.1" fill="none" width="103.2" height="100.6" />
    </g>
    {type === CHARACTERISTICS.BRAWN && (
      <g fill={colours.softBlue}>
        <g>
          <path d="M57.3,99.4v0.5c0,1.5-0.5,2.4-1.5,2.9c1.2,0.5,1.7,1.6,1.7,3.1v1.2c0,2.2-1.2,3.4-3.4,3.4h-3.5V96.1h3.4    C56.3,96.1,57.3,97.2,57.3,99.4z M52.8,98.1v3.8h0.9c0.8,0,1.4-0.4,1.4-1.5v-0.8c0-1-0.3-1.5-1.1-1.5H52.8z M52.8,104v4.4h1.3    c0.8,0,1.2-0.3,1.2-1.4v-1.3c0-1.3-0.4-1.7-1.5-1.7H52.8z" />
          <path d="M63.6,110.4c-0.1-0.4-0.2-0.6-0.2-1.8v-2.3c0-1.3-0.5-1.8-1.5-1.8h-0.8v5.8h-2.3V96.1h3.4    c2.3,0,3.3,1.1,3.3,3.3v1.1c0,1.5-0.5,2.4-1.5,2.9c1.1,0.5,1.5,1.6,1.5,3.1v2.2c0,0.7,0,1.2,0.2,1.7H63.6z M61.1,98.1v4.4H62    c0.8,0,1.4-0.4,1.4-1.5v-1.4c0-1-0.3-1.5-1.1-1.5H61.1z" />
          <path d="M74.4,110.4h-2.3l-0.4-2.6H69l-0.4,2.6h-2.1l2.3-14.3h3.3L74.4,110.4z M69.3,105.9h2.2l-1.1-7.3L69.3,105.9z    " />
          <path d="M80.4,102.8l-0.8,7.6h-3.1l-1.6-14.3h2.2l1.2,11.3l1.1-11.3h2.2l1.1,11.4l1.2-11.4h2l-1.6,14.3h-3    L80.4,102.8z" />
          <path d="M89,100v10.4h-2V96.1h2.8l2.3,8.6v-8.6h2v14.3h-2.3L89,100z" />
        </g>
      </g>
    )}
    {type === CHARACTERISTICS.AGILITY && (
      <g fill={colours.softBlue}>
        <g>
          <path d="M57.2,110.4h-2.3l-0.4-2.6h-2.8l-0.4,2.6h-2.1l2.3-14.3h3.3L57.2,110.4z M52.1,105.9h2.2l-1.1-7.3    L52.1,105.9z" />
          <path d="M61.6,102.4h3.2v4.5c0,2.3-1.1,3.6-3.4,3.6S58,109.3,58,107v-7.5c0-2.3,1.1-3.6,3.4-3.6s3.4,1.3,3.4,3.6v1.4    h-2.1v-1.5c0-1-0.5-1.4-1.2-1.4s-1.2,0.4-1.2,1.4v7.7c0,1,0.5,1.4,1.2,1.4s1.2-0.4,1.2-1.4v-2.6h-1V102.4z" />
          <path d="M66.2,96.1h2.3v14.3h-2.3V96.1z" />
          <path d="M70.1,96.1h2.3v12.3h3.7v2h-6V96.1z" />
          <path d="M77.1,96.1h2.3v14.3h-2.3V96.1z" />
          <path d="M80.3,96.1h7v2h-2.4v12.3h-2.3V98.1h-2.4V96.1z" />
          <path d="M90.4,105.7l-2.8-9.6h2.4l1.7,6.5l1.7-6.5h2.2l-2.8,9.6v4.8h-2.3V105.7z" />
        </g>
      </g>
    )}
    {type === CHARACTERISTICS.CUNNING && (
      <g fill={colours.softBlue}>
        <g>
          <path d="M52.6,105.1v1.9c0,2.3-1.1,3.6-3.4,3.6s-3.4-1.3-3.4-3.6v-7.5c0-2.3,1.1-3.6,3.4-3.6s3.4,1.3,3.4,3.6v1.4    h-2.1v-1.5c0-1-0.5-1.4-1.2-1.4s-1.2,0.4-1.2,1.4v7.7c0,1,0.5,1.4,1.2,1.4s1.2-0.4,1.2-1.4v-2H52.6z" />
          <path d="M56.1,96.1v11.1c0,1,0.5,1.4,1.2,1.4s1.2-0.4,1.2-1.4V96.1h2.1V107c0,2.3-1.1,3.6-3.4,3.6    c-2.2,0-3.4-1.3-3.4-3.6V96.1H56.1z" />
          <path d="M64.1,100v10.4h-2V96.1h2.8l2.3,8.6v-8.6h2v14.3h-2.3L64.1,100z" />
          <path d="M72.9,100v10.4h-2V96.1h2.8l2.3,8.6v-8.6h2v14.3h-2.3L72.9,100z" />
          <path d="M79.6,96.1h2.3v14.3h-2.3V96.1z" />
          <path d="M85.5,100v10.4h-2V96.1h2.8l2.3,8.6v-8.6h2v14.3h-2.3L85.5,100z" />
          <path d="M95.6,102.4h3.2v4.5c0,2.3-1.1,3.6-3.4,3.6s-3.4-1.3-3.4-3.6v-7.5c0-2.3,1.1-3.6,3.4-3.6s3.4,1.3,3.4,3.6    v1.4h-2.1v-1.5c0-1-0.5-1.4-1.2-1.4c-0.7,0-1.2,0.4-1.2,1.4v7.7c0,1,0.5,1.4,1.2,1.4c0.7,0,1.2-0.4,1.2-1.4v-2.6h-1V102.4z" />
        </g>
      </g>
    )}
    {type === CHARACTERISTICS.INTELLECT && (
      <g fill={colours.softBlue}>
        <g>
          <path d="M41.1,96.1h2.3v14.3h-2.3V96.1z" />
          <path d="M47,100v10.4h-2V96.1h2.8l2.3,8.6v-8.6h2v14.3h-2.3L47,100z" />
          <path d="M53.1,96.1h7v2h-2.4v12.3h-2.3V98.1h-2.4V96.1z" />
          <path d="M63.3,102.1h3.1v2h-3.1v4.2h3.9v2H61V96.1h6.1v2h-3.9V102.1z" />
          <path d="M68.6,96.1h2.3v12.3h3.7v2h-6V96.1z" />
          <path d="M75.5,96.1h2.3v12.3h3.7v2h-6V96.1z" />
          <path d="M84.7,102.1h3.1v2h-3.1v4.2h3.9v2h-6.1V96.1h6.1v2h-3.9V102.1z" />
          <path d="M96.5,105.1v1.9c0,2.3-1.1,3.6-3.4,3.6s-3.4-1.3-3.4-3.6v-7.5c0-2.3,1.1-3.6,3.4-3.6s3.4,1.3,3.4,3.6v1.4    h-2.1v-1.5c0-1-0.5-1.4-1.2-1.4c-0.7,0-1.2,0.4-1.2,1.4v7.7c0,1,0.5,1.4,1.2,1.4c0.7,0,1.2-0.4,1.2-1.4v-2H96.5z" />
          <path d="M97.3,96.1h7v2h-2.4v12.3h-2.3V98.1h-2.4V96.1z" />
        </g>
      </g>
    )}
    {type === CHARACTERISTICS.WILLPOWER && (
      <g fill={colours.softBlue}>
        <g>
          <path d="M41.9,102.8l-0.8,7.6H38l-1.6-14.3h2.2l1.2,11.3l1.1-11.3H43l1.1,11.4l1.2-11.4h2l-1.6,14.3h-3L41.9,102.8z" />
          <path d="M48.4,96.1h2.3v14.3h-2.3V96.1z" />
          <path d="M52.3,96.1h2.3v12.3h3.7v2h-6V96.1z" />
          <path d="M59.3,96.1h2.3v12.3h3.7v2h-6V96.1z" />
          <path d="M72.9,99.6v1.9c0,2.3-1.1,3.5-3.4,3.5h-1.1v5.4h-2.3V96.1h3.3C71.8,96.1,72.9,97.3,72.9,99.6z M68.5,98.1    v4.9h1.1c0.7,0,1.1-0.3,1.1-1.4v-2.2c0-1-0.4-1.4-1.1-1.4H68.5z" />
          <path d="M73.8,99.5c0-2.3,1.2-3.6,3.4-3.6s3.4,1.3,3.4,3.6v7.5c0,2.3-1.2,3.6-3.4,3.6s-3.4-1.3-3.4-3.6V99.5z     M76,107.1c0,1,0.5,1.4,1.2,1.4c0.7,0,1.2-0.4,1.2-1.4v-7.7c0-1-0.5-1.4-1.2-1.4c-0.7,0-1.2,0.4-1.2,1.4V107.1z" />
          <path d="M87.1,102.8l-0.8,7.6h-3.1l-1.6-14.3h2.2l1.2,11.3L86,96.1h2.2l1.1,11.4l1.2-11.4h2l-1.6,14.3h-3L87.1,102.8    z" />
          <path d="M95.9,102.1H99v2h-3.1v4.2h3.9v2h-6.1V96.1h6.1v2h-3.9V102.1z" />
          <path d="M105.9,110.4c-0.1-0.4-0.2-0.6-0.2-1.8v-2.3c0-1.3-0.5-1.8-1.5-1.8h-0.8v5.8h-2.3V96.1h3.4    c2.3,0,3.3,1.1,3.3,3.3v1.1c0,1.5-0.5,2.4-1.5,2.9c1.1,0.5,1.5,1.6,1.5,3.1v2.2c0,0.7,0,1.2,0.2,1.7H105.9z M103.4,98.1v4.4h0.9    c0.8,0,1.4-0.4,1.4-1.5v-1.4c0-1-0.3-1.5-1.1-1.5H103.4z" />
        </g>
      </g>
    )}
    {type === CHARACTERISTICS.PRESENCE && (
      <g fill={colours.softBlue}>
        <g>
          <path d="M48.4,99.6v1.9c0,2.3-1.1,3.5-3.4,3.5h-1.1v5.4h-2.3V96.1H45C47.2,96.1,48.4,97.3,48.4,99.6z M43.9,98.1v4.9    H45c0.7,0,1.1-0.3,1.1-1.4v-2.2c0-1-0.4-1.4-1.1-1.4H43.9z" />
          <path d="M54.1,110.4c-0.1-0.4-0.2-0.6-0.2-1.8v-2.3c0-1.3-0.5-1.8-1.5-1.8h-0.8v5.8h-2.3V96.1h3.4    c2.3,0,3.3,1.1,3.3,3.3v1.1c0,1.5-0.5,2.4-1.5,2.9c1.1,0.5,1.5,1.6,1.5,3.1v2.2c0,0.7,0,1.2,0.2,1.7H54.1z M51.7,98.1v4.4h0.9    c0.8,0,1.4-0.4,1.4-1.5v-1.4c0-1-0.3-1.5-1.1-1.5H51.7z" />
          <path d="M59.9,102.1H63v2h-3.1v4.2h3.9v2h-6.1V96.1h6.1v2h-3.9V102.1z" />
          <path d="M68.2,95.9c2.2,0,3.3,1.3,3.3,3.6v0.5h-2.1v-0.6c0-1-0.4-1.4-1.1-1.4s-1.1,0.4-1.1,1.4c0,3,4.4,3.5,4.4,7.6    c0,2.3-1.1,3.6-3.4,3.6c-2.2,0-3.4-1.3-3.4-3.6v-0.9H67v1c0,1,0.5,1.4,1.2,1.4s1.2-0.4,1.2-1.4c0-3-4.4-3.5-4.4-7.6    C64.9,97.2,66,95.9,68.2,95.9z" />
          <path d="M75.1,102.1h3.1v2h-3.1v4.2H79v2h-6.1V96.1H79v2h-3.9V102.1z" />
          <path d="M82.4,100v10.4h-2V96.1h2.8l2.3,8.6v-8.6h2v14.3h-2.3L82.4,100z" />
          <path d="M95.7,105.1v1.9c0,2.3-1.1,3.6-3.4,3.6S89,109.3,89,107v-7.5c0-2.3,1.1-3.6,3.4-3.6s3.4,1.3,3.4,3.6v1.4    h-2.1v-1.5c0-1-0.5-1.4-1.2-1.4c-0.7,0-1.2,0.4-1.2,1.4v7.7c0,1,0.5,1.4,1.2,1.4c0.7,0,1.2-0.4,1.2-1.4v-2H95.7z" />
          <path d="M99.3,102.1h3.1v2h-3.1v4.2h3.9v2h-6.1V96.1h6.1v2h-3.9V102.1z" />
        </g>
      </g>
    )}
  </svg>
)

CharacteristicsBadge.propTypes = {
  /** The height taken by the badge */
  height: PropTypes.number.isRequired,
  /** One of the characteristics */
  type: PropTypes.oneOf(Object.values(CHARACTERISTICS)).isRequired,
}

export default memo(CharacteristicsBadge)
