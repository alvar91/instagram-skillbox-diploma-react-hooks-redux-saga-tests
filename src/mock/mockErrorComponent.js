import React from "react";

function MockErrorComponent() {
  React.useEffect(() => {
    throw new Error("Mock error");
  }, []);

  return <h2>Mock error</h2>;
}

export default MockErrorComponent;
