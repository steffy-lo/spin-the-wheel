import { css } from '@emotion/react'

export const wheelCss = (scale: number, sections: Array<{
    color: string,
    probability: number
}>) => css`
    width: ${250 * scale}px;
    height: ${250 * scale}px;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    border: ${8 * scale}px solid #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px ${10 * scale}px, rgba(0, 0, 0, 0.05) 0px ${3 * scale}px 0px;
    transform: rotate(0deg);
    :before {
        content: '';
        position: absolute;
        border: ${4 * scale}px solid rgba(0, 0, 0, 0.1);
        width: ${242 * scale}px;
        height: ${242 * scale}px;
        border-radius: 50%;
        z-index: 1000;
    }
    div.sec {
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: ${130 * scale}px ${75 * scale}px 0;
        border-color: #19c transparent;
        transform-origin: ${75 * scale}px ${129 * scale}px;
        left: ${50 * scale}px;
        top: -${4 * scale}px;
        opacity: 1;
    }
    div.sec .fa {
        margin-top: -${100 * scale}px;
        color: rgba(0, 0, 0, 0.2);
        position: relative;
        z-index: 10000000;
        display: block;
        text-align: center;
        font-size: ${32 * scale}px;
        margin-left: -${15 * scale}px;
        text-shadow: rgba(255, 255, 255, 0.1) 0px -${1 * scale}px 0px, rgba(0, 0, 0, 0.2) 0px ${1 * scale}px 0px;
    }

    ${sections.map((sec, index) => {
    const n = index + 1;
    const totalDeg = 360 / sections.length * n;
    return `
        div.sec:nth-child(${n}) {
            transform: rotate(${totalDeg}deg);
            -webkit-transform: rotate(${totalDeg}deg);
            -moz-transform: rotate(${totalDeg}deg);
            -o-transform: rotate(${totalDeg}deg);
            -ms-transform: rotate(${totalDeg}deg);
            border-color: ${sec.color} transparent;
        }`
})}`