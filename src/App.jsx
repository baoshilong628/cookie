import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Component from "./components/Component";

/**
 * @returns {Element}
 * @constructor
 */
const App = () => {
  const [fileDocs, setFileDocs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/fileDocs')
      .then(response => {
        setFileDocs(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      {fileDocs.map((fileDoc, index) => (
          <Component key={index} docs={fileDoc.docs}/>
      ))}
    </div>
  );
};

export default App;
