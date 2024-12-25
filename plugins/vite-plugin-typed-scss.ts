import { exec } from "child_process";
import { CLIOptions } from "typed-scss-modules/dist/lib/core";
import { Plugin } from "vite";

type Config = Omit<Partial<CLIOptions>, "watch"> & {
  globPattern: string;
};

// Using this plugin because version from package.json does not support new version of scss, so throws error for config file. We don't want to hardcode it inside package.json, also we don't have package for vite plugin
export default function typedScssPlugin({
  globPattern,
  ...config
}: Config): Plugin {
  const finalConfig: Partial<CLIOptions> = { ...config, watch: true };

  const options = Object.entries(finalConfig).reduce((acc, [key, value]) => {
    if (value === true) {
      acc += `--${key} `;
    } else if (value) {
      acc += `--${key} ${value} `;
    }

    return acc;
  }, "");

  return {
    name: "vite-plugin-typed-scss",
    apply: "serve",
    configureServer() {
      const command = `typed-scss-modules ${globPattern} ${options}`;
      console.log(`Running ${command}...`);

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return;
        }

        if (stderr && !stderr.includes("DEPRECATION WARNING")) {
          console.error(stderr);
          return;
        }

        console.log(stdout);
      });
    },
  };
}
