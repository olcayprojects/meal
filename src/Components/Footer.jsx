import React, { useState, useEffect } from "react";

const Footer = () => {
  const url = "https://api.quotable.io/random?tags=technology";

  const [quote, setQuote] = useState("");

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setQuote(data);
      });
  }, [url]);
  return (
    <div
      className="footer text-center p-3"
      style={{ backgroundColor: "black" }}
    >
      <br />
      <hr />
      {/* {new Date(new Date().getTime()).toUTCString()} */}

      <p className="text-center">{quote.content}</p>
      <p className="text-center">{quote.author}</p>
    </div>
  );
};

export default Footer;
