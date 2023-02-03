import { Box } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { Session } from "next-auth";
import ConversationList from "./ConversationList";
import ConversationOperation from "../../../graphql/operations/conversation";
import { ConversationsData } from "../../../util/types";

interface ConversationsWrapperProps {
  session: Session;
}
const ConversationsWrapper: React.FC<ConversationsWrapperProps> = ({
  session,
}) => {
  const {
    data: conversationsData,
    error: conversationsError,
    loading: conversationsLoading,
  } = useQuery<ConversationsData, null>(ConversationOperation.Queries.conversations);

  console.log(conversationsData);

  return (
    <Box
      width={{ base: "100%", md: "400px" }}
      bg={"whiteAlpha.50"}
      py={6}
      px={3}
    >
      {/* Skeleton Loader */}
      <ConversationList session={session} />
    </Box>
  );
};

export default ConversationsWrapper;
