"use client";

import React from "react";

const FriendsPage = () => {
  const friendsList = ["Alice Johnson", "Bob Smith", "Charlie Brown"];
  const peopleYouMayKnow = ["David Lee", "Ella Fitzgerald", "George Carlin"];
  const invites = ["Helen Keller", "Isaac Newton", "Joan of Arc"];

  return (
    <div className="mt-11 mx-5 flex w-full h-full shadow bg-white rounded-xl overflow-hidden">
      {/* Friends List Section */}
      <div className="flex flex-col w-1/3 m-4  justify-center">
        <div className="text-prim font-bold mx-2 tracking-widest mb-2">
          <h1>Friends List</h1>
        </div>
        <ul className="bg-gray-100 p-4 rounded-lg overflow-y-auto h-[650px]  space-y-2">
          {friendsList.map((friend, index) => (
            <li
              key={index}
              className="p-2 bg-white rounded-lg shadow-sm flex items-center justify-between"
            >
              <span>{friend}</span>
              <button className="text-blue-500 text-sm">View Profile</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col justify-center w-1/3 m-4">
        <div className="text-prim font-bold mx-2 tracking-widest mb-2">
          <h1>People You May Know</h1>
        </div>
        <ul className="bg-gray-100 p-4 rounded-lg overflow-y-auto h-[650px] space-y-2">
          {peopleYouMayKnow.map((person, index) => (
            <li
              key={index}
              className="p-2 bg-white rounded-lg shadow-sm flex items-center justify-between"
            >
              <span>{person}</span>
              <button className="prim text-white px-2 py-1 text-sm rounded-md">
                Add Friend
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Invites Section */}
      <div className="flex flex-col w-1/3 m-4 justify-center">
        <div className="text-prim font-bold mx-2 tracking-widest mb-2">
          <h1>Invites</h1>
        </div>
        <ul className="bg-gray-100 p-4 rounded-lg overflow-y-auto h-[650px] space-y-2">
          {invites.map((invite, index) => (
            <li
              key={index}
              className="p-2 bg-white rounded-lg shadow-sm flex items-center justify-between"
            >
              <span>{invite}</span>
              <div className="flex space-x-2">
                <button className="prim text-white px-2 py-1 text-sm rounded-md">
                  Accept
                </button>
                <button className="bg-red-400 text-white px-2 py-1 text-sm rounded-md">
                  Decline
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FriendsPage;
