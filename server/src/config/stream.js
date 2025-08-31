import { StreamChat } from "stream-chat";
import { ENV } from "./env.js";

const streamClient = StreamChat.getInstance(ENV.STREAM_KEY, ENV.STREAM_SECRET);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUser(userData);
    console.log("Stream user upserted succesfully:", userData.name);
    return userData;
  } catch (error) {
    console.log("Error in upserting stream user:", error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await streamClient.deleteUser(userId);
    console.log("Stream user deleted succesfully");
  } catch (error) {
    console.log("Error in deleting stream user:", error);
  }
};

export const generateStreamToken = (userId) =>{
  try {
    const userIdString = userId.toString();
    return streamClient.createToken(userIdString);
  } catch (err) {
    console.log("Error in creating token:", err);
    return null;
  }
};