/**
* Function for checking that the scroll has reached the bottom of the screen
* @return {boolean}
*/

import React from "react";

function usePageBottom() {
  const [bottom, setBottom] = React.useState(false);

  React.useEffect(() => {
    function handleScroll() {
      const isBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1;
      setBottom(isBottom);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return bottom;
}

export default usePageBottom;
