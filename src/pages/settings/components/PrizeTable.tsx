import { useEffect, useState } from "react";
import { PrizeEdit } from "../../interfaces";
import _ from "lodash";
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';
import PropTypes, { InferProps } from 'prop-types';
import Table from 'react-bootstrap/Table';


function PrizeTable({ prizes, setPrizes }: InferProps<typeof PrizeTable.propTypes>) {

    const [totalProbability, setTotalProbability] = useState(_.sumBy(prizes, 'probability'));

    const onEdit = (index: number, { text, color, probability }: PrizeEdit) => {
        const prize = prizes[index];
        if (text) prize.text = text;
        if (color) prize.color = color;
        if (probability) prize.probability = probability;
        setPrizes([...prizes.slice(0, index), prize, ...prizes.slice(index + 1)]);
    }

    const onDelete = (index: number) => {
        setPrizes([...prizes.slice(0, index), ...prizes.slice(index + 1)]);
    }

    useEffect(() => {
        setTotalProbability(_.sumBy(prizes, 'probability'));
    }, [prizes])

    return (
        <div className="prize-table">
            {totalProbability !== 100 &&
                <Alert variant="danger">
                    Probability doesn't add up to 100%!
                </Alert>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Prize Name</th>
                        <th>Color</th>
                        <th>Probability</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {prizes.map((prize, index) => {
                        return (
                            <tr key={`${prize}-${index}`}>
                                <td>{index + 1}</td>
                                <td>
                                    <Form.Control
                                        value={prize.text}
                                        onChange={(event) => onEdit(index, { text: event.target.value })}
                                    />
                                </td>
                                <td>
                                    <Form.Control type="color"
                                        value={prize.color}
                                        onChange={(event) => onEdit(index, { color: event.target.value })}
                                    />
                                </td>
                                <td>
                                    <Form.Control
                                        type="number"
                                        value={prize.probability}
                                        onChange={(event) => onEdit(index, { probability: parseFloat(event.target.value) })}
                                    />
                                </td>
                                <td>
                                    <div className="prize-table-actions">
                                        <CloseButton onClick={() => onDelete(index)} />
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>

    )
}

PrizeTable.propTypes = {
    prizes: PropTypes.array.isRequired,
    setPrizes: PropTypes.func.isRequired
}

export default PrizeTable;