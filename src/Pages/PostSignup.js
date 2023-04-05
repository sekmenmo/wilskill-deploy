import React, {useEffect} from 'react'
import Axios from 'axios'
import { useFetch } from './useFetch';

function PostDelSignup() {
    useEffect(() => {
    }, []); 

    const { data: signup } = useFetch(`http://localhost:3001/signups/getsignup/3/usersf`)

    const upload = () => {
        
        Axios.post(`http://localhost:3001/signups/addsignup`,
        {
            tripID: 3,
            namePronouns: 'Sample User (He/Him)',
            email: 'sample.f.user@vanderbilt.edu',
            vunetID: 'usersf',
            phoneNumber: '123-456-789',
            signupTime: '2023-02-23 21:37:17',
            earliestDepartTime: '5:00PM',    
            allergiesDietary: 'dust and children',
            missingItems: 'everything',
            disclaimerAck: 0, 
            commentsQs: 'so not excited'
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

    const del = () => {
        Axios.delete(`http://localhost:3001/signups/deletesignup/3/usersf`)
        .then(async (res) => {
            if (res) {
              console.log(res);
            }
        })
        .catch((error) => {
            console.log(error);
        });
        console.log('Delete completed')
    }
    
    return (
        <div className='data'>
            <button variant='primary' type='button' onClick={upload}> Post Signup button </button>
            <p/>
            <button variant='primary' type='button' onClick={del}> Delete Signup button </button>
            <div> Signup Result: {signup.map((indivSU) => <p key='signup'>TripID: {indivSU.tripID}, VUNetID: {indivSU.vunet_ID} </p>)}</div>
        </div>
    )
}
export default PostDelSignup;
