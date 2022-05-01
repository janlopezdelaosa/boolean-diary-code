import { useState } from "react";
import { useQueryClient } from "react-query";
import CloseIcon from "./CloseIcon";
import { Storage } from "@capacitor/storage";
import {
  BooleanEntry,
  Config,
  MAX_DIARY_ENTRIES,
  BoolDColorsDict,
  CONFIG_FILE_KEY,
  BoolDColors,
} from "./defs";
import useConfig from "./useConfig";

// type SettingsProps = {
//   config: Config;
//   setConfig: React.Dispatch<React.SetStateAction<Config>>;
// };

const Settings = () => {
  const [configs] = useConfig();

  const config = configs as Config;

  const [selectedEntry, setSelectedEntry] = useState<BooleanEntry | null>(null);

  return (
    <>
      {selectedEntry && (
        <Modal
          {...selectedEntry}
          config={config}
          setSelectedEntry={setSelectedEntry}
        />
      )}
      <ul className="flex flex-col gap-8">
        {config?.bools.map((entry) => (
          <Entry
            key={entry.id}
            config={config}
            {...entry}
            setSelectedEntry={setSelectedEntry}
          />
        ))}
      </ul>
      <>
        {config.bools.length < MAX_DIARY_ENTRIES ? (
          <EmptyEntry
            config={config}
            id=""
            label="New category"
            color="white"
            setSelectedEntry={setSelectedEntry}
          />
        ) : (
          <p>No more entries</p>
        )}
      </>
    </>
  );
};

type EntryProps = BooleanEntry & {
  config: Config;

  setSelectedEntry: React.Dispatch<React.SetStateAction<BooleanEntry | null>>;
};

const Entry = ({ id, label, color, config, setSelectedEntry }: EntryProps) => {
  const queryClient = useQueryClient();

  const setConfig = async (config: Config) => {
    await Storage.set({
      key: CONFIG_FILE_KEY,
      value: JSON.stringify(config),
    });
    queryClient.invalidateQueries(["config"]);
  };

  return (
    <li className="w-full flex items-center">
      <button
        className="w-full flex justify-start items-center"
        onClick={() => setSelectedEntry({ id, label, color })}
      >
        <div
          className={`ml-8 w-8 h-8 border-2 border-black rounded-lg p-2 bg-${BoolDColorsDict[color]?.twValue}`}
        ></div>
        <div className="ml-14 font-bold text-xl">{id}</div>
        <div className="ml-24">{label}</div>
      </button>
      <button
        className="w-full flex justify-start items-center"
        onClick={() => {
          const removedEntry = config.bools.filter((b) => b.id !== id);
          console.log({ removedEntry });
          setConfig({
            bools: [...removedEntry],
          });
        }}
      >
        <CloseIcon className="ml-14" color={"black"} />
      </button>
    </li>
  );
};

type EmptyEntryProps = BooleanEntry & {
  config: Config;

  setSelectedEntry: React.Dispatch<React.SetStateAction<BooleanEntry | null>>;
};

const EmptyEntry = ({
  id,
  label,
  color,
  config,
  setSelectedEntry,
}: EmptyEntryProps) => {
  const queryClient = useQueryClient();

  const addToConfig = async (config: Config) => {
    await Storage.set({
      key: CONFIG_FILE_KEY,
      value: JSON.stringify(config),
    });
    queryClient.invalidateQueries(["config"]);
  };

  return (
    <li className="mt-8 w-full flex items-center">
      <button
        className="w-full flex justify-start items-center"
        onClick={() => setSelectedEntry({ id, label, color })}
      >
        <div
          className={`ml-8 w-8 h-8 border-2 border-black rounded-lg p-2 bg-${BoolDColorsDict[color]?.twValue}`}
        ></div>
        <div className="ml-14 font-bold text-xl">{id}</div>
        <div className="ml-24">{label}</div>
      </button>
    </li>
  );
};

const NoMoreEntries = () => <p>No more entries</p>;

type ModalProps = BooleanEntry & {
  config: Config;
  setSelectedEntry: React.Dispatch<React.SetStateAction<BooleanEntry | null>>;
};

const Modal = ({ id, label, color, config, setSelectedEntry }: ModalProps) => {
  const queryClient = useQueryClient();

  const setConfig = async (config: Config) => {
    await Storage.set({
      key: CONFIG_FILE_KEY,
      value: JSON.stringify(config),
    });
    queryClient.invalidateQueries(["config"]);
  };

  const [c, setC] = useState(color);
  const [i, setI] = useState(id);
  const [l, setL] = useState(label);

  return (
    <div className="absolute inset-0 bg-gray-600 bg-opacity-95 h-full flex flex-col justify-center">
      <div className="mx-8 px-4 py-12 bg-white flex flex-col gap-10 relative">
        <button
          className="absolute w-full flex flex-row-reverse top-0 right-0 mt-4 mr-4"
          onClick={() => setSelectedEntry(null)}
        >
          <CloseIcon color="black" />
        </button>
        <div className="ml-10 w-full flex items-center">
          <span className="text-lg font-bold">Color:</span>
          <input
            className="ml-8 p-1 border-2 border-black"
            list="colors"
            onChange={(e) => {
              const removedEntry = config.bools.filter((b) => b.id !== id);
              console.log({ removedEntry });
              setConfig({
                bools: [
                  ...removedEntry,
                  { id, label, color: e.target.value as BoolDColors },
                ],
              });
              setC(e.target.value as BoolDColors);
            }}
            value={c}
          />
          <datalist id="colors">
            {Object.keys(BoolDColorsDict).map((k) => (
              <option key={k}>{k}</option>
            ))}
          </datalist>
        </div>

        <div className="ml-10 w-full flex items-center">
          <span className="text-lg font-bold">Id:</span>
          <input
            className="ml-8 p-1 border-2 border-black"
            type="text"
            onChange={(e) => {
              const removedEntry = config.bools.filter((b) => b.id !== id);
              console.log({ removedEntry });
              setConfig({
                bools: [...removedEntry, { id: e.target.value, label, color }],
              });
              setI(e.target.value);
            }}
            value={i}
          />
        </div>

        <div className="ml-10 w-full flex items-center">
          <span className="text-lg font-bold">Label:</span>
          <input
            className="ml-8 p-1 border-2 border-black"
            type="text"
            onChange={(e) => {
              const removedEntry = config.bools.filter((b) => b.id !== id);
              console.log({ removedEntry });
              setConfig({
                bools: [...removedEntry, { id, label: e.target.value, color }],
              });
              setL(l);
            }}
            value={l}
          />
        </div>
      </div>
    </div>
  );
};
export default Settings;
