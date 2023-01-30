import { CreateUsernameResponse, GraphQLContext } from "../../util/types";

const resolvers = {
    Query: {
        searchUsers: () => {

        }
    },
    Mutation: {
        createUsername: async (_: any, args: { username: string }, context: GraphQLContext): Promise<CreateUsernameResponse> => {
            const { username } = args
            const { session, prisma } = context
            if (!session?.user) {
                return { error: 'Not authorized' };
            }

            const userId = String(session?.user.id);

            try {
                const existingUsername = await prisma.user.findUnique({
                    where: {
                        username
                    }
                })
                if (existingUsername) {
                    return {
                        error: 'Username already exists. Try another.'
                    }
                }

                await prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        username
                    }
                })

                return { success: true }
            } catch (error: any) {
                console.log(error)
                return {
                    error: error?.message
                };
            }
        }
    }

};

export default resolvers;