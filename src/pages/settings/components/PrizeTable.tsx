import { useEffect, useState, useRef, useCallback } from "react";
import PropTypes, { InferProps } from 'prop-types';
import Table from 'react-bootstrap/Table';

function PrizeTable({ prizes, setPrizes }: InferProps<typeof PrizeTable.propTypes>) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
            </tbody>
        </Table>
    )
}

PrizeTable.propTypes = {
    prizes: PropTypes.array.isRequired,
    setPrizes: PropTypes.func.isRequired
}

export default PrizeTable;