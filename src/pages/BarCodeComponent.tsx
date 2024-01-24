import React, { useState } from "react";
import { BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";
import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const BarcodeScannerComponent: React.FC = () => {
  const [barcode, setBarcode] = useState<string>("");

  const checkPermissionsAndScan = async () => {
    // Check if the scanner is supported
    const isSupported = await BarcodeScanner.isSupported();
    if (!isSupported) {
      alert("Scanner not supported on this device");
      return;
    }

    // Request permissions
    const permission = await BarcodeScanner.requestPermissions();
    if (permission.camera !== "granted") {
      alert("Camera permission is required");
      return;
    }

    // Start scanning
    try {
      const result = await BarcodeScanner.scan();
      if (result.barcodes.length > 0) {
        setBarcode(result.barcodes[0].rawValue);
      }
    } catch (error) {
      console.error("Scanning failed", error);
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Search a code</IonTitle>
        </IonToolbar>
      </IonHeader>
      <div>
        <button onClick={checkPermissionsAndScan}>Scan Barcode</button>
        {barcode && <p>Scanned Barcode: {barcode}</p>}
      </div>
    </>
  );
};

export default BarcodeScannerComponent;
