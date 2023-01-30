import 'next-auth'

declare module 'next-auth' {
    interface User {
        id: String;
        username: String;
    }

    interface Session {
        user: User;
    }
}