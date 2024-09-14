import Input from '@mui/joy/Input';
import { useAppDispatch, useAppSelector } from "../../../reduxHooks";
import { setSearch } from "../../../state/podcasts/searchSlice";

export default function SearchButton() {
  const dispatch = useAppDispatch();
  const podcastData = useAppSelector((state) => state.podcasts.data);
  const searchValue = useAppSelector((state) => state.search.search);

  const handleChange = (event) => {
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
