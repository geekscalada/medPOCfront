export interface ButtonConfig {
  color?: string;
  disabled?: boolean;
  expand?: "full" | "block";
  fill?: "clear" | "outline" | "solid" | "default";
  href?: string;
  mode?: "ios" | "md";
  rel?: string;
  routerDirection?: "forward" | "back" | "root";
  shape?: "round";
  size?: "small" | "default" | "large";
  strong?: boolean;
  type?: "submit" | "reset" | "button";
  download?: string;
  target?: "_self" | "_blank" | "_parent" | "_top";
  onClick?: (event: React.MouseEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  callBackButtonCustomFunction?: () => void;
  text: string; // propiedad personalizada que no está en la API de Ionic
}

export type FlexStyle = {
  flexDirection: "column" | "row";
  justifyContent?: "center" | "flex-start" | "flex-end" | "space-between";
};

export type ButtonContainerStyle = FlexStyle & {
  display: string;
  gap: string;
  flex: string;
  width?: string;
  height?: string;
};

export type ModalSize = {
  width: string;
  height: string;
};

export type ModalComposer = {
  titleModal: string;
  headerModal?: React.ReactNode;
  content?: React.ReactNode;
  buttonContainer: ButtonContainer;
  modalSize: ModalSize;
  canDismissModal?: any;
  closeButtonHeader?: boolean;
};

export type ButtonContainer = {
  buttons?: ButtonConfig[];
  containerButtonStyle?: FlexStyle;
  sizeContainer?: {
    width?: string;
    height?: string;
  };
};
