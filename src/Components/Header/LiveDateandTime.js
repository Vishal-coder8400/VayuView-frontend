import React, { useState, useEffect } from "react";

function LiveDateTime() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      <p style={{marginRight: 12, fontSize: 16}}>
        {dateTime.toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        {dateTime.toLocaleTimeString()}
      </p>
    </div>
  );
}

export default LiveDateTime;
