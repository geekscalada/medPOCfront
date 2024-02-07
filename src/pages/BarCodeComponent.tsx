import React, { useState, useEffect } from "react";
import {
  BarcodeScanner,
  BarcodeFormat,
} from "@capacitor-mlkit/barcode-scanning";

import "./BarCodeComponent.css";
import { IonButton, IonContent } from "@ionic/react";
import { ButtonConfig, ButtonContainerStyle } from "../services/customModalComposer";

const BarcodeScannerComponent = () => {
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [zoomRatio, setZoomRatio] = useState(1);

  // Iniciar el escaneo de códigos de barras
  const startScan = async () => {
    document.querySelector("body")?.classList.add("barcode-scanner-active");

    const listener = await BarcodeScanner.addListener(
      "barcodeScanned",
      async (result) => {
        console.log(result.barcode);
      }
    );

    await BarcodeScanner.startScan();
  };

  // Detener el escaneo de códigos de barras
  const stopScan = async () => {
    document.querySelector("body")?.classList.remove("barcode-scanner-active");
    await BarcodeScanner.removeAllListeners();
    await BarcodeScanner.stopScan();
  };

  // Manejar el encendido/apagado de la linterna
  const toggleTorch = async () => {
    const { enabled } = await BarcodeScanner.isTorchEnabled();
    if (enabled) {
      await BarcodeScanner.disableTorch();
    } else {
      await BarcodeScanner.enableTorch();
    }
    setIsTorchOn(!enabled);
  };

  // Ajustar el zoom
  // const handleSetZoomRatio = async (ratio) => {
  //   await BarcodeScanner.setZoomRatio({ zoomRatio: ratio });
  //   setZoomRatio(ratio);
  // };

  // Efectos para manejar el ciclo de vida del componente
  useEffect(() => {
    // Opciones de configuración o inicialización

    return () => {
      // Limpieza al desmontar el componente
      stopScan();
    };
  }, []);

  const buttonContainerStyle: ButtonContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    flex: "0.5",
    justifyContent: "center",
  };

 const myButtonConfig : ButtonConfig = {
  color : "primary",
  text: "boton1"

 }

  
 }

  return (
    // <div className="hola">
    //   <IonButton onClick={startScan}>Start Scan</IonButton>
    //   <IonButton onClick={stopScan}>Stop Scan</IonButton>

    //   <div>
    //     {/* <label>
    //       Zoom Ratio:
    //       <input type="range" min="1" max="10" value={zoomRatio} onChange={(e) => handleSetZoomRatio(e.target.value)} />
    //     </label> */}
    //   </div>
    // </div>

    <div className="container-scanner">
      <IonButton onClick={startScan}>Start Scan</IonButton>
      <IonButton onClick={stopScan} className="overwritte-hidden">
        Stop Scan
      </IonButton>
      <div className="square"></div>
      <IonContent>
      <div style={buttonContainerStyle}>{renderButtons()}</div>
      </IonContent>

      {/* Los botones y otros controles como antes */}
    </div>
  );
};

export default BarcodeScannerComponent;
