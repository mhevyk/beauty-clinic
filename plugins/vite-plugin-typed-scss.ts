import { exec } from "child_process";
import { Plugin } from "vite";

export default function typedScssPlugin(): Plugin {
  return {
    name: "vite-plugin-typed-scss",
    apply: "serve",
    configureServer() {
      const command = `npm run typed-scss-modules -- --watch`;

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return;
        }

        if (stderr) {
          console.error(stderr);
          return;
        }

        console.log(stdout);
      });
    },
  };
}
