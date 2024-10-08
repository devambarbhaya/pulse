import { eventPageQueryParams } from "@/config/queryParams";
import { useSearchParams } from "next/navigation";

export function useIsParticipatingView() {
  const params = useSearchParams();

  return params.get(eventPageQueryParams.asParticipant) === "true";
}
