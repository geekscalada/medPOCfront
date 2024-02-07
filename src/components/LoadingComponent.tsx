import { IonLoading } from "@ionic/react";

interface LoadingComponentProps {
  isOpen: boolean;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({ isOpen }) => {
  return <IonLoading isOpen={isOpen} message="Loading..." />;
};

export default LoadingComponent;
