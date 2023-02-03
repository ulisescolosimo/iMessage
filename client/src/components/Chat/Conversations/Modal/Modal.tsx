import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import userOperations from "../../../../graphql/operations/user";
import {
  CreateConversationData,
  CreateConversationInput,
  SearchUsersData,
  SearchUsersInput,
  SearchedUser,
} from "../../../../util/types";
import UserSearchList from "./UserSearchList";
import { toast } from "react-hot-toast";
import Participants from "./Participants";
import conversationOperations from "../../../../graphql/operations/conversation";
import { Session } from "next-auth";
import { useRouter } from "next/router";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: Session;
}

const ConversationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  session,
}) => {
  const {
    user: { id: userId },
  } = session;

  const router = useRouter()

  const [username, setUsername] = useState("");
  const [participants, setParticipants] = useState<SearchedUser[]>([]);
  const [searchUsers, { data, error, loading }] = useLazyQuery<
    SearchUsersData,
    SearchUsersInput
  >(userOperations.Queries.searchUsers);

  const [createConversation, { loading: createConversationLoading }] =
    useMutation<CreateConversationData, CreateConversationInput>(
      conversationOperations.Mutation.createConversation
    );

  const addParticipants = (user: SearchedUser) => {
    if (!participants.some((p) => p.id === user.id)) {
      setParticipants((prev) => [...prev, user]);
      toast.success("Participant added to chat");
      setUsername("");
    } else {
      toast.error("Participant already added to new chat");
    }
  };

  const removeParticipants = (userId: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== userId));
    toast.success("Participant removed from chat");
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    searchUsers({ variables: { username } });
  };

  const onCreateConversation = async () => {
    const participantIds = [...participants.map((p) => p.id), userId];

    try {
      const { data } = await createConversation({
        variables: {
          participantIds,
        },
      });

      if (!data?.createConversation) {
        throw new Error("Failed to create conversation");
      }

      const {
        createConversation: { conversationId },
      } = data;

      console.log(conversationId);

      router.push({ query: { conversationId }})

      /* Clear state and close modal on a successfull creationg */

      setParticipants([])
      setUsername('')
      onClose();

    } catch (error: any) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"#2d2d2d"} pb={4}>
          <ModalHeader>Create conversation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSubmit}>
              <Stack spacing={4}>
                <Input
                  placeholder={"Enter a username"}
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
                <Button
                  isDisabled={!username}
                  isLoading={loading}
                  type="submit"
                >
                  Search
                </Button>
              </Stack>
            </form>
            {data?.searchUsers ? (
              <UserSearchList
                users={data?.searchUsers}
                addParticipants={addParticipants}
              />
            ) : null}
            {participants.length !== 0 && (
              <Stack>
                <Participants
                  participants={participants}
                  removeParticipants={removeParticipants}
                />
                <Button
                  bg="brand.100"
                  _hover={"brand.100"}
                  width={"100%"}
                  mt={6}
                  onClick={onCreateConversation}
                  isLoading={createConversationLoading}
                >
                  Create conversation
                </Button>
              </Stack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConversationModal;
