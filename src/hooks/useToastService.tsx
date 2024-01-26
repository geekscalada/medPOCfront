import { useIonToast } from "@ionic/react";

type ToastPosition = "top" | "bottom" | "middle";

const useToastService = () => {
  const [present] = useIonToast();

  const presentToast = (
    message: string,
    duration: number,
    position: ToastPosition,
    color: string
  ) => present({ message, duration, position, color });

  const standardErrorToast = (message: string) => {
    presentToast(message, 1500, "middle", "danger");
  };

  const standardSuccessToast = (message: string) => {
    presentToast(message, 1500, "middle", "primary");
  };

  return { presentToast, standardErrorToast };
};

export default useToastService;
