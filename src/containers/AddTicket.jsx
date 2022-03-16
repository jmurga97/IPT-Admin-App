import React from 'react';
import { useParams} from 'react-router-dom';
import AppContext from '../context/AppContext';

const AddTicket = () => {
    const {id} = useParams()

    return (
        <div>{id}</div>
     );
}

export default AddTicket;