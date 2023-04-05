import React, { useState, useEffect } from "react";
import DisplayWithdrawCampaigns from "../components/DisplayWithdrawCampaigns.jsx";
import { useStateContext } from "../Context/index.jsx";

const Withdraw = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <DisplayWithdrawCampaigns
      title="Withdraw Funds"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Withdraw;
