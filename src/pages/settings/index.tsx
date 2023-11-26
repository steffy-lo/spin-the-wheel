/** @jsxImportSource @emotion/react */
import { useState } from "react";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { AES } from "crypto-js";
import './settings.css';
import CreatePrizeForm from "./components/CreatePrizeForm";
import PrizeTable from "./components/PrizeTable";
import AdditionalSettings from "./components/AdditionalSettings";

function Settings() {
    const [prizes, setPrizes] = useState([
        {
            text: "10% Off Sticker Price",
            color: "#4d7c8f",
            probability: 10.5 // 37.8 deg
        },
        {
            text: "Free Car",
            color: "#2a9d90",
            probability: 4.5 // 16.2 deg
        },
        {
            text: "No Money Down",
            color: "#e8c468",
            probability: 10 // 36 deg
        },
        {
            text: "Half Off Sticker Price",
            color: "#f4a462",
            probability: 5 // 18 deg
        },
        {
            text: "Free DIY Carwash",
            color: "#e76e50",
            probability: 10 // 36 deg
        },
        {
            text: "Eternal Damnation",
            color: "#ce3b54",
            probability: 20 // 72 deg
        },
        {
            text: "Used Travel Mug",
            color: "#88bc57",
            probability: 20 // 72 deg
        },
        {
            text: "One Solid Hug",
            color: "#a5d5b5",
            probability: 20 // 72 deg
        }
    ]);
    const [additionalSettings, setAdditionalSettings] = useState({})
    const [generatedLink, setGeneratedLink] = useState<string>()

    // Generate link to spin the wheel with a flow context
    const generateLink = () => {
        const flowContextQuery = {
            prizes,
            additionalSettings
        }
        const encryptedFlowQuery = AES.encrypt(JSON.stringify(flowContextQuery), "FLOW_CONTEXT_QUERY").toString();
        const linkQuery = `?flowContext=${encryptedFlowQuery}`;
        setGeneratedLink(`/${linkQuery}`);
    }

    return (
        <div className="settings-page">
            <CreatePrizeForm
                prizes={prizes}
                setPrizes={setPrizes}
            />
            <PrizeTable
                prizes={prizes}
                setPrizes={setPrizes}
            />
            <AdditionalSettings
                prizes={prizes}
                additionalProps={additionalSettings}
                setAdditionalProps={setAdditionalSettings}
            />
            {generatedLink ?
                <Alert variant="info">
                    Link for your custom wheel has been generated <a href={generatedLink}>here</a>!
                </Alert> :
                <Button
                    variant="dark"
                    onClick={generateLink}>
                    Generate Link
                </Button>}
        </div>
    );
}

export default Settings;