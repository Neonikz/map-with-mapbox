import { ChangeEvent, useRef } from "react";

export const Searchbar = () => {
  const debounceRef = useRef<NodeJS.Timeout>();

  const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      //TODO: buscar algo
    }, 350);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="form-control search-input"
        placeholder="Buscar dirección"
        onChange={onQueryChanged}
      />
    </div>
  );
};
