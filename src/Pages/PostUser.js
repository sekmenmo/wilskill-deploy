import React, {useEffect} from 'react';
import Axios from 'axios';
import { useFetch } from './useFetch';

function PostDelUser() {
    useEffect(() => {
    }, []); 

    const { data: user } = useFetch(`http://localhost:3001/users/getuser/ABCDEFGHIJ`)


    const upload = () => {
        
        Axios.post(`http://localhost:3001/users/adduser`,
        {
            firebaseID: 'ABCDEFGHIJ',
            namePronouns: 'Sample User (He/Him)',
            vunetID: 'usersf',
            email: 'sample.f.user@vanderbilt.edu',
            phoneNumber: '123-456-789',
            allergiesDietary: 'dust and children'
        })
        .then(async (res) => {
            if (res) {
                console.log(res);
            }
        }).catch((error) => {
            console.log(error);
        });
        console.log('Post completed');
    };

    const del = () => {
        Axios.delete(`http://localhost:3001/users/deleteuser/ABCDEFGHIJ`)
        .then(async (res) => {
            if (res) {
              console.log(res);
            }
        })
        .catch((error) => {
            console.log(error);
        });
        console.log('Delete completed');
    }
    
    return (
        <div className='data'>
            <button variant='primary' type='button' onClick={upload}> Post User button </button>
            <p/>
            <button variant='primary' type='button' onClick={del}> Delete User button </button>
            <div> User Result: {user.map((user) => <p key='user'>Firebase ID: {user.firebase_ID} </p>)}</div>
        </div>
    )
}
export default PostDelUser;
