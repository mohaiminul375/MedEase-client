import React from "react";
import AddService from "../../Components/Shared/AddService";
import AllServices from "../../Components/AllServices";

const Home = () => {
  // react hook form

  return (
    <section className="mt-20">
      <AddService></AddService>
      <AllServices></AllServices>
    </section>
  );
};

export default Home;
