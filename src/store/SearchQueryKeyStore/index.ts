import { create } from "zustand";

interface SearchQueryState {
  queryKey: string;
  setQueryKey: (queryKey: string) => void;
  search: boolean;
  setSearch: (value: boolean) => void;
}

const useSearchQueryKeyStore = create<SearchQueryState>()((set) => ({
  queryKey: "",
  search: false,
  setQueryKey(queryKey) {
    set(() => ({ queryKey: queryKey, search: false }));
  },
  setSearch(value) {
    set(() => ({ search: value }));
  },
}));

export default useSearchQueryKeyStore;
