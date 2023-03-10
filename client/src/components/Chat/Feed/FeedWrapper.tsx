import { Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";

interface FeedWrapperProps {
  session: Session;
}

export const FeedWrapper: React.FC<FeedWrapperProps> = ({ session }) => {
  const router = useRouter();

  const { conversationId } = router.query;

  return (
    <Flex display={{ base: conversationId ? "flex" : "none", md: 'flex'}} width={'100%'} direction={'column'} border={'1px solid red'}>
      {conversationId ? 
      <Flex>
        {conversationId}
      </Flex> : 
      <div>No conversation selected</div>}
    </Flex>
  );
};
