/** @jsxImportSource @emotion/react */
import { useEffect, useState, useRef } from "react";
import './wheel.css';

const prizes = [
    {
        text: "10% Off Sticker Price",
        color: "hsl(197 30% 43%)"
    },
    {
        text: "Free Car",
        color: "hsl(173 58% 39%)"
    },
    {
        text: "No Money Down",
        color: "hsl(43 74% 66%)"
    },
    {
        text: "Half Off Sticker Price",
        color: "hsl(27 87% 67%)"
    },
    {
        text: "Free DIY Carwash",
        color: "hsl(12 76% 61%)"
    },
    {
        text: "Eternal Damnation",
        color: "hsl(350 60% 52%)"
    },
    {
        text: "Used Travel Mug",
        color: "hsl(91 43% 54%)"
    },
    {
        text: "One Solid Hug",
        color: "hsl(140 36% 74%)"
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
    const [spinnerStyles, setSpinnerStyles] = useState<CSSStyleDeclaration | null>(null);
    const [prizeSlice, setPrizeSlice] = useState(360 / prizes.length);
    const [prizeOffset, setPrizeOffset] = useState(Math.floor(180 / prizes.length));

    const createPrizeNodes = () => {
        if (spinner.current === null) return;
        spinner.current.setAttribute(
            "style",
            `background: conic-gradient(
            from -90deg,
            ${prizes
                .map(({ color }, i) => `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`)
                .reverse()
            }
          );`
        );
        prizes.forEach(({ text }, i) => {
            const rotate = ((prizeSlice * i) * -1) - prizeOffset;
            if (spinner.current !== null) {
                spinner.current.insertAdjacentHTML(
                    "beforeend",
                    `<li class="prize" style="--rotate: ${rotate}deg">
                  <span class="text">${text}</span>
                </li>`
                );
            }
        });
    };
    const setupWheel = () => {
        if (wheel.current === null || spinner.current === null) return;
        createPrizeNodes();
        setPrizeNodes(wheel.current.querySelectorAll(".prize"));
    };

    const spinertia = (min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const runTickerAnimation = () => {
        if (spinnerStyles === null || ticker.current === null) return;
        const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
        const a = parseFloat(values[0]);
        const b = parseFloat(values[1]);
        let rad = Math.atan2(b, a);

        if (rad < 0) rad += (2 * Math.PI);

        const angle = Math.round(rad * (180 / Math.PI));
        const slice = Math.floor(angle / prizeSlice);

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
        if (spinner.current === null || trigger.current === null || wheel.current === null) return;
        cancelAnimationFrame(tickerAnim);
        trigger.current.disabled = false;
        trigger.current.focus();
        const rotate = rotation % 360;
        setRotation(rotate);
        const selected = Math.floor(rotate / prizeSlice);
        prizeNodes?.[selected].classList.add(selectedClass);
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
        setupWheel();
    }, [wheel, spinner])

    useEffect(() => {
        if (spinner.current === null) return;
        setSpinnerStyles(window.getComputedStyle(spinner.current))
    }, [spinner])

    return (
        <div className="deal-wheel" ref={wheel}>
            <ul className="spinner" ref={spinner} onTransitionEnd={handleOnDone}></ul>
            <div className="ticker" ref={ticker}></div>
            <button className="btn-spin" ref={trigger} onClick={handleSpin}>Spin the wheel</button>
        </div>
    );
}

export default Wheel;