import { ChangeEvent, FormEvent, useRef, useState } from "react";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import useDebouncedValue from "@/hooks/use-debounced-value/useDebouncedValue";
import useSearchParamsActions from "@/hooks/use-search-params-actions/useSearchParamsActions";
import useUpdateEffect from "@/hooks/use-update-effect/useUpdateEffect";
import {
  CloseIconThinStyled,
  SearchInput,
} from "@/layouts/blog-tab-layout/components/blog-search-input/BlogSearchInput.styled";
import { SearchIconStyled } from "@/layouts/blog-tab-layout/components/blog-search/BlogSearch.styled";

type BlogSearchInputProps = {
  exitSearchMode: () => void;
};

export default function BlogSearchInput({
  exitSearchMode,
}: BlogSearchInputProps) {
  const { getSearchParam, toggleSearchParam } = useSearchParamsActions();

  const initialSearchValue = getSearchParam("search") ?? "";

  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const debouncedSearchValue = useDebouncedValue(searchValue);
  const isSearchCausedBySubmitRef = useRef(false);
  const isInitialDebounceUpdateRef = useRef(true);

  const handleExitSearchMode = () => {
    exitSearchMode();
    toggleSearchParam("search", searchValue);
  };

  const handleSearch = (value: string) => {
    // TODO: Add search logic
    console.log(value);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    isSearchCausedBySubmitRef.current = true;
    handleSearch(searchValue);
  };

  useUpdateEffect(() => {
    // skip first debounced value update, because we do not want to perform search when component is rendered
    if (isInitialDebounceUpdateRef.current) {
      isInitialDebounceUpdateRef.current = false;
      return;
    }

    // skip search function if we already submitted form with Enter key for example
    if (isSearchCausedBySubmitRef.current) {
      isSearchCausedBySubmitRef.current = false;
      return;
    }

    handleSearch(debouncedSearchValue);
  }, [debouncedSearchValue]);

  const inputStartAdornment = (
    <InputAdornment position="start">
      <SearchIconStyled />
    </InputAdornment>
  );

  const inputEndAdornment = (
    <InputAdornment position="end">
      <IconButton onClick={handleExitSearchMode} data-testid="exit-button">
        <CloseIconThinStyled />
      </IconButton>
    </InputAdornment>
  );

  return (
    <form onSubmit={handleSubmit} role="form">
      <SearchInput
        autoFocus
        value={searchValue}
        onChange={handleChange}
        placeholder="Search"
        startAdornment={inputStartAdornment}
        endAdornment={inputEndAdornment}
      />
    </form>
  );
}
