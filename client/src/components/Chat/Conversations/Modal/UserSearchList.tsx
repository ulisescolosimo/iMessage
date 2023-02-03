import { Avatar, AvatarBadge, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { SearchedUser } from "../../../../util/types";

interface UserSearchListProps {
  users: Array<SearchedUser>;
  addParticipants: (user: SearchedUser) => void;
}

const UserSearchList: React.FC<UserSearchListProps> = ({ users, addParticipants }) => {
  return (
    <>
      {users.length === 0 ? (
        <Flex mt={6} justify={'center'}>
          <Text>No users found</Text>
        </Flex>
      ) : (
        <Stack mt={4}>
          {users.map((user) => (
            <Stack key={user.id} direction={'row'} align={'center'} spacing={4} py={3} px={4} borderRadius={4} _hover={{ bg: 'whiteAlpha.200' }}>
                <Avatar src={user.image} />
                <Flex justify={'space-between'} align={'center'} width={'100%'}>
                <Text color={'whiteAlpha.900'}>
                    {user.username}
                </Text>
                <Button onClick={()=>addParticipants(user)} bg={'brand.100'} _hover={{ bg:"brand.100"}}>Select</Button>
                </Flex>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
};

export default UserSearchList;
