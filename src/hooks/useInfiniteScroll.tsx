import { useEffect, useState } from "react";

export const useInfiniteScroll = () => {
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect(() => {
    const scrollHandler = (e: Event) => {
      const target = e.target;
      if (!(target instanceof Document)) return;

      const scrollPosition =
        target.documentElement.scrollHeight -
        (target.documentElement.scrollTop + window.innerHeight);

      if (scrollPosition < 100) {
        setFetching(true);
      }
    };

    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return { fetching, setFetching };
};
