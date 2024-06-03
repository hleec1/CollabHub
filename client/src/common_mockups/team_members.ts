export interface MemberType {
    id: string,
    name: string,
    studentId: string,
    email: string,
    major: string,
    status: number,
    profileImage?: string
}
export const team_members: MemberType[]= [
    {
        id: '1',
        name: 'Kevin',
        studentId: '2024311111',
        email: 'kevin@gmail.com',
        major: 'software',
        status: 0,
        profileImage: 'profile_basic_1',
    },
    {
        id: '2',
        name: 'John',
        studentId: '2024312222',
        email: 'john@gmail.com',
        major: 'software',
        status: 1,
        profileImage: 'profile_basic_2',
    },
    {
        id: '3',
        name: 'Jane',
        studentId: '2024313333',
        email: 'jane@gmail.com',
        major: 'software',
        status: 1,
        profileImage: 'profile_basic_3',
    },
    {
        id: '4',
        name: 'Emily',
        studentId: '2024314444',
        email: 'emily@gmail.com',
        major: 'software',
        status: 0,
        profileImage: 'profile_basic_2',
    },
    {
        id: '5',
        name: 'Lily',
        studentId: '2024315555',
        email: 'lily@gmail.com',
        major: 'software',
        status: 1,
        profileImage: 'profile_basic_1',
    }
]