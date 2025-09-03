import React, { useState, useEffect } from 'react';
import MyTextInputNoButton from '../components/TextInputNoButton';

function Users() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const [jobType, setJobType] = useState('');
  const [jobOnUse, setJobOnUse] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!jobOnUse) return;
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            content: jobType,
          }) 
        }); 
        const data = await response.json();
        console.log(data);
        setData(data.output);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [jobOnUse]); 

  return (
    <>
      <div>
        <h1>Data from API:</h1>
        <p>{data}</p>
      </div>
      <div>
        <MyTextInputNoButton setTextValue={setJobType} setOnUse={setJobOnUse}/>
      </div>
    </>
  );
}

export default Users;