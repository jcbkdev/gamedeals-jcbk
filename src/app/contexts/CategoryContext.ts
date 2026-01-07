import { createContext, Dispatch, SetStateAction } from "react";

export const CategoryContext = createContext<{
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}>({
  category: "category-all",
  setCategory: () => {},
});
