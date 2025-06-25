import {StreamChat} from "stream-chat";

import dotenv from "dotenv";
dotenv.config();
const apiKey = process.env.SYNCTALK_API_KEY;
const apiSecret = process.env.SYNCTALK_API_SECRET;

if(!apiKey || !apiSecret){
    console.error("Stream API key or secret is missing");

}

const streamClient = StreamChat.getInstance(apiKey,apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    console.log("Sending user to Stream:", userData);
    const result = await streamClient.upsertUsers([userData]);
    console.log("Stream response:", result);
    return userData;
  } catch (error) {
    console.log("Error upserting Stream User", error.message);
  }
};


// export const generateStreamToken = (userId)=>{

// }

