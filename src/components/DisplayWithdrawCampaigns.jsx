import React from "react";
import { tagType } from "../assets";
import { daysLeft } from "../utils";
import { loader } from "../assets";
import { CustomButton } from "./";
import { useStateContext } from "../Context";

const DisplayWithdrawCampaigns = ({ title, isLoading, campaigns }) => {
  const { withdrawFunds } = useStateContext();
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign, i) => {
            return (
              <div
                key={i}
                className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] "
              >
                <img
                  src={campaign.image}
                  alt="fund"
                  className="w-full h-[158px] object-cover rounded-[15px]"
                />

                <div className="flex flex-col p-4">
                  <div className="flex flex-row items-center mb-[18px]">
                    <img
                      src={tagType}
                      alt="tag"
                      className="w-[17px] h-[17px] object-contain"
                    />
                    <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">
                      Education
                    </p>
                  </div>

                  <div className="block">
                    <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
                      {campaign.title}
                    </h3>
                    <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
                      {campaign.description}
                    </p>
                  </div>

                  <div className="flex justify-between flex-wrap mt-[15px] gap-2">
                    <div className="flex flex-col">
                      <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
                        {campaign.amountCollected}
                      </h4>
                      <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
                        Raised of {campaign.target}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
                        {daysLeft(campaign.deadline * 1000)}
                      </h4>
                      <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
                        Days Left
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mb-[10px]">
                  <CustomButton
                    btnType="button"
                    title={"Withdraw Campaign Funds"}
                    styles={"bg-[#8c6dfd]"}
                    handleClick={() => {
                      withdrawFunds(campaign.pId);
                    }}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DisplayWithdrawCampaigns;
