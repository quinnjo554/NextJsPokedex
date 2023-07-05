import React, { ChangeEvent } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link,
  IconButton,
  ListItem,
  UnorderedList,
  Flex,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

function SearchBar(props: {
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setSearchFilter: React.Dispatch<React.SetStateAction<string>>;
  showFilter: boolean;
  filteredSearch: pokemon[];
  typeColors: TypeColors;
}) {
  return (
    <>
      <InputGroup w={"64"} className="fixed left-[40%] inputMobile">
        <Input
          data-testid="search-bar"
          variant="filled"
          placeholder="Search For Pokemon"
          textColor="white"
          w={300}
          onChange={props.handleInputChange}
        />
        <InputRightElement className="relative left-[15rem]">
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
              className="bg-white"
            />
            <MenuList className="">
              <MenuItem
                value="Type"
                onClick={() => props.setSearchFilter("Type")}
              >
                Type
              </MenuItem>
              <MenuItem
                value="Ability"
                onClick={() => props.setSearchFilter("Ability")}
              >
                Ability
              </MenuItem>
              <MenuItem
                value="Name"
                onClick={() => props.setSearchFilter("Name")}
              >
                Name
              </MenuItem>
            </MenuList>
          </Menu>
        </InputRightElement>
      </InputGroup>
      {props.showFilter && (
        <Box
          className="fixed left-[40%] max-h-24 inputMobile"
          bg="white"
          border="1px"
          borderColor="gray.300"
          rounded="md"
          shadow="md"
          overflowY="scroll"
          maxW="500px"
          maxH="72"
        >
          <UnorderedList listStyleType="none">
            {props.filteredSearch.map((value, index) => (
              <Link
                href={`http://localhost:3000/pokedex/${value.id}`}
                key={index}
              >
                <ListItem className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${value.id}.png`}
                    alt={value.name}
                    width={22}
                    height={22}
                    className="mr-2"
                  />
                  <Box className="flex items-center">
                    <span className="mr-2">{value.name}</span>
                    <Flex>
                      {value.types.map((type, typeIndex) => (
                        <Box
                          key={typeIndex}
                          px={2}
                          py={1}
                          fontSize="xs"
                          rounded="full"
                          color="white"
                          mr={1}
                          className={`${props.typeColors[type.name]}`}
                        >
                          {type.name}
                        </Box>
                      ))}
                    </Flex>
                  </Box>
                </ListItem>
              </Link>
            ))}
          </UnorderedList>
        </Box>
      )}
    </>
  );
}
export default SearchBar;
