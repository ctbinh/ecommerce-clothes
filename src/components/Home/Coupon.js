import React from "react";
import { Avatar } from "@mui/material";

const Coupon = () => {
  return (
    <div className="grid grid-cols-7 gap-2 rounded bg-ticket-background bg-contain bg-center bg-no-repeat mx-auto p-4 ticket">
      <div className="col-span-5 flex-col rounded-r p-2 flex justify-between gap-1">
        <div className="text-black text-lg">Discount 100.000đ</div>
        <div className="rounded border-1 border-[#d3d3d3] p-1 text-center text-md text-white bg-black font-bold">GIFTCODE</div>
        <div className="text-black text-sm">Use in: 2 days</div>
      </div>
      <div className="col-span-2 flex flex-col items-center justify-center rounded-l p-2 text-center text-xl text-black">
        <Avatar sx={{ width: 60, height: 60 }} className="border-2" alt="Remy Sharp" src="https://pbs.twimg.com/profile_images/1564162499888517121/2Pn8AyNV_400x400.png" />
        Adidas
      </div>
    </div>
  );
};

export default Coupon;
