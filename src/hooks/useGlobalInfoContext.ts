import { useState } from "react";

const useGlobalInfoContext = () => {
  const [headerTitle, setHeaderTitle] = useState<string>("");

  return {
    headerTitle,
    setHeaderTitle,
  };
};

export default useGlobalInfoContext;
