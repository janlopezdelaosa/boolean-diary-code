import { Storage } from "@capacitor/storage";
import { useQuery } from "react-query";
import { Config, DayInMemo, DayInStorage, emptyConfig } from "./defs";
import useConfig from "./useConfig";

const useStoredDay = (currentDay: string) => {
  const [retrievedConfig, defaultDayFromConfig] = useConfig();

  const refetchInterval = Infinity;

  const data = useQuery(
    ["storedDay", currentDay],
    async () => {
      const retrievedStoredDayJson = await Storage.get({ key: currentDay });
      let retrievedStoredDay: DayInStorage;
      let dayFromStoredDay: DayInMemo = {};

      if (retrievedStoredDayJson.value != null) {
        console.log(
          "Found stored day object in local storage: ",
          JSON.parse(retrievedStoredDayJson.value)
        );
        retrievedStoredDay = JSON.parse(retrievedStoredDayJson.value);

        Object.keys(retrievedStoredDay).map((key) => {
          const config = retrievedConfig as Config;
          const bool = config.bools.find((b) => b.id === key);
          dayFromStoredDay[key] = {
            bool: retrievedStoredDay[key],
            color: bool ? bool.color : "black",
          };
        });
      } else {
        console.log(
          "No stored day object found in local storage: ",
          console.log({ defaultDayFromConfig })
        );
        retrievedStoredDay = {};
        dayFromStoredDay = defaultDayFromConfig as DayInMemo;
      }

      return { dayFromStoredDay };
    },
    {
      refetchInterval,
    }
  );

  return [data.data?.dayFromStoredDay];
};

export default useStoredDay;
