import React, {useEffect} from 'react'
import Axios from 'axios'

function PostCall() {
    useEffect(() => {
    }, []); 


    const upload = () => {
        Axios.post(`http://localhost:3001/api/addtrip`,
        {
            tripName: 'Skydiving',
            tripType: 'Death Defying Experience',
            location: 'NY',
            leaveDate: '2023-10-22',
            returnDate: '2023-10-24',
            description: '',
        })
        .then(async (res) => {
            if (res) {
                console.log(res);
            }
        }).catch((error) => {
            console.log(error);
        });
        console.log('Post completed')
    };
    
    return (
        <div className='data'>
            <button variant='primary' type='button' onClick={upload}> Post button </button>
        </div>
    )
}
export default PostCall;
