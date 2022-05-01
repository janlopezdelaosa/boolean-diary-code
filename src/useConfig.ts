import { Storage } from "@capacitor/storage";
import { useQuery } from "react-query";
import { Config, CONFIG_FILE_KEY, DayInMemo, emptyConfig } from "./defs";

const useConfig = () => {
  const refetchInterval = 0;

  console.log("asdf");

  const data = useQuery(
    ["config"],
    async () => {
      const retrievedConfigJson = await Storage.get({ key: CONFIG_FILE_KEY });
      let retrievedConfig: Config;
      if (retrievedConfigJson.value != null) {
        console.log(
          "Found config object in local storage: ",
          JSON.parse(retrievedConfigJson.value)
        );
        retrievedConfig = JSON.parse(retrievedConfigJson.value);
      } else {
        console.log(
          "No config object found in local storage: ",
          console.log({ emptyConfig })
        );
        retrievedConfig = emptyConfig;
      }

      await new Promise((a) => setTimeout(a, 3 * 1000));

      let defaultDayFromConfig: DayInMemo = {};
      retrievedConfig.bools?.forEach((entry) => {
        defaultDayFromConfig[entry.id] = {
          bool: false,
          color: entry.color,
        };
      });

      return { retrievedConfig, defaultDayFromConfig };
    },
    {
      refetchInterval,
    }
  );

  return [data.data?.retrievedConfig, data.data?.defaultDayFromConfig];
};

export default useConfig;
