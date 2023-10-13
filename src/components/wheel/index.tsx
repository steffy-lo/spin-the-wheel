/** @jsxImportSource @emotion/react */
import React from "react";
import './wheel.css';
import { wheelCss } from "./styles";

const WHEEL_SCALE = 1.5
const WHEEL_SECTIONS = [
    {
        color: '#16a085',
        probability: 0.1,
        icon: 'dollar-sign'
    },
    {
        color: '#2980b9',
        probability: 0.2,
        icon: 'frown'
    },
    {
        color: '#34495e',
        probability: 0.2,
        icon: 'gifts'
    },
    {
        color: '#f39c12',
        probability: 0.2,
        icon: 'frown'
    },
    {
        color: '#d35400',
        probability: 0.2,
        icon: 'money-bill-alt'
    },
    {
        color: '#c0392b',
        probability: 0.1,
        icon: 'sad-cry'
    }

]

function Wheel() {
    return (
        <div id="wrapper">
            <div id="counter"> </div>
            <div id="wheel" css={wheelCss(WHEEL_SCALE, WHEEL_SECTIONS)}>
                <div id="inner-wheel">
                    {WHEEL_SECTIONS.map(section => <div className="sec"><span className={`fa fa-${section.icon}`}></span></div>)}
                </div>
                <div id="spin">
                    <div id="inner-spin"></div>
                </div>
            </div>
            <div id="txt"></div>
            <div id="winnings">
            </div>
        </div>
    );
}

export default Wheel;