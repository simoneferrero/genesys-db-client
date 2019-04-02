import { css } from 'styled-components/macro'

// Font relative paths
import MonkirtaUrl from './MonkirtaPursuitNC.otf'
import MinionProUrl from './MinionPro-Regular.otf'
import MinionProItalicUrl from './MinionPro-It.otf'
import MinionProBoldUrl from './MinionPro-Bold.otf'
import MinionProItalicBoldUrl from './MinionPro-BoldIt.otf'

import { fontFamilies } from 'styles/constants'

export const fontWeight = {
  normal: 'normal',
  bold: 'bold',
}
export const fontStyle = {
  normal: 'normal',
  italic: 'italic',
}

const fontFaces = css`
  @font-face {
    font-family: "${fontFamilies.Monkirta}";
    src: url("${MonkirtaUrl}");
    font-weight: ${fontWeight.bold};
    font-style: ${fontStyle.normal};
  }

  @font-face {
    font-family: "${fontFamilies.MinionPro}";
    src: url("${MinionProUrl}");
    font-weight: ${fontWeight.normal};
    font-style: ${fontStyle.normal};
  }
  @font-face {
    font-family: "${fontFamilies.MinionPro}";
    src: url("${MinionProItalicUrl}");
    font-weight: ${fontWeight.normal};
    font-style: ${fontStyle.italic};
  }
  @font-face {
    font-family: "${fontFamilies.MinionPro}";
    src: url("${MinionProBoldUrl}");
    font-weight: ${fontWeight.bold};
    font-style: ${fontStyle.normal};
  }
  @font-face {
    font-family: "${fontFamilies.MinionPro}";
    src: url("${MinionProItalicBoldUrl}");
    font-weight: ${fontWeight.bold};
    font-style: ${fontStyle.italic};
  }
`

export default fontFaces
