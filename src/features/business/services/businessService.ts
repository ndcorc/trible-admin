import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "@/services/firebase/config";
import type { Business } from "../types/business.types";

const COLLECTION_NAME = "businesses";

// Dummy data for initialization
const dummyBusinesses: Omit<Business, "id">[] = [
  {
    name: "Main Street Brew",
    slug: "main-street-brew",
    industry: "Food & Beverage",
    timezone: "America/New_York",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-05-31"),
    settings: {
      dashboardConfig: {
        defaultView: "overview",
        refreshInterval: 300000, // 5 minutes
      },
      notifications: true,
    },
  },
  {
    name: "The Coffee Corner",
    slug: "coffee-corner",
    industry: "Food & Beverage",
    timezone: "America/Los_Angeles",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-05-30"),
    settings: {
      dashboardConfig: {
        defaultView: "analytics",
        refreshInterval: 600000, // 10 minutes
      },
      notifications: false,
    },
  },
];

export const businessService = {
  async getBusiness(businessId: string): Promise<Business> {
    try {
      const docRef = doc(firestore, COLLECTION_NAME, businessId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Business;
      }

      throw new Error("Business not found");
    } catch (error) {
      console.error("Error fetching business:", error);
      throw error;
    }
  },

  async getBusinesses(): Promise<Business[]> {
    try {
      const collectionRef = collection(firestore, COLLECTION_NAME);
      const querySnapshot = await getDocs(collectionRef);

      if (querySnapshot.empty) {
        // If no businesses exist, initialize with dummy data
        console.log("No businesses found, initializing with dummy data...");
        const businesses: Business[] = [];

        for (const dummyBusiness of dummyBusinesses) {
          const docRef = await addDoc(collectionRef, {
            ...dummyBusiness,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });

          businesses.push({
            id: docRef.id,
            ...dummyBusiness,
          });
        }

        return businesses;
      }

      return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Business;
      });
    } catch (error) {
      console.error("Error fetching businesses:", error);
      throw error;
    }
  },

  async createBusiness(
    business: Omit<Business, "id" | "createdAt" | "updatedAt">
  ): Promise<Business> {
    try {
      const collectionRef = collection(firestore, COLLECTION_NAME);
      const docRef = await addDoc(collectionRef, {
        ...business,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return {
        id: docRef.id,
        ...business,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } catch (error) {
      console.error("Error creating business:", error);
      throw error;
    }
  },

  async updateBusiness(
    businessId: string,
    updates: Partial<Business>
  ): Promise<void> {
    try {
      const docRef = doc(firestore, COLLECTION_NAME, businessId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error updating business:", error);
      throw error;
    }
  },

  async getBusinessBySlug(slug: string): Promise<Business | null> {
    try {
      const collectionRef = collection(firestore, COLLECTION_NAME);
      const q = query(collectionRef, where("slug", "==", slug));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return null;
      }

      const doc = querySnapshot.docs[0];
      const data = doc.data();

      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Business;
    } catch (error) {
      console.error("Error fetching business by slug:", error);
      throw error;
    }
  },
};
