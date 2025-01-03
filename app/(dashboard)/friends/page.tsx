"use client";

import { X } from "lucide-react";
import React from "react";

const FriendsPage = () => {
  const friendsList = ["Alice Johnson", "Bob Smith", "Charlie Brown"];
  const peopleYouMayKnow = ["David Lee", "Ella Fitzgerald", "George Carlin"];
  const invites = ["Helen Keller", "Isaac Newton", "Joan of Arc"];

  return (
    <div className="mt-11 mx-5 flex flex-col w-full h-full bg-white rounded-xl shadow overflow-hidden">
      {/* Header Section */}
      <div className="flex justify-between items-center px-6 py-4 prim border-b">
        <h1 className="text-xl font-bold text-white">Friends Management</h1>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row w-full h-full">
        {/* Friends List Section */}
        <div className="flex flex-col flex-1 p-4">
          <h2 className="text-lg font-semibold text-prim mb-4">Friends List</h2>
          <ul className="bg-gray-50 p-4 rounded-lg shadow-md overflow-y-auto h-[450px] space-y-2">
            {friendsList.map((friend, index) => (
              <li
                key={index}
                className="p-3 bg-white rounded-lg shadow-sm flex items-center justify-between"
              >
                <span className="text-gray-800">{friend}</span>
                <button className="text-red-400 text-sm">
                  {" "}
                  <X />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* People You May Know Section */}
        <div className="flex flex-col flex-1 p-4">
          <h2 className="text-lg font-semibold text-prim mb-4">
            People You May Know
          </h2>
          <ul className="bg-gray-50 p-4 rounded-lg shadow-md overflow-y-auto h-[450px] space-y-2">
            {peopleYouMayKnow.map((person, index) => (
              <li
                key={index}
                className="p-3 bg-white rounded-lg shadow-sm flex items-center justify-between"
              >
                <span className="text-gray-800">{person}</span>
                <button className="prim text-white px-3 py-1 text-sm rounded-md">
                  Add Friend
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Invites Section */}
        <div className="flex flex-col flex-1 p-4">
          <h2 className="text-lg font-semibold text-prim mb-4">Invites</h2>
          <ul className="bg-gray-50 p-4 rounded-lg shadow-md overflow-y-auto h-[450px] space-y-2">
            {invites.map((invite, index) => (
              <li
                key={index}
                className="p-3 bg-white rounded-lg shadow-sm flex items-center justify-between"
              >
                <span className="text-gray-800">{invite}</span>
                <div className="flex space-x-2">
                  <button className="prim text-white px-3 py-1 text-sm rounded-md">
                    Accept
                  </button>
                  <button className="bg-red-400 text-white px-3 py-1 text-sm rounded-md">
                    Decline
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
