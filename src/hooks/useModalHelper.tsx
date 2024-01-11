import { useState } from "react";

export interface IModalHelper {
  initialState?: boolean;
}

const useModalHelper = ({ initialState = false }: IModalHelper = {}) => {
  // Inicializamos isModalOpen con el valor de initialState
  const [isModalOpen, setIsModalOpen] = useState<boolean>(initialState);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return { isModalOpen, openModal, closeModal };
};

export default useModalHelper;
