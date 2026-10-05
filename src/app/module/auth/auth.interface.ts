export type Tauth = {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'super-admin';
    isDeleted: boolean;
}