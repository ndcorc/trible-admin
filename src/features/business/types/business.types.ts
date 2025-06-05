export interface Business {
  id: string;
  name: string; // "Main Street Brew"
  slug: string;
  industry: string;
  timezone: string;
  createdAt: Date;
  updatedAt: Date;
  settings: {
    dashboardConfig?: any;
    notifications?: boolean;
  };
}

export interface BusinessState {
  currentBusiness: Business | null;
  businesses: Business[];
  loading: boolean;
  error: string | null;
}

export interface BusinessActions {
  fetchBusiness: (businessId: string) => Promise<void>;
  fetchBusinesses: () => Promise<void>;
  updateBusiness: (
    businessId: string,
    updates: Partial<Business>
  ) => Promise<void>;
  createBusiness: (
    business: Omit<Business, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  clearError: () => void;
}

export type BusinessStore = BusinessState & BusinessActions;
