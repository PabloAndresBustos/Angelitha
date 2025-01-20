export interface Usuario{
    uid: string,
    email: string,
    password?: string,
    name: string
    type: number //0 Admin - 1 Normal - 2 Super
}