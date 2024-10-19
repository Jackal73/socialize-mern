import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import {
  BsBriefcase,
  BsFacebook,
  BsInstagram,
  BsPersonFillAdd,
} from "react-icons/bs";
import { LiaEditSolid } from "react-icons/lia";
import { UpdateProfile } from "../redux/userSlice";
import { CiLocationOn } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import moment from "moment";
import { FaLink } from "react-icons/fa6";
import { sendFriendRequest } from "../utils";

const ProfileCard = ({ user }) => {
  const { user: data, edit } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="w-full bg-primary flex flex-col items-center shadow-sm rounded-xl px-6 py-4">
        <div className="w-full flex items-center justify-between border-b border-[#66666645] pb-5">
          <Link to={"/profile/" + user?._id} className="flex gap-2">
            <img
              src={user?.profileUrl ?? NoProfile}
              alt={user?.email}
              className="w-14 h-14 object-cover rounded-full"
            />
            <div className="flex flex-col justify-center">
              <p className="text-lg font-medium text-ascent-1">
                {user?.firstName} {user?.lastName}
              </p>
              <span className="text-ascent-2">
                {user?.profession ?? "No Profession"}
              </span>
            </div>
          </Link>
          <div className="">
            {user?._id === data?._id ? (
              <LiaEditSolid
                size={22}
                className="text-blue cursor-pointer"
                onClick={() => dispatch(UpdateProfile(true))}
              />
            ) : (
              <button
                className="bg-[#0444a430] text-sm text-white p-1 rounded"
                onClick={() => sendFriendRequest(data.token, user._id)}
              >
                <BsPersonFillAdd size={20} className="text-[#0f52b6]" />
              </button>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 py-4 border-b border-[#66666645]">
          <div className="flex gap-2 items-center text-ascent-2">
            <CiLocationOn className="text-xl text-ascent-1" />
            <span>{user?.location ?? "Add Location"}</span>
          </div>
          <div className="flex gap-2 items-center text-ascent-2">
            <BsBriefcase className=" text-lg text-ascent-1" />
            <span>{user?.profession ?? "Add Profession"}</span>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 py-4 border-b border-[#66666645]">
          <div className="flex items-center justify-between">
            <span className="text-ascent-2">Joined</span>
            <span className="text-ascent-1 text-base">
              {moment(user?.createdAt).fromNow()}
            </span>
          </div>
          <div className="mb-2">
            <span className="text-base text-blue">
              {user?.verified ? "Verified Account" : "Not Verified"}
            </span>
          </div>
          <p className="text-lg text-ascent-1 font-semibold mb-2">
            {user?.friends?.length} Friends
          </p>

          {/* Who viewed your profile */}
          <div className="flex items-center justify-between">
            <span className="text-ascent-2">Who viewed your profile</span>
            <span className="text-ascent-1 text-lg">{user?.views?.length}</span>
          </div>
          <div className="">
            <span className="text-ascent-1 ml-2 text-sm">{user?.views}</span>
          </div>
        </div>

        {/* Social profile */}
        <div className="w-full flex flex-col gap-4 py-4 pb-6">
          <p className="text-ascent-1 text-lg font-semibold">Social Profile</p>
          <div className="flex gap-2 items-center text-ascent-2">
            <FaLink className=" text-xl text-ascent-1" />
            {/* https://lynkx.vercel.app/Jackal73 */}
            {/* <span>Lynkx</span> */}
            <span className="">
              <a
                href="https://lynkx.vercel.app/Jackal73"
                alt="link"
                // className="mt-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lynkx
              </a>
            </span>
          </div>
          <div className="flex gap-2 items-center text-ascent-2">
            <FaGithub className=" text-xl text-ascent-1" />
            {/* <span>Github</span> */}
            <span className="">
              <a
                href="https://github.com/Jackal73"
                alt="link"
                // className="mt-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </span>
          </div>

          <div className="flex gap-2 items-center text-ascent-2">
            <BsInstagram className=" text-xl text-ascent-1" />
            {/* <span>Instagram</span> */}
            <span className="">
              <a
                href="https://www.instagram.com/shawnkebel"
                alt="link"
                // className="mt-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </span>
          </div>

          <div className="flex gap-2 items-center text-ascent-2">
            <BsFacebook className=" text-xl text-ascent-1" />
            {/* <span>Facebook</span> */}
            <span className="">
              <a
                href="https://www.facebook.com/shawn.kebel"
                alt="link"
                // className="mt-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
