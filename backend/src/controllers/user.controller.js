import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";
export const getRecommendedUsers = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    //fetch from auth.controllers
    const currentUser = req.user;
    // in rec users i dont want to see myself and friends who are already friends
    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, // exculde current user (myself)
        { _id: { $nin: currentUser.friends } }, // exculde current user's friends
        { isOnboarded: true },
      ],
    });
    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.log("error in recommendedUser controller", error.message);
    res.status(500).json({ message: "Internal server Error" });
  }
};

export const getMyFriends = async (req, res) => {
  try {
    // populates extract the data (else without populate we would get only ids )
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage bio "
      );
    res.status(200).json(user.friends);
  } catch (error) {
    // console.log("error in GetMyFriends controller(fxnn)", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    const myId = req.user.id;
    const { idx: recipientId } = req.params; // we have fetched this from user.route router.post("/friend-request/:idx",sendFriendRequest);
    // pervent sending to myself
    if (myId === recipientId) {
      return res.status(400).json({ message: "You can't send req to self" });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }
    if (recipient.friends.includes(myId)) {
      return res.status(400).json({ message: "You are already friends" });
    }
    // check if already sent

    // check if req already exists
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });
    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    // create new friend request
    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    return res
      .status(201)
      .json({ message: "Friend request sent successfully" });
  } catch (error) {
    console.log("error in sendFriendRequest controller", error.message);
    res
      .status(500)
      .json({ message: "Internal server Error in Requesting friend req" });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { idx: requestId } = req.params;
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }
    // verify the current user is the recipient
    if (friendRequest.recipient.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to accept this req" });
    }
    friendRequest.status = "accepted";
    await friendRequest.save();
    // add each user to the other;s friend array
    // addToSet : adds element to an array only if they do not exists
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    res.status(200).json({ message: "friend request accepted" });
  } catch (error) {
    console.log("Error in acceptFriendRequest controoler", error.message);
    res.status(500).json({ message: "Internal server Error" });
  }
};

export const getFriendRequests = async (req, res) => {
  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    const acceptedReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic ");

    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.log("Error in getFriendRequests controller", error.message);
    res.status(500).json({ message: "Internal server Error" });
  }
};

export const getOutgoingFriendReqs = async (req, res) => {
  try {
    const outgoingRequests = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profilePic nativeLanguage learningLanguage"
    );
    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.log("Error in getOutgoingFriendReqs controller", error.message);
    res.status(500).json({ message: "Internal server Error" });
  }
};
