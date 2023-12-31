import { useState } from 'react';

//TODO: check this sintax.
const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  

  return { isModalOpen, openModal, closeModal };
};

export default useModal;
