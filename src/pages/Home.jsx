import React from "react";

const Home = () => {
  return (
    <ul>
      <li style={{ display: "block" }}>
        <a href="/rooms">Rooms</a>
      </li>
      <li style={{ display: "block" }}>
        <a href="/room-types">Room Types</a>
      </li>
      <li style={{ display: "block" }}>
        <a href="/offers">Offers</a>
      </li>
    </ul>
  );
};

export default Home;
