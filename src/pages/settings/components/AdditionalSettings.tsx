import PropTypes, { InferProps } from 'prop-types';
import Form from 'react-bootstrap/Form';

function AdditionalSettings({ additionalProps, setAdditionalProps, prizes }: InferProps<typeof AdditionalSettings.propTypes>) {

    const onEnforceIndexSelectChange = (enforceIndex: number) => {
        setAdditionalProps({ ...additionalProps, enforceIndex });
    }

    return (
        <div className="additional-settings">
            <h3 className="mb-4">Additional Settings</h3>
            <Form.Select onChange={(event) => onEnforceIndexSelectChange(parseInt(event.target.value))}>
                <option>Select to enforce a prize</option>
                {
                    prizes.map((prize, index) =>
                        <option key={index} value={index}>{index + 1} - {prize.text}</option>)
                }
            </Form.Select>
        </div>
    )
}

AdditionalSettings.propTypes = {
    additionalProps: PropTypes.object.isRequired,
    setAdditionalProps: PropTypes.func.isRequired,
    prizes: PropTypes.array.isRequired
}

export default AdditionalSettings;