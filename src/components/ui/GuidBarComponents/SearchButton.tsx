import Input from '@mui/joy/Input';
import { useAppDispatch, useAppSelector } from "../../../reduxHooks";
import { setSearch } from "../../../state/podcasts/searchSlice";


/**
 * A search input component that allows users to search through podcast data.
 *
 * @component
 * @returns {JSX.Element} Search input field for podcasts.
 */
export default function SearchButton(): JSX.Element {
  const dispatch = useAppDispatch();
  const podcastData = useAppSelector((state) => state.podcasts.data);
  const searchValue = useAppSelector((state) => state.search.search);

  /** Handle the change event when user types in the search bar */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch({ search: event.target.value, data: podcastData }));
  };

  return (
    <Input
      onChange={handleChange}
      value={searchValue}
      placeholder="Search Pods"
      sx={{ width: 200, borderRadius: 12 }}
    />
  );
}
