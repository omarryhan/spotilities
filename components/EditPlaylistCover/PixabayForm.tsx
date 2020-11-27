import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import SearchIcon from '../../public/icons/search.svg';
import { searchPixabay, PixabayHit } from './pixabayAPI';

export const Form = styled.form`
  display: flex;
`;

export const Label = styled.label`
  font-size: 16px;
`;

export const Input = styled.input`
  color: black;
  box-shadow: none;
  background-color: white;
  outline: none;
  height: 40px;
  width: 250px;
  border-radius: 20px;
  padding: 0 15px;
  border: ${(props): string => props.theme.colors.gray.dark} solid 2px;
  font-size: 16px;

  /* stylelint-disable-next-line */
  appearance: none;
  /* stylelint-disable-next-line */
  -webkit-appearance: none;
  /* stylelint-disable-next-line */
  -moz-appearance: none;

  &:hover {
    border: ${(props): string => props.theme.colors.green.primary} solid 2px;
  }

  &:focus {
    border: ${(props): string => props.theme.colors.green.primary} solid 2px;
  }
`;

export const SearchButton = styled.button`
  /* Remove all styles */
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  background-color: ${(props): string => props.theme.colors.white.primary};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  padding: 5px;

  & svg {
    width: 70%;
  }

  & svg circle {
    stroke: ${(props): string => props.theme.colors.green.primary};
    stroke-width: 3;
  }

  & svg path {
    stroke: ${(props): string => props.theme.colors.green.primary};
    stroke-width: 3;
  }

  &:hover {
    background-color: ${(props): string => props.theme.colors.green.primary};

    & svg circle {
      stroke: ${(props): string => props.theme.colors.white.primary};
    }

    & svg path {
      stroke: ${(props): string => props.theme.colors.white.primary};
    }
  }

  &:disabled {
    background-color: ${(props): string => props.theme.colors.gray.evenLighter};

    & svg circle {
      stroke: ${(props): string => props.theme.colors.white.evenDarkest};
    }

    & svg path {
      stroke: ${(props): string => props.theme.colors.white.evenDarkest};
    }
  }
`;

interface FormData {
  pixabayQuery: string;
}

interface Props {
  isSearchingPixabay: boolean;
  setIsSearchingPixabay: (val: boolean) => void;
  setLastPageQuery: (val: string) => void;
  setCurrentPixabayHits: (val: PixabayHit[]) => void;
}

const Component: React.FC<Props> = ({
  isSearchingPixabay,
  setIsSearchingPixabay,
  setCurrentPixabayHits,
  setLastPageQuery,
}) => {
  const defaultValues: FormData = {
    pixabayQuery: 'cat png',
  };

  const newPixabaySearch = async (q: string): Promise<void> => {
    setIsSearchingPixabay(true);
    setLastPageQuery(q);
    try {
      const response = await searchPixabay(
        { q: q || defaultValues.pixabayQuery, page: 1 },
      );
      setCurrentPixabayHits(response.hits);
    } finally {
      setIsSearchingPixabay(false);
    }
  };

  React.useEffect(() => {
    newPixabaySearch(defaultValues.pixabayQuery);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    handleSubmit, register,
  } = useForm<FormData>({
    defaultValues,
  });

  return (
    <Form
      onSubmit={handleSubmit(
        async ({ pixabayQuery }) => {
          await newPixabaySearch(pixabayQuery);
        },
        () => {
          alert('Something went wrong');
        },
      )}
    >
      <Label
        htmlFor="pixabayQuery"
      >
        <Input
          name="pixabayQuery"
          type="search"
          id="pixabayQuery"
          placeholder="Search pixabay"
          ref={register}
          style={{
            color: 'black',
          }}
        />
      </Label>
      <SearchButton
        type="submit"
        disabled={isSearchingPixabay}
      >
        <SearchIcon />
      </SearchButton>
    </Form>
  );
};

export default Component;
