import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import { MapPinIcon } from "lucide-react";
import { getLanguageFlag } from "../components/FriendCard";
import { capitialize } from "../lib/utils";

const FriendsPage = () => {
  const [expandedId, setExpandedId] = useState(null);

  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const toggleExpand = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (friends.length === 0) {
    return (
      <div className="text-center text-lg mt-10 text-gray-500">
        You don’t have any friends yet.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto ">
      <h1 className="text-3xl font-bold mb-6 text-center ">Your Friends</h1>

      {friends.map((friend) => {
        const isOpen = expandedId === friend._id;

        return (
          <div
            key={friend._id}
            className="card bg-base-100 shadow-md hover:shadow-lg transition-all"
          >
            <div
              className="card-body cursor-pointer"
              onClick={() => toggleExpand(friend._id)}
            >
              {/* Basic Info */}
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-16 h-16 rounded-full">
                    <img src={friend.profilePic} alt={friend.fullName} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{friend.fullName}</h3>
                  {friend.location && (
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      {friend.location}
                    </div>
                  )}
                </div>
              </div>

              {/* Expanded Info */}
              {isOpen && (
                <div className="mt-4 border-t pt-4 text-sm space-y-2">
                  <p>
                    <strong>Bio:</strong>{" "}
                    {friend.bio || (
                      <span className="text-gray-400">Not provided</span>
                    )}
                  </p>
                  <p>
                    <strong>Native:</strong>{" "}
                    {getLanguageFlag(friend.nativeLanguage)}{" "}
                    {capitialize(friend.nativeLanguage)}
                  </p>
                  <p>
                    <strong>Learning:</strong>{" "}
                    {getLanguageFlag(friend.learningLanguage)}{" "}
                    {capitialize(friend.learningLanguage)}
                  </p>
                  <p>
                    <strong>Email:</strong> {friend.email}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FriendsPage;
