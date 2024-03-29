import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "alergenos",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  plugins: {
    GoogleAuth: {
      scopes: ["profile", "email"],
      serverClientId:
        "1097625209618-uikanbbdb42pc3h221vev6qpb6vdtr09.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
