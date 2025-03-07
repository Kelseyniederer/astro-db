import { useEffect, useState } from "react";
import apiClient from "../services/api-client"; // ✅ Axios instance

interface ActorDetails {
  id: number;
  name: string;
  profile_path?: string;
  birthday?: string; // ✅ Ensure birthday exists
  biography?: string;
  place_of_birth?: string;
}


const useActorDetails = (actorId: number | null) => {
  const [actor, setActor] = useState<ActorDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!actorId) return;

    const fetchActorDetails = async () => {
      try {
        const response = await apiClient.get<ActorDetails>(
          `/person/${actorId}`
        );
        setActor(response.data);
      } catch (err) {
        console.error(`Error fetching actor details:`, err);
        setError("Failed to load actor details.");
      } finally {
        setLoading(false);
      }
    };

    fetchActorDetails();
  }, [actorId]);

  return { actor, loading, error };
};

export default useActorDetails;
