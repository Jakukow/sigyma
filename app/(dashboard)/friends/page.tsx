const FriendsPage = () => {
  return (
    <div className="mt-11 mx-5  flex  w-full h-full shadow bg-white rounded-xl overflow-hidden">
      <div className="flex w-1/3 m-4">
        <div className="flex  w-full text-prim font-bold mx-2 tracking-widest">
          Friends List
        </div>
      </div>
      <div className=" w-1/3 m-4  flex h-full">
        <div className="flex  w-full text-prim font-bold mx-2 tracking-widest">
          People You May Know
        </div>
      </div>

      <div className=" w-1/3 m-4  flex h-full ">
        <div className="flex  w-full text-prim font-bold mx-2 tracking-widest">
          Invites
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
