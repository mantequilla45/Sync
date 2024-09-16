export enum UserStatus {
    Online = 'Online',
    Offline = 'Offline',
    Away = 'Away',
    DoNotDisturb = 'Do Not Disturb'
}

export interface User{
    UID: string;
    email: string;
    roles?: Workplace[];
    status?: UserStatus;
    lastActive?: Date;
}

export interface Workplace{
    UID: string;
    owner: string; //user.uid
    roles?: WorkplaceRole[];
    users?: string[]; //user.uid
    documments?: Document[];
    tasks?: Task[];
}

export interface Task{
    UID: string;
    description: string;
    assignee: string[]; // user.uid
    dueDate: Date;
    priority: 'low' | 'medium' | 'high';
    status: 'open' | 'in-progress' | 'completed';
    createdBy: string;
    createdAt: Date;
}

export interface WorkplaceRole {
    UID: string; // Unique identifier for the role
    roleName: string; // Name of the role (e.g., Admin, Editor, Viewer)
    isOwner: boolean; // Indicates if the user with this role is an owner of the workplace
    canCreate: boolean; // Indicates if users with this role can create new documents
    canSetDocPerms: boolean; // Indicates if users with this role can set permissions for documents
    canManageMembers: boolean; // Indicates if users with this role can manage other members
}

export interface Document {
    UID: string; // Unique identifier for the document
    title: string; // Title of the document
    filePath: string; // Filepath in Firebase Storage
    dateLastModified: Date; // Date when the document was last modified
    lastEditedBy?: string; // User UID of the last person who edited the document
    collaborators?: string[]; // List of user UIDs who are collaborators on this document
    presence?: string[]; // List of user UIDs currently viewing or editing the document
    comments?: string[]; // List of comment UIDs or IDs related to this document
    documentVersions?: DocumentVersion[]; // List of versions of the document
    permissions?: DocumentPerms[]; // List of permissions associated with the document
}

export interface DocumentPerms {
    roleUID: string; // Reference to the WorkplaceRole that defines permissions
    canSee: boolean; // Indicates if users with this role can view the document
    canEdit: boolean; // Indicates if users with this role can edit the document
}

export interface Comments {
    UID: string;
    commentText: string;
    createdBy: string; //user.uid
    createdAt: Date;
    resolved: boolean;
}

export interface DocumentVersion {
    timestamp: Date;
    user: string; //user.uid 
    changeType: 'insert' | 'update' | 'delete'; 
    content: string;
    changeSummary?: string;
    //position?: { start: number; end: number };
}

export interface Notifications{
    UID: string;
    user: string; //user.uid
    message: string;
    relatedDocument: string; //documentID
    relatedTask: string; //taskID
    createdAt: Date;
}