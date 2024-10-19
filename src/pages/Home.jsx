import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomButton,
  Loading,
  TextInput,
  TopBar,
} from "../components";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import { BsFiletypeGif, BsPersonFillAdd } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { BiImages, BiSolidVideo } from "react-icons/bi";
import {
  apiRequest,
  fetchPosts,
} from "../utils";
import { UserLogin } from "../redux/userSlice";

const Home = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { user, edit } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  const [friendRequest, setFriendRequest] = useState([]);
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [file, setFile] = useState(null);
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchPost = async () => {
    await fetchPosts(user.token, dispatch);
    setLoading(false);
  };
  return (
    <>
      <div className="w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor h-screen overflow-hidden">
        <TopBar />
        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
          {/* LEFT */}
          <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">
          </div>

          {/* CENTER */}
          <div className="flex-1 h-full px-2 flex flex-col gap-6 overflow-y-auto">
            <form
              className="bg-primary px-4 rounded-xl"
            >
              <div className="w-full flex items-center gap-4 pt-4 pb-6">
                <img
                  src={user?.profileUrl ?? NoProfile}
                  alt="User"
                  // className="w-14 h-14 rounded-full object-cover mt-3"
                  className="sm:w-14 sm:h-12 w-10 h-8 object-cover rounded-full mt-3"
                />
                <TextInput
                  // styles="w-full rounded-full py-4"
                  styles="w-full rounded-full md:py-4 py-2"
                  placeholder="What's on your mind..."
                  name="description"
                  register={register("description", {
                    required: "Write something about your post",
                  })}
                  error={errors.description ? errors.description.message : ""}
                />
              </div>
              {errMsg?.message && (
                <span
                  role="alert"
                  className={`text-sm $(
                errMsg?.status === "failed" ? "text-[#f64949fe]" : "text-[#2ba150fe]") mt-0.5`}
                >
                  {errMsg.Msg?.message}
                </span>
              )}
              <div className="flex items-center justify-between py-4 border-t border-[#66666645]">
                <label
                  htmlFor="imgUpload"
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                >
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id="imgUpload"
                    data-max-size="5120"
                    accept=".jpg, .png, .jpeg"
                  />
                  <BiImages />
                  <span className="hidden md:flex">Image</span>
                  <span className="md:hidden flex text-sm">Img</span>
                </label>
                <label
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                  htmlFor="vgifUpload"
                >
                  <input
                    type="file"
                    data-max-size="5120"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id="vgifUpload"
                    accept=".mp4, .wav"
                  />
                  <BiSolidVideo />
                  <span className="hidden md:flex">Video</span>
                  <span className="md:hidden flex text-sm">Vid</span>
                </label>

                <label
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                  htmlFor="vgifUpload"
                >
                  <input
                    type="file"
                    data-max-size="5120"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id="vgifUpload"
                    accept=".gif"
                  />
                  <BsFiletypeGif className="" />
                  <span className="hidden md:flex">Gif</span>
                  <span className="md:hidden flex text-sm">Gif</span>
                </label>
                <div>
                  {posting ? (
                    <Loading />
                  ) : (
                    <CustomButton
                      type="submit"
                      title="Post"
                      containerStyles="bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm"
                    />
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* RIGHT */}
          <div className="hidden w-1/4 h-full lg:flex flex-col gap-6 overflow-y-auto">
            {/* FRIEND REQUEST */}
            <div className="w-full bg-primary shadow-sm rounded-xl px-6 py-5">
              <div className="flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]">
              </div>
              <div className="w-full flex flex-col gap-4 pt-4">
              </div>
            </div>
            {/* SUGGESTED FRIENDS */}
            <div className="w-full bg-primary shadow-sm rounded-xl px-5 py-5">
              <div className="pb-2 flex items-center justify-between text-lg text-ascent-1 border-b border-[#66666645]">
                <span className="">Friend Suggestions</span>
              </div>
              <div className="w-full flex flex-col gap-4 pt-4">
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
