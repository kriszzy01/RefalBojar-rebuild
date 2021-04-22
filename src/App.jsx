import React, { useEffect, useState } from "react";
import { Header } from "./blocks/Header";
import { Showcase } from "./blocks/Showcase";
import { Loader } from "./components/Loader";

export const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, [loading]);

  return (
    <>
      <Loader />
      <Header />
      <Showcase />
    </>
  );
};
