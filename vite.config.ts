import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { meteor } from "meteor-vite/plugin";
import localZodernRelay from "./vite-plugins/local-zodern-relay";

export default defineConfig({
    plugins: [
        react({
            jsxRuntime: "classic",
        }),
        meteor({
            clientEntry: "client/main.tsx",
            stubValidation: {
                warnOnly: true,
                ignorePackages: ["ostrio:files"],
            },
            meteorStubs: {
                debug: false,
            },
            enableExperimentalFeatures: true,
        }),
        localZodernRelay({
            directories: {
                /**
                 * Path to directories where your zodern:relay methods live
                 * @default ['./imports/methods']
                 */
                methods: ["./imports/methods"],
            },
        }),
    ],
});
