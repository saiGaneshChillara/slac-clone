import { useUser } from "@clerk/clerk-react";
import * as Sentry from "@sentry/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getStreamToken } from "../lib/api";
import { StreamChat } from "stream-chat";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

export const useStreamChat = () => {
  const { user } = useUser();
  const [chatClient, setChatClient] = useState(null);

  const { data: tokenData, isLoading: tokenLoading, error: tokenError } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!user?.id,
  });

  useEffect(() => {
    const client = StreamChat.getInstance(STREAM_API_KEY);
    let cancelled = false;

    const initChat = async () => {
      if (!tokenData?.token || !user) return;

      try {
        await client.connectUser({
          id: user.id,
          name: user.fullName,
          image: user.imageUrl,
        }, tokenData.token);
        if (!cancelled) {
          setChatClient(client);
        }
      } catch (error) {
        console.log("Error connecting to stream:", error);
        Sentry.captureException(error, {
          tags: {
            component : "useStreamChat",
          },
          extra: {
            context: "stream_chat_connection",
            userId: user?.id,
            streamApiKey: STREAM_API_KEY ? "present" : "missing",
          }
        });
      }
    };

    initChat();

    return () => {
      cancelled = true;
      client.disconnectUser();
    }
  }, [tokenData, user]);

  return { chatClient, isLoading: tokenLoading, error: tokenError };
};