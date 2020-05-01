import { useEffect, useState } from "react";

const useMedia = ({
  queries = {
    "(min-width: 1280px)": 4,
    "(min-width: 1024px)": 3,
    "(min-width: 768px)": 2,
    "(min-width: 640px)": 1,
  },
  defaultValue = 0
} = {}) => {

  const [value, setValue] = useState(defaultValue)

  useEffect(
    () => {
      const
        keys = Object.keys(queries),
        values = Object.values(queries),
        mqls = keys.map(q => window.matchMedia(q)),

        handler = () => {
          const index = mqls.findIndex(mql => mql.matches)
          const next = values[index] ? values[index] : defaultValue
          if (value !== next) {
            setValue(next)
          }
        };

      mqls.forEach(mql => mql.addListener(handler))
      handler()

      return () => mqls.forEach(mql => mql.removeListener(handler));
    },
  );

  return value;
}

export default useMedia
