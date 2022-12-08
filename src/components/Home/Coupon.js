import React from "react";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";

const Coupon = () => {
  return (
    <div className="grid grid-cols-5 gap-1 rounded border bg-[#1AA7FE]">
      <div className="col-span-2 flex flex-col items-center justify-center p-2 text-center text-xl text-white">
        <ConfirmationNumberOutlinedIcon fontSize="large" className="scale-150" />
        Discount 100.000đ
      </div>
      <div className="col-span-3 flex-col bg-[#08283c] p-2">
        <div className="text-center text-white">Promotion code:</div>
        <div className="border border-cyan-500 text-center text-sky-400">GIFTCODE</div>
      </div>
    </div>
  );
};

export default Coupon;
