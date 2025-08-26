import React, { useState } from 'react';

function MyJobInput(props) {
    const [inputValue, setInputValue] = useState(''); // Initialize state for the input value

    const handleChange = (event) => {
        setInputValue(event.target.value); // Update state on input change
        props.setJobType(event.target.value);
    };
    return (
    <div>
        <input
            type="text"
            value={inputValue} // Bind the input's value to the state
            onChange={handleChange} // Handle changes with the handleChange function
            placeholder="Enter text here..."
        />
        
    </div>
    );
}

export default MyJobInput;