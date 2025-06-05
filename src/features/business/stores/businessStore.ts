import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { BusinessStore } from "../types/business.types";
import { businessService } from "../services/businessService";

export const useBusinessStore = create<BusinessStore>()(
  devtools(
    persist(
      (set, get) => ({
        // State
        currentBusiness: null,
        businesses: [],
        loading: false,
        error: null,

        // Actions
        fetchBusiness: async (businessId: string) => {
          set({ loading: true, error: null });
          try {
            const business = await businessService.getBusiness(businessId);
            set({
              currentBusiness: business,
              loading: false,
            });
          } catch (error) {
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "Failed to fetch business",
              loading: false,
            });
            throw error;
          }
        },

        fetchBusinesses: async () => {
          set({ loading: true, error: null });
          try {
            const businesses = await businessService.getBusinesses();
            set({
              businesses,
              loading: false,
              // Set current business to first one if none selected
              currentBusiness: get().currentBusiness || businesses[0] || null,
            });
          } catch (error) {
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "Failed to fetch businesses",
              loading: false,
            });
            throw error;
          }
        },

        updateBusiness: async (businessId: string, updates) => {
          set({ loading: true, error: null });
          try {
            await businessService.updateBusiness(businessId, updates);

            // Update local state
            const { currentBusiness, businesses } = get();

            if (currentBusiness?.id === businessId) {
              set({
                currentBusiness: {
                  ...currentBusiness,
                  ...updates,
                  updatedAt: new Date(),
                },
              });
            }

            const updatedBusinesses = businesses.map((business) =>
              business.id === businessId
                ? { ...business, ...updates, updatedAt: new Date() }
                : business
            );

            set({
              businesses: updatedBusinesses,
              loading: false,
            });
          } catch (error) {
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "Failed to update business",
              loading: false,
            });
            throw error;
          }
        },

        createBusiness: async (businessData) => {
          set({ loading: true, error: null });
          try {
            const newBusiness =
              await businessService.createBusiness(businessData);

            set((state) => ({
              businesses: [...state.businesses, newBusiness],
              currentBusiness: state.currentBusiness || newBusiness,
              loading: false,
            }));
          } catch (error) {
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "Failed to create business",
              loading: false,
            });
            throw error;
          }
        },

        clearError: () => set({ error: null }),
      }),
      {
        name: "business-storage",
        partialize: (state) => ({
          currentBusiness: state.currentBusiness,
          businesses: state.businesses,
        }),
      }
    ),
    { name: "business-store" }
  )
);
