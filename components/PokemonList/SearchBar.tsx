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
  Text,
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
      <InputGroup
        w={"64"}
        position={"absolute"}
        left={"40%"}
        className="inputMobile"
      >
        <Input
          data-testid="search-bar"
          variant="filled"
          placeholder="Search For Pokemon"
          textColor="white"
          w={300}
          onChange={props.handleInputChange}
        />
        <InputRightElement position={"relative"} left={"-1rem"}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
              bg={"white"}
            />
            <MenuList>
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
          className=" inputMobile"
          bg="white"
          position={"fixed"}
          left={"40%"}
          top={"36"}
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
                <ListItem
                  display={"flex"}
                  alignItems={"center"}
                  py={"2"}
                  px={"4"}
                  _hover={{ bg: "gray.100" }}
                  cursor={"pointer"}
                  rounded={"md"}
                >
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${value.id}.png`}
                    alt={value.name}
                    width={22}
                    height={22}
                    mr="2"
                  />
                  <Box display={"flex"} alignItems={"center"}>
                    <Text mr="2">{value.name}</Text>
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
