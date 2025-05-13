// src/components/Dropdown/DropdownContext.ts (NEW FILE)
import { createContext, useContext } from "react";

interface DropdownContextType {
  closeDropdown: () => void;
  isOpen: boolean; // Optional: if items need to know if the dropdown is open
}

export const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

export const useDropdown = (): DropdownContextType => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdown must be used within a DropdownProvider");
  }
  return context;
};
