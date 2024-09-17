import { UserStatus, TaskPriority, TaskStatus } from "./enums";

export interface User {
    readonly uid: string;
    workplaces?: Workplace[];
    status?: UserStatus;
    lastActive?: number; // Unix timestamp in milliseconds
}

export interface Workplace {
    UID: string;
    owner: string;
    roles?: WorkplaceRole[];
    users?: string[];
    documents?: Document[];
    tasks?: Task[];
}

export interface Task {
    UID: string;
    description: string;
    assignees: string[];
    dueDate: number; // Unix timestamp in milliseconds
    priority: TaskPriority;
    status: TaskStatus;
    createdBy: string;
    createdAt: number; // Unix timestamp in milliseconds
}

export interface WorkplaceRole {
    UID: string;
    roleName: string;
    isOwner: boolean;
    canCreateDocuments: boolean;
    canSetDocumentPermissions: boolean;
    canManageMembers: boolean;
}

export interface Document {
    UID: string;
    title: string;
    filePath: string;
    lastModifiedAt: number; // Unix timestamp in milliseconds
    lastEditedBy?: string;
    collaborators?: string[];
    activeUsers?: string[];
    comments?: Comment[];
    versions?: DocumentVersion[];
    permissions?: DocumentPermission[];
}

export interface DocumentPermission {
    roleUID: string;
    canView: boolean;
    canEdit: boolean;
}

export interface Comment {
    UID: string;
    text: string;
    createdBy: string;
    createdAt: number; // Unix timestamp in milliseconds
    resolved: boolean;
}

export interface DocumentVersion {
    timestamp: number; // Unix timestamp in milliseconds
    user: string;
    content: string;
    changeSummary?: string;
}

export interface Notification {
    UID: string;
    userUID: string;
    message: string;
    relatedDocumentUID?: string;
    relatedTaskUID?: string;
    createdAt: number; // Unix timestamp in milliseconds
}
