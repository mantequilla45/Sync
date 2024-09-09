export enum UserStatus {
    Online = 'Online',
    Offline = 'Offline',
    Away = 'Away',
    DoNotDisturb = 'Do Not Disturb'
}

export interface User{
    UID: string;
    email: string;
    profilePicure?: string;
    roles?: Workplace[];
    status?: UserStatus;
    lastActive?: Date;
}

export interface Workplace{
    UID: string;
    owner: User;
    roles?: Role[];
    users?: User[];
    documments?: string
}

export interface Role {
    isOwner: boolean;
    canEdit: boolean;
    canManageMembers: boolean;
}

export interface Document {
    UID: string;
    title: string;
    content: string; 
    dateLastModified: Date;
    modifiedBy?: User; 
    collaborators?: User[]; 
    changes: DocumentChange[];
}

export interface DocumentChange {
    timestamp: Date;
    user: User; 
    changeType: 'insert' | 'update' | 'delete'; 
    content: string;
    position?: { start: number; end: number }; 
}
