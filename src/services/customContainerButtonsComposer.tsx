import { IonButton, IonContent } from "@ionic/react";
import { ButtonContainer, ButtonContainerStyle } from "./types.services";

export interface CustomContainerButtonsProps {
  buttonContainer: ButtonContainer;
  className?: string;
}

export const CustomContainerButtonsComposer: React.FC<
  CustomContainerButtonsProps
> = ({ buttonContainer, className }) => {
  const buttonContainerStyle: ButtonContainerStyle = {
    display: "flex",
    flexDirection:
      buttonContainer.containerButtonStyle?.flexDirection ?? "column",
    gap: "3px",
    flex: "0.5",
    justifyContent:
      buttonContainer.containerButtonStyle?.justifyContent ?? "center",
    width: buttonContainer.sizeContainer?.width,
    height: buttonContainer.sizeContainer?.height,
  };

  const renderButtons = () => {
    if (buttonContainer.buttons) {
      return buttonContainer.buttons.map((buttonConfig, index) => (
        <IonButton key={index} {...buttonConfig}>
          {buttonConfig.text}
        </IonButton>
      ));
    }
  };

  return (
    <div style={buttonContainerStyle} className={className}>
      {renderButtons()}
    </div>
  );
};
