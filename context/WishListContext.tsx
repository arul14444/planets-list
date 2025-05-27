import React, { createContext, useContext, useState, ReactNode } from "react";

type Planet = {
  uid: string;
  name: string;
  url: string;
};

type WishListContextType = {
  wishlist: Planet[];
  addToWishlist: (planet: Planet) => void;
  removeFromWishlist: (uid: string) => void; 
};

const WishListContext = createContext<WishListContextType | undefined>(undefined);

export const WishListProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Planet[]>([]);

  const addToWishlist = (planet: Planet) => {
    setWishlist((prev) => {
      const alreadyExists = prev.some((item) => item.uid === planet.uid);
      if (alreadyExists) return prev;
      return [...prev, planet];
    });
  };

  const removeFromWishlist = (uid: string) => {
    setWishlist((prev) => prev.filter((item) => item.uid !== uid));
  };

  return (
    <WishListContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishListContext.Provider>
  );
};

export const useWishList = (): WishListContextType => {
  const context = useContext(WishListContext);
  if (!context) {
    throw new Error("useWishList must be used within a WishListProvider");
  }
  return context;
};
