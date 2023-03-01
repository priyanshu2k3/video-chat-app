import React from 'react';

const Homepage = () => {
    return (
        <div className='homepage-container'>
             <div className='input-container'>
                <input type="email" placeholder='enter your email id'/>
                <input type="text"  placeholder='enter room code' />
                <button>Enter room</button>
             </div>
        
        </div>
    );
};

export default Homepage;