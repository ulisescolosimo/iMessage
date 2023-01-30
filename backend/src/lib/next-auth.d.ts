import 'next-auth'

declare module 'next-auth' {
    interface User {
        id: String;
        username: String;
        image: String;
    }

    interface Session {
        user: User;
    }
}