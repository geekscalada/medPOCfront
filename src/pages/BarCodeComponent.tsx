import React, { useState, useEffect } from "react";
import { BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";
import { IonButton } from "@ionic/react";
import { useHistory } from "react-router";
import { App as CapApp } from "@capacitor/app";
import "./BarCodeComponent.css";
import { ButtonConfig, ButtonContainer } from "../services/types.services";
import { CustomContainerButtonsComposer } from "../services/customContainerButtonsComposer";
import { mappingRoutes } from "../routes/MainRoutes";

//TODO: barCodeScanning not set the lastScannedBarCode

const BarcodeScannerComponent = () => {
  const history = useHistory();

  const [isTorchOn, setIsTorchOn] = useState(false);
  const [zoomRatio, setZoomRatio] = useState(1);
  const [isScanning, setIsScanning] = useState(false);

  const [lastScannedBarcode, setLastScannedBarcode] = useState<string>("");

  const startScan = async () => {
    console.log("+++++++++++Starting scan");

    document.querySelector("body")?.classList.add("barcode-scanner-active");
    const listener = await BarcodeScanner.addListener(
      "barcodeScanned",
      async (result) => {
        console.log("-------------> setting values");
        setLastScannedBarcode("hola");
        console.log(
          "acabo de setear lastScannedBarcode con: ",
          result.barcode.displayValue
        );
        if (result.barcode.displayValue !== lastScannedBarcode) {
          console.log(
            "result.barcode.displayValue",
            result.barcode.displayValue
          );
          console.log("lastScannedBarcode", lastScannedBarcode);
          console.log("this is one result", result.barcode);
          alert(`Codigo de barras: ${result.barcode.displayValue}`);
        }
      }
    );
    await BarcodeScanner.startScan();
    setIsScanning(true);
  };

  const stopScan = async () => {
    if (isScanning) {
      // Solo intenta detener el escaneo si está activo
      document
        .querySelector("body")
        ?.classList.remove("barcode-scanner-active");
      await BarcodeScanner.removeAllListeners();
      await BarcodeScanner.stopScan();
      setIsScanning(false); // Actualiza el estado para reflejar que el escaneo ha terminado
    }
  };

  const stopAndExit = async () => {
    await stopScan();
    history.push(mappingRoutes.profile.path);
  };

  const toggleTorch = async () => {
    const { enabled } = await BarcodeScanner.isTorchEnabled();
    if (enabled) {
      await BarcodeScanner.disableTorch();
    } else {
      await BarcodeScanner.enableTorch();
    }
    setIsTorchOn(!enabled);
  };

  const backButtonSub = CapApp.addListener("backButton", async (e) => {
    await stopAndExit();
  });

  const unmountComponent = async () => {
    await backButtonSub.remove();
    await stopScan();
  };

  useEffect(() => {
    startScan();

    return () => {
      /**
       * This is not working now
       */
      //unmountComponent();
    };
  }, []);

  const stopScanButton: ButtonConfig = {
    text: "STOP SCAN",
    strong: true,
    disabled: false,
    shape: "round",
    onClick: stopAndExit,
  };

  const searchByFileButton: ButtonConfig = {
    text: "SEARCH BY FILE",
    strong: true,
    disabled: true,
    shape: "round",
  };

  const myButtonContainer: ButtonContainer = {
    buttons: [stopScanButton, searchByFileButton],
    containerButtonStyle: {
      flexDirection: "column",
      justifyContent: "center",
    },
    sizeContainer: {
      width: "300px",
      height: "300px",
    },
  };

  return (
    <>
      <div className="square"></div>
      <CustomContainerButtonsComposer
        className="container-buttons"
        buttonContainer={myButtonContainer}
      ></CustomContainerButtonsComposer>
    </>
  );
};

export default BarcodeScannerComponent;
