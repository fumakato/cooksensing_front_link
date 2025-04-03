import React from "react";
import axios from "axios";

const MyComponent = () => {
  const handleClick = () => {
    const username = "kajilab";
    const password = "fN4#Xfh4nNa$3T@mhPlv";
    const token = Buffer.from(`${username}:${password}`, "utf8").toString(
      "base64"
    );

    const url = "https://minio-api.kajilab.dev";

    const headers = {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/json",
    };

    // axios
    //   .post(
    //     `${url}/api/object/list`,
    //     {
    //       bucket: "test",
    //       prefix: "root/",
    //     },
    //     { headers }
    //   )
    //   .then((response) => {
    //     console.log("Success:", response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });

    axios
      .get(`${url}/api/bucket/list`, { headers })
      .then((response) => {
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //   return (
  //     <div>
  //       <button onClick={handleClick}>Send POST Request</button>
  //     </div>
  //   );
  return (
    <div>
      <button onClick={handleClick}>Send GET Request</button>
    </div>
  );
};

export default MyComponent;
