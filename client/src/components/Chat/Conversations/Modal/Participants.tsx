import { Flex, Stack, Text } from "@chakra-ui/react";
import { SearchedUser } from "../../../../util/types";
import { AiOutlineCloseCircle } from 'react-icons/ai';

interface ParticipantsProps {
  participants: Array<SearchedUser>;
  removeParticipants: (userId: string) => void;
}

const Participants: React.FC<ParticipantsProps> = ({
  participants,
  removeParticipants,
}) => {
  return (
    <Flex mt={4} gap={2} flexWrap={'wrap'}>
      {participants.map((participant) => (
        <Stack key={participant.id} direction={'row'} align={'center'} bg='whiteAlpha.200' borderRadius={4} p={3}>
          <Text fontSize='lg'>{participant.username}</Text>
          <AiOutlineCloseCircle onClick={()=>removeParticipants(participant.id)} size={20} cursor={'pointer'} />
        </Stack>
      ))}
    </Flex>
  );
};

export default Participants;
