import { Prisma } from "@prisma/client";
import { ConversationPopulated, GraphQLContext } from "../../util/types";
import { ApolloError } from 'apollo-server-core'

const resolvers = {
    Query: {
        conversations: async (_: any, __: any, context: GraphQLContext): Promise<Array<ConversationPopulated>> => {
            const { session, prisma } = context
            if (!session?.user) {
                throw new ApolloError('Not authorized')
            }
            const { user: { id: userId } } = session

            try {
                const conversations = await prisma.conversation.findMany({
                    include: conversationPopulated
                })

                const founded = conversations.filter(conversation => conversation.participants.find((p) => p.userId === userId))

                return founded

            } catch (error: any) {
                console.log(error)
                throw new ApolloError(error?.message)
            }
        }
    },
    Mutation: {
        createConversation: async (_: any, args: { participantIds: string[] }, context: GraphQLContext): Promise<{ conversationId: string }> => {
            const { session, prisma } = context
            const { participantIds } = args

            console.log(participantIds)

            if (!session?.user) {
                throw new ApolloError('Not autorized')
            }

            const { user: { id: userId } } = session

            try {
                const conversation = await prisma.conversation.create({
                    data: {
                        participants: {
                            createMany: {
                                data: participantIds.map(id => ({
                                    userId: id,
                                    hasSeenLatestMessage: id === userId
                                    //iguala porque necesita un booleano. Ese booleano es el que le va a decir si el que crea la conversacion es el mismo que esta logueado.
                                }))
                            }
                        }
                    },
                    include: conversationPopulated
                })
                return { conversationId: conversation.id }
            } catch (error) {
                console.log('Create conversation error: ' + error)
                throw new ApolloError('Create conversation error: ' + error)
            }
        }
    }
}

export const participantPopulated = Prisma.validator<Prisma.ConversationParticipantInclude>()({
    user: {
        select: {
            id: true,
            username: true
        }
    }
})

export const conversationPopulated = Prisma.validator<Prisma.ConversationInclude>()({
    participants: {
        include: participantPopulated
    },
    latestMessage: {
        include: {
            sender: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    }
})

export default resolvers;