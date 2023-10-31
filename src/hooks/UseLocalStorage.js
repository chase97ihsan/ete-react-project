import { useState } from "react";

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const jsonValue = JSON.parse(localStorage.getItem(key));
    if (jsonValue !== null) {
      return jsonValue;
    } else {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  });
  const setLocalStorage = (defaultValue) => {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    setValue(defaultValue);
  };
  return [value, setLocalStorage];
}
