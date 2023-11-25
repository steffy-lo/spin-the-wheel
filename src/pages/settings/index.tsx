/** @jsxImportSource @emotion/react */
import { useEffect, useState, useRef, useCallback } from "react";
import Button from 'react-bootstrap/Button';
import { AES, enc } from "crypto-js";
import _ from "lodash";
import './settings.css';
import CreatePrizeForm from "./components/CreatePrizeForm";
import PrizeTable from "./components/PrizeTable";

function Settings() {
    const [prizes, setPrizes] = useState([
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
    ]);

    useEffect(() => {
        const encryptedFlowQuery = AES.encrypt("prizeIndex=1", "FLOW_CONTEXT");
        var decryptedFlowQuery = AES.decrypt(encryptedFlowQuery, "FLOW_CONTEXT");
        var originalQuery = decryptedFlowQuery.toString(enc.Utf8);
        console.log(originalQuery)

    }, [])

    return (
        <div className="settings-page">
            <CreatePrizeForm prizes={prizes} setPrizes={setPrizes} />
            <PrizeTable prizes={prizes} setPrizes={setPrizes} />
            <Button variant="dark">Generate Link</Button>
        </div>
    );
}

export default Settings;