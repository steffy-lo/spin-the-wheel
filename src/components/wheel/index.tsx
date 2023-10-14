/** @jsxImportSource @emotion/react */
import { useEffect, useState, useRef, useCallback } from "react";
import './wheel.css';
import { spinertia } from "./utils";
import _ from "lodash";

const prizes: Array<{ text: string, color: string, probability: number }> = [
    {
        text: "10% Off Sticker Price",
        color: "hsl(197 30% 43%)",
        probability: 11.5 // 41.4 deg
    },
    {
        text: "Free Car",
        color: "hsl(173 58% 39%)",
        probability: 4.5 // 16.2 deg
    },
    {
        text: "No Money Down",
        color: "hsl(43 74% 66%)",
        probability: 10 // 36 deg
    },
    {
        text: "Half Off Sticker Price",
        color: "hsl(27 87% 67%)",
        probability: 5 // 18 deg
    },
    {
        text: "Free DIY Carwash",
        color: "hsl(12 76% 61%)",
        probability: 10 // 36 deg
    },
    {
        text: "Eternal Damnation",
        color: "hsl(350 60% 52%)",
        probability: 20 // 72 deg
    },
    {
        text: "Used Travel Mug",
        color: "hsl(91 43% 54%)",
        probability: 20 // 72 deg
    },
    {
        text: "One Solid Hug",
        color: "hsl(140 36% 74%)",
        probability: 20 // 72 deg
    }
];

function Wheel() {

    const spinClass = "is-spinning";
    const selectedClass = "selected";

    const wheel = useRef<HTMLDivElement>(null);
    const spinner = useRef<HTMLUListElement>(null);
    const trigger = useRef<HTMLButtonElement>(null);
    const ticker = useRef<HTMLDivElement>(null);
    const [currentSlice, setCurrentSlice] = useState<number>(0);
    const [rotation, setRotation] = useState<number>(0);
    const [tickerAnim, setTickerAnim] = useState<number>(0);
    const [prizeNodes, setPrizeNodes] = useState<NodeListOf<Element>>();

    const createPrizeNodes = useCallback(() => {
        if (spinner.current === null) return;
        spinner.current.setAttribute(
            "style",
            `background: conic-gradient(
            from -90deg,
            ${prizes
                .map(({ color, probability }, i) => {
                    const cumulativeSum = _.sumBy(prizes.slice(0, i), 'probability')
                    return `${color} ${cumulativeSum}% ${cumulativeSum + probability}%`
                })
            });`
        );
        document.querySelectorAll(".prize").forEach(el => el.remove());
        prizes.forEach(({ text, probability }, i) => {
            const prizeOffset = 180 * probability / 100;
            const cumulativeSum = _.sumBy(prizes.slice(0, i + 1), 'probability')
            const rotate = 360 * (cumulativeSum / 100) - prizeOffset;
            if (spinner.current !== null) {
                spinner.current.insertAdjacentHTML(
                    "beforeend",
                    `<li class="prize" style="--rotate: ${rotate}deg">
                        <span class="text">${text}</span>
                    </li>`
                );
            }
        });
    }, []);

    const runTickerAnimation = () => {
        if (spinner.current === null || ticker.current === null) return;
        const spinnerStyles = window.getComputedStyle(spinner.current)
        const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
        const a = parseFloat(values[0]);
        const b = parseFloat(values[1]);
        let rad = Math.atan2(b, a);

        if (rad < 0) rad += (2 * Math.PI);

        const angle = Math.round(rad * (180 / Math.PI));
        const slice = Math.floor(angle / (360 / prizes.length));

        if (currentSlice !== slice) {
            ticker.current.style.animation = "none";
            setTimeout(() => {
                if (ticker.current === null) return;
                ticker.current.style.animation = ""
            }, 10);
            setCurrentSlice(slice);
        }

        setTickerAnim(requestAnimationFrame(runTickerAnimation));
    };

    const handleOnDone = () => {
        const getSelectedPrizeIndex = (rotation: number) => {
            console.log(rotation);
            let selectedIndex = prizes.length - 1;
            let i = selectedIndex;
            let cumulativeRotation = 0;
            while (rotation > cumulativeRotation + 360 * prizes[i].probability / 100) {
                cumulativeRotation += 360 * prizes[i].probability / 100
                selectedIndex -= 1;
                i--;
                if (i === 0) break;

            }
            console.log(selectedIndex);
            return selectedIndex;
        }

        if (spinner.current === null || trigger.current === null || wheel.current === null) return;
        cancelAnimationFrame(tickerAnim);
        trigger.current.disabled = false;
        trigger.current.focus();
        const rotate = rotation % 360;
        setRotation(rotate);
        const selectedIndex = getSelectedPrizeIndex(rotate);
        prizeNodes?.[selectedIndex].classList.add(selectedClass);
        wheel.current.classList.remove(spinClass);
        spinner.current.style.setProperty("--rotate", rotate.toString());
    }

    const handleSpin = () => {
        if (spinner.current === null ||
            trigger.current === null ||
            ticker.current === null ||
            wheel.current === null ||
            prizeNodes === undefined) return;
        trigger.current.disabled = true;
        const rotate = Math.floor(Math.random() * 360 + spinertia(2000, 5000));
        setRotation(rotate);
        prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
        wheel.current.classList.add(spinClass);
        spinner.current.style.setProperty("--rotate", rotate.toString());
        ticker.current.style.animation = "none";
        runTickerAnimation();
    }

    useEffect(() => {
        // Setup Wheel
        if (wheel.current === null || spinner.current === null) return;
        createPrizeNodes();
        setPrizeNodes(wheel.current.querySelectorAll(".prize"));
    }, [wheel, spinner, createPrizeNodes])

    return (
        <div className="deal-wheel" ref={wheel}>
            <ul className="spinner" ref={spinner} onTransitionEnd={handleOnDone}></ul>
            <div className="ticker" ref={ticker}></div>
            <button className="btn-spin" ref={trigger} onClick={handleSpin}>Spin the wheel</button>
        </div>
    );
}

export default Wheel;