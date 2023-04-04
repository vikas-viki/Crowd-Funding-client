import React from "react";
import { useStateContext } from "../Context";

const ConnectMetamask = () => {
  const { connect } = useStateContext();
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-gray-200 rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold mb-4">Hey there!</h1>
        <h1 className="text-lg mb-4">
          You need to connect to Metamask to access this content.
        </h1>
        <button
          className="hover:bg-blue-500 tracking-wide bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={connect}
        >
          Connect Metamask
        </button>
      </div>
    </div>
  );
};

export default ConnectMetamask;
