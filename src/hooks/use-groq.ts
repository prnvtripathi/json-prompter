import { GroqRequest, GroqResponse } from "@/types/api.types";
import useSwrMutation from "swr/mutation";
import getCookie from "@/lib/cookies";

const fetcher = async (url: string, { arg }: { arg: GroqRequest }) => {
  const jwtToken = await getCookie("token");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export function useGroq() {
  const { trigger, data, error, isMutating } = useSwrMutation<
    GroqResponse,
    Error,
    string,
    GroqRequest
  >("/api/groq", fetcher);

  return { trigger, data, error, isLoading: isMutating };
}
