import { useEffect, useState } from "react";
import fetchDummy from "./apis/fetchDummy";
import useInput from "./hooks/useInput";
import useTabs from "./hooks/useTabs";
import useTitle from "./hooks/useTitle";

interface content {
  tab: string;
  content: string;
}

function App() {
  const [value, setValue] = useInput("");
  const [contents, setContents] = useState<content[]>([]);
  const { currentItem, changeItem } = useTabs(1, contents);
  const setTitle = useTitle("Loading...");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDummy();
        setContents(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);
  setTimeout(() => {
    setTitle("Home");
  }, 3000);

  return (
    <>
      <input placeholder="Name" value={value} onChange={setValue} />
      <div>
        {contents.map((item, index) => {
          return (
            <button onClick={() => changeItem(index)} key={index}>
              {item.tab}
            </button>
          );
        })}
        <div>{currentItem?.content}</div>
      </div>
    </>
  );
}

export default App;
