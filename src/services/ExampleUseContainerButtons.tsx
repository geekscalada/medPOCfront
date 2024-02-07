// import React, { useState } from "react";
// import { BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";
// import {
//   IonButtons,
//   IonHeader,
//   IonMenuButton,
//   IonTitle,
//   IonToolbar,
// } from "@ionic/react";
// import { ButtonConfig, ButtonContainer } from "../services/types.services";
// import { CustomContainerButtonsComposer } from "../services/customContainerButtonsComposer";

// const BarcodeScannerComponent: React.FC = () => {
//   const [barcode, setBarcode] = useState<string>("");

//   const checkPermissionsAndScan = async () => {
//     // Check if the scanner is supported
//     const isSupported = await BarcodeScanner.isSupported();
//     if (!isSupported) {
//       alert("Scanner not supported on this device");
//       return;
//     }

//     // Request permissions
//     const permission = await BarcodeScanner.requestPermissions();
//     if (permission.camera !== "granted") {
//       alert("Camera permission is required");
//       return;
//     }

//     // Start scanning
//     try {
//       const result = await BarcodeScanner.scan();
//       if (result.barcodes.length > 0) {
//         setBarcode(result.barcodes[0].rawValue);
//       }
//     } catch (error) {
//       console.error("Scanning failed", error);
//     }
//   };

//   const button1: ButtonConfig = {
//     text: "Button1",
//     strong: true,
//     disabled: false,
//     shape: "round",
//   };

//   const button2: ButtonConfig = {
//     text: "Button2",
//     strong: true,
//     disabled: false,
//     shape: "round",
//   };

//   const myButtonContainer: ButtonContainer = {
//     buttons: [button1, button2],
//     containerButtonStyle: {
//       flexDirection: "column",
//       justifyContent: "center",
//     },
//     sizeContainer: {
//       width: "60px",
//       height: "30px",
//     },
//   };

//   return (
//     <CustomContainerButtonsComposer
//       buttonContainer={myButtonContainer}
//     ></CustomContainerButtonsComposer>
//   );
// };

// export default BarcodeScannerComponent;
