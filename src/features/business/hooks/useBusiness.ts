import { useEffect } from "react";
import { useBusinessStore } from "../stores/businessStore";

export function useBusiness() {
  const {
    currentBusiness,
    businesses,
    loading,
    error,
    fetchBusiness,
    fetchBusinesses,
    updateBusiness,
    createBusiness,
    clearError,
  } = useBusinessStore();

  // Auto-fetch businesses on mount if not already loaded
  useEffect(() => {
    if (businesses.length === 0 && !loading && !error) {
      fetchBusinesses();
    }
  }, [businesses.length, loading, error, fetchBusinesses]);

  return {
    currentBusiness,
    businesses,
    loading,
    error,
    fetchBusiness,
    fetchBusinesses,
    updateBusiness,
    createBusiness,
    clearError,
    refetch: fetchBusinesses,
  };
}
