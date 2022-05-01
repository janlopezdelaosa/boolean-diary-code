import { useState } from "react";
import dayjs from "dayjs";
import useConfig from "./useConfig";
import useStoredDay from "./useLocalStorage";
import { Storage } from "@capacitor/storage";
import { BoolDColorsDict, Config, DayInMemo, DayInStorage } from "./defs";
import { Box } from "./Box";
import { useQueryClient } from "react-query";

// type DataViewerProps = {
//   // emptyDay: DayInMemo;
// };

const DataViewer = () => {
  const [currentDay, setCurrentDay] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );
  // const [isStorageDataLoaded, setIsStorageDataLoaded] = useState(false);
  // const [storagedData, setStoragedData] = useState<DayInMemo>({});

  const [configs, defaultDays] = useConfig();
  const [dayStoredData] = useStoredDay(currentDay);
  const queryClient = useQueryClient();

  // console.log({ dayStoredData });

  if (!configs || !defaultDays || !dayStoredData) return null;
  const config = configs as Config;
  const defaultDay = defaultDays as DayInMemo;

  if (!Object.keys(dayStoredData).length) return null;

  let isSameFormat = true;
  let differentKeys: string[] = [];
  Object.keys(dayStoredData).forEach((key) => {
    const isDayKeyIncludedInDefaultDay = Object.keys(defaultDay).includes(key);
    if (!isDayKeyIncludedInDefaultDay) {
      differentKeys = [...differentKeys, key];
    }
    isSameFormat = isSameFormat && isDayKeyIncludedInDefaultDay;
  });

  console.log({ isSameFormat, dayStoredData, defaultDay });

  // useEffect(() => {
  //   setIsStorageDataLoaded(false);
  //   const loadCurrentDayStoragedData = async () => {
  //     const retrievedData = await Storage.get({ key: currentDay });
  //     if (retrievedData.value != null) {
  //       setStoragedData(JSON.parse(retrievedData.value));
  //     } else {
  //       setStoragedData({});
  //     }
  //     setIsStorageDataLoaded(true);
  //   };

  //   loadCurrentDayStoragedData();
  // }, [currentDay]);

  // const [isEditable, setIsEditable] = useState(false);

  // useEffect(() => {
  //   if (!isStorageDataLoaded) return;
  //   if (!Object.keys(emptyDay).length) return;

  //   let isSameFormat = true;
  //   Object.keys(storagedData).forEach((key) => {
  //     isSameFormat = isSameFormat && Object.keys(emptyDay).includes(key);
  //   });

  //   console.log({ isSameFormat });

  //   setIsEditable(isSameFormat);
  // }, [storagedData, emptyDay]);

  // useEffect(() => {
  //   console.log("Data changed to ", { data });
  //   const saveCurrentDayData = async () => {
  //     let dayFromData: DayInStorage = {};
  //     Object.keys(data).map((key) => {
  //       dayFromData[key] = data[key].bool;
  //     });
  //     await Storage.set({
  //       key: currentDay,
  //       value: JSON.stringify(dayFromData),
  //     });
  //   };

  //   saveCurrentDayData();
  // }, [data]);

  const setData = async (data: DayInMemo) => {
    let dayFromData: DayInStorage = {};
    Object.keys(data).map((key) => {
      dayFromData[key] = data[key].bool;
    });
    await Storage.set({
      key: currentDay,
      value: JSON.stringify(dayFromData),
    });
    queryClient.invalidateQueries(["storedDay", currentDay]);
  };

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="w-full flex justify-evenly">
            <div>{dayjs(currentDay).format("D-MM-YYYY, dddd")}</div>
            <button onClick={() => setCurrentDay(dayjs().format("YYYY-MM-DD"))}>
              Today
            </button>
          </div>

          <div className="pt-8 flex justify-evenly">
            <button
              className="pr-4 font-bold"
              onClick={() =>
                setCurrentDay(
                  dayjs(currentDay).subtract(1, "day").format("YYYY-MM-DD")
                )
              }
            >
              {"<"}
            </button>
            {Object.keys(dayStoredData).map((key) => {
              const colorName = dayStoredData[key].color;
              const colorTwClass = BoolDColorsDict[colorName].twValue;
              const boolValue = dayStoredData[key].bool;
              console.log(
                "KEY: " + key + " - " + colorTwClass + " - " + boolValue
              );
              return (
                <Box
                  key={`${key}-${currentDay}`}
                  f={key}
                  color={colorTwClass}
                  isDone={boolValue}
                  isEditable={isSameFormat}
                  toggle={() =>
                    setData({
                      ...dayStoredData,
                      [`${key}`]: { color: colorName, bool: !boolValue },
                    })
                  }
                />
              );
            })}

            <button
              className="pl-4 font-bold"
              onClick={() =>
                setCurrentDay(
                  dayjs(currentDay).add(1, "day").format("YYYY-MM-DD")
                )
              }
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
      {!isSameFormat && (
        <div className="flex flex-col justify-center text-center mt-8 text-sm text-gray-300">
          <p>Can't edit data, format is different from current one</p>
          <p>These aren't in settings anymore: {differentKeys}</p>
        </div>
      )}
    </>
  );
};

export default DataViewer;
