import React, { useContext, createContext, useState } from "react";
import { ethers } from "ethers";

const StateContext = createContext();

const ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "target",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "image",
        type: "string",
      },
    ],
    name: "CampaignCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "_title",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_target",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_image",
        type: "string",
      },
    ],
    name: "createCampaign",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_agree",
        type: "bool",
      },
    ],
    name: "donateToCampaign",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "donator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "agreed",
        type: "bool",
      },
    ],
    name: "DonationMade",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "refund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "donator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RefundIssued",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "withdrawFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "withdrawn",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "campaigns",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "target",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "AmountCollected",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "image",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCampaigns",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "target",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "AmountCollected",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "image",
            type: "string",
          },
          {
            internalType: "address[]",
            name: "donators",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "donations",
            type: "uint256[]",
          },
          {
            internalType: "bool[]",
            name: "agree",
            type: "bool[]",
          },
        ],
        internalType: "struct CrowdFunding.Campaign[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getDonators",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numberOfCampaigns",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const Caddress = "0xDa106788f889dA588203a54B0B6356A291512255";

export const StateContextProvider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [contract, setContract] = useState({});
  const [campaigns, setCampaigns] = useState([]);

  const connect = async () => {
    // Check if the browser has MetaMask installed
    if (typeof window.ethereum === "undefined") {
      alert("Please install MetaMask first.");
      return;
    }

    // Request access to the user's MetaMask account - directly.
    // const provider = await window.ethereum.request({ method: 'eth_requestAccounts' });

    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts");

    const signer = await provider.getSigner();

    setAddress(signer.address);

    setContract(new ethers.Contract(Caddress, ABI, signer));
  };

  const publishCampaign = async (form) => {
    const userCampaign = await getUserCampaigns();
    if (userCampaign.length <= 0) {
      try {
        await contract.createCampaign(
          address, // owner
          form.title, // title
          form.description, // description
          form.target,
          new Date(form.deadline).getTime(), // deadline,
          form.image
        );
      } catch (error) {
        alert(error.message.split('"')[1]);
      }
    } else {
      alert("Sorry, only one campaign can be created by an user");
      return;
    }
  };

  const getSpecificCampaign = async (_title) => {
    const campaigns = await contract.getCampaigns();

    const parsedCampaigns = campaigns.map((campaign, i) => {
      const target = campaign.target
        ? ethers.formatEther(campaign.target)
        : null;
      const amountCollected = campaign.AmountCollected
        ? ethers.formatEther(campaign.AmountCollected)
        : null;

      return {
        owner: campaign.owner,
        title: campaign.title.trim(),
        description: campaign.description,
        target: target,
        deadline: Number(campaign.deadline),
        amountCollected: amountCollected,
        image: campaign.image,
        pId: i,
      };
    });
    const lowercaseTitle = _title.toLowerCase();
    const arr = parsedCampaigns.filter((e) => {
      return e.title.toLowerCase().includes(lowercaseTitle);
    });
    setCampaigns(arr);
  };

  const getCampaigns = async () => {
    const campaigns = await contract.getCampaigns();

    const parsedCampaings = campaigns.map((campaign, i) => {
      const target = campaign.target
        ? ethers.formatEther(campaign.target)
        : null;
      const amountCollected = campaign.AmountCollected
        ? ethers.formatEther(campaign.AmountCollected)
        : null;

      return {
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: target,
        deadline: Number(campaign.deadline),
        amountCollected: amountCollected,
        image: campaign.image,
        pId: i,
      };
    });
    return parsedCampaings;
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );

    return filteredCampaigns;
  };

  const donate = async (pId, amount) => {
    console.log(pId, amount);
    var data;
    try {
      // Convert the amount from Ether to Wei
      const amountWei = ethers.parseEther(amount);

      data = await contract.donateToCampaign(pId, true, {
        value: amountWei,
      });
    } catch (error) {
      alert(error.message.split('"')[1]);
      return;
    }

    return data;
  };

  const getDonations = async (pId) => {
    const donations = await contract.getDonators(pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      const weiToEth = ethers.formatEther(String(donations[1][i]));
      parsedDonations.push({
        donator: donations[0][i],
        donation: weiToEth,
      });
    }

    return parsedDonations;
  };

  const withdrawFunds = async (_id) => {
    try {
      await contract.withdrawFunds(_id);
    } catch (error) {
      alert(error.message.split('"')[1]);
    }
  };

  const refund = async (_id) => {
    try {
      await contract.refund(_id);
    } catch (error) {
      alert(error.message.split('"')[1]);
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        getSpecificCampaign,
        campaigns,
        setCampaigns,
        setAddress,
        withdrawFunds,
        refund,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
