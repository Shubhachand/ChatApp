import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import { useState } from "react";
import { MapPinIcon } from "lucide-react";
import { getLanguageFlag } from "../components/FriendCard";
import { capitialize } from "../lib/utils";

const FriendsPage = () => {
  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const [selectedFriendId, setSelectedFriendId] = useState(null);

  const toggleFriend = (id) => {
    setSelectedFriendId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Your Friends
        </h2>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <div className="card bg-base-200 p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">No friends yet</h3>
            <p className="text-base-content opacity-70">
              Add some friends to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {friends.map((friend) => {
              const isExpanded = selectedFriendId === friend._id;

              return (
                <div
                  key={friend._id}
                  className="card bg-base-100 shadow-md hover:shadow-lg transition-all"
                >
                  <div
                    onClick={() => toggleFriend(friend._id)}
                    className="card-body cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="w-16 rounded-full">
                          <img
                            src={friend.profilePic}
                            alt={friend.fullName}
                            className="object-cover"
                          />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{friend.fullName}</h3>
                        {friend.location && (
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <MapPinIcon className="size-4 mr-1" />
                            {friend.location}
                          </div>
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-4 border-t pt-4 border-base-300 space-y-3 text-sm">
                        {friend.bio && (
                          <p>
                            <span className="font-medium">Bio:</span>{" "}
                            <span className="opacity-80">{friend.bio}</span>
                          </p>
                        )}
                        {friend.nativeLanguage && (
                          <p>
                            <span className="font-medium">Native Language:</span>{" "}
                            {getLanguageFlag(friend.nativeLanguage)}{" "}
                            {capitialize(friend.nativeLanguage)}
                          </p>
                        )}
                        {friend.learningLanguage && (
                          <p>
                            <span className="font-medium">Learning Language:</span>{" "}
                            {getLanguageFlag(friend.learningLanguage)}{" "}
                            {capitialize(friend.learningLanguage)}
                          </p>
                        )}
                        {friend.email && (
                          <p>
                            <span className="font-medium">Email:</span>{" "}
                            {friend.email}
                          </p>
                        )}
                        {friend._id && (
                          <p className="opacity-50 text-xs">
                            <span className="font-medium">User ID:</span>{" "}
                            {friend._id}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
