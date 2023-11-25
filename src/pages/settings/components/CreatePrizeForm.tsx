import { useEffect, useState, useRef, useCallback } from "react";
import PropTypes, { InferProps } from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';

function CreatePrizeForm({ prizes, setPrizes }: InferProps<typeof CreatePrizeForm.propTypes>) {

    const [prizeName, setPrizeName] = useState<string>("");
    const [color, setColor] = useState<string>("#000000");
    const [probability, setProbability] = useState<string>("50");
    const handleProbabilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProbability(event.target.value);
    }
    const createNewPrize = () => {
        const newPrize = {
            text: prizeName,
            color,
            probability
        }
        setPrizes([...prizes, newPrize])
    }
    return (
        <Form className="create-prize-form">
            <Row className="mb-3">
                <Col sm={8}>
                    <Form.Label>Prize Name</Form.Label>
                    <Form.Control
                        placeholder="Enter prize name"
                        onChange={(event) => setPrizeName(event.target.value)}
                    />
                </Col>
                <Col sm={4}>
                    <Form.Label>Color</Form.Label>
                    <Form.Control type="color"
                        value={color}
                        onChange={(event) => setColor(event.target.value)}
                    />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col sm={10}>
                    <Form.Label>Probability</Form.Label>
                    <Form.Range
                        value={probability}
                        onChange={handleProbabilityChange}
                    />
                </Col>
                <Col sm={2}>
                    <Form.Label>Value</Form.Label>
                    <InputGroup>
                        <Form.Control
                            placeholder={probability}
                            value={probability}
                            onChange={handleProbabilityChange}
                        />
                        <InputGroup.Text>%</InputGroup.Text>
                    </InputGroup>
                </Col>
            </Row>
            <Button variant="dark" onClick={createNewPrize}>Create</Button>
        </Form>
    )
}

CreatePrizeForm.propTypes = {
    prizes: PropTypes.array.isRequired,
    setPrizes: PropTypes.func.isRequired
}

export default CreatePrizeForm;