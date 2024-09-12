import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { Search } from '@mui/icons-material/';
import { useState } from 'react';

export default function SearchButton({ onInputFocus, onInputBlur }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    console.log(searchValue);
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <Stack spacing={1.5}>
      <Input
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        onChange={handleChange}
        value={searchValue}
        placeholder="Search Pods"
        startDecorator={
          <Button
            variant="soft"
            color="neutral"
            startDecorator={<Search />}
            onClick={handleSearch}
          />
        }
        sx={{ width: 300, borderRadius: 12 }}
      />
    </Stack>
  );
}
