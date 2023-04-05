import React, { useState, useEffect } from "react";
import DisplayWithdrawCampaigns from "../components/DisplayWithdrawCampaigns.jsx";
import { useStateContext } from "../Context/index.jsx";
import DisplayRefundCampaigns from "../components/DisplayRefundCampaigns.jsx";

const Refund = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { getUserDonatedCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserDonatedCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <DisplayRefundCampaigns
      title="Your Donations"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Refund;
