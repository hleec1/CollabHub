export enum Status {
    UNK,
    TODO,
    INPROGRESS,
    ONREVIEW,
    DONE
}

export interface TaskType {
    id: number,
    content: string,
    relatedSchedule?: number,   // related schedule number
    status: Status,

    // for Todo
    responsibleParties?: number[], //member id list

    // for InProgress
    taskDuration?: Date[],

    // for OnReview
    membersWorkOn?: number[],    // member id list
    reviewers?: number[], // member id list
    endDate?: Date

}


export const product_backlogs: TaskType[] = [
    { id: 1, content: "Write user stories for new feature", status: Status.UNK },
    { id: 2, content: "Refactor authentication module", status: Status.UNK },
    { id: 3, content: "Research new technology for implementation", status: Status.UNK },
    { id: 4, content: "Update product documentation", status: Status.UNK },
    { id: 5, content: "Conduct user interviews for feedback", status: Status.UNK }
];

export const todo_list: TaskType[] = [
    { id: 6, content: "Implement user authentication logic", responsibleParties: [1, 2], status: Status.TODO },
    { id: 7, content: "Design UI components for dashboard", responsibleParties: [4], status: Status.TODO},
    { id: 8, content: "Write unit tests for user registration feature", responsibleParties: [1], status: Status.TODO}
];

export const inprogress_list: TaskType[] = [
    { id: 9, content: "Develop backend API endpoints", responsibleParties: [1], taskDuration: [new Date('2024-05-01'), new Date('2024-05-10')], status: Status.INPROGRESS },
    { id: 10, content: "Create database schema for new module", responsibleParties: [3], taskDuration: [new Date('2024-05-05'), new Date('2024-05-15')], status: Status.INPROGRESS }
];

export const onreview_list: TaskType[] = [
    { id: 11, content: "Code review for authentication module", responsibleParties: [2], reviewers: [3], taskDuration: [new Date('2024-05-10'), new Date('2024-05-20')], membersWorkOn: [1], endDate: new Date('2024-05-20'), status: Status.ONREVIEW },
    { id: 12, content: "Review UI mockups for user interface", responsibleParties: [4], reviewers: [2], taskDuration: [new Date('2024-05-15'), new Date('2024-05-25')], membersWorkOn: [3], endDate: new Date('2024-05-26'), status: Status.ONREVIEW }
];

export const done_list: TaskType[] = [
    { id: 13, content: "Complete user authentication feature", responsibleParties: [1], reviewers: [2], taskDuration: [new Date('2024-05-01'), new Date('2024-05-10')], membersWorkOn: [3], endDate: new Date('2024-05-09'), status: Status.DONE },
    { id: 14, content: "Deploy application to production server", responsibleParties: [2, 3], reviewers: [1], taskDuration: [new Date('2024-05-05'), new Date('2024-05-15')], membersWorkOn: [4], endDate: new Date('2024-05-15'), status: Status.DONE }
];
