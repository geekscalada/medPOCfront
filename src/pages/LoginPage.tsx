import React from 'react';

import { useNavigate } from 'react-router-dom';

const MiComponente = () => {
  const navigate = useNavigate();

  const handleTrigger = () => {
    navigate('/ruta-a-la-que-redirigir');
  };

  return (
    <div>
      <button onClick={handleTrigger}>Haz clic para redirigir</button>
    </div>
  );
};

export default MiComponente;