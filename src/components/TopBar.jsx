import React from "react";
import { BsFillChatQuoteFill, BsMoon, BsSunFill, BsSun } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { useForm } from "react-hook-form";
import { IoMdNotificationsOutline } from "react-icons/io";
import { SetTheme } from "../redux/theme";
import { Logout } from "../redux/userSlice";
import { fetchPosts } from "../utils";

const TopBar = () => {
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const handleTheme = () => {
    const themeValue = theme === "light" ? "dark" : "light";

    dispatch(SetTheme(themeValue));
  };

  const handleSearch = async (data) => {
    await fetchPosts(user.token, dispatch, "", data);
  };

  return (
    <div className="topbar w-full flex items-center justify-between py-3 md:py-6 px-4 bg-primary rounded-xl">
      <Link to="/" className="flex gap-2 items-center mt-2">
        <div className="p-1 mb-[4px] bg-[#065ad8] rounded-lg text-white shadow-[3px_3px_2px_0_rgb(6_90_216/_60%)]">
          <BsFillChatQuoteFill className="" size={18} />
        </div>
        <span
          className="text-2xl text-[#065ad8] [text-shadow:_3px_3px_2px_rgb(6_90_216/_60%)]"
          font-semibold="true"
        >
          S͛OͦCͨIͥAͣLiͥzeͤ
        </span>
      </Link>
      <form
        onSubmit={handleSubmit(handleSearch)}
        className="hidden md:flex items-center justify-center"
      >
        <TextInput
          placeholder="Search..."
          styles="w-[18rem] lg:w-[38rem] rounded-l-full py-3"
          register={register("search")}
        />
        <CustomButton
          title="Search"
          type="submit"
          containerStyles="bg-[#0444a4] text-white px-6 py-2.5 mt-2 rounded-r-full border border-[#66666690] "
        />
      </form>
      {/* ICONS */}
      <div className="flex gap-4 items-center text-ascent-1 text-md md:text-xl">
        <button onClick={() => handleTheme()} className="">
          {theme === "light" ? (
            <BsMoon size={16} />
          ) : (
            <BsSun color="#FFFF00ab" />
          )}
        </button>
        <div className="hidden lg:flex">
          <IoMdNotificationsOutline />
        </div>
        <div>
          <CustomButton
            onClick={() => dispatch(Logout())}
            title="Log Out"
            containerStyles="text-sm text-ascent-1 px-2 md:px-4 py-1 md:py-1 border border-[#065ad8] rounded-full shadow-md shadow-[3px_3px_2px_0_rgb(6_90_216/_40%)] active:shadow-none"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
