import { UserStatus, DocumentChangeType, TaskPriority, TaskStatus } from "./enums";

// User schema references projects and tasks by their UIDs
export interface User {
    readonly uid: string;
    status: UserStatus;
    createdAt: number;  // Timestamp
    lastActive: number;  // Timestamp
    assignedTaskUIDs?: string[];  // Task UIDs assigned globally
    projectRoleUIDs?: string[];  // Project Role UIDs (references to ProjectRole)
}

// Project schema with role, document, and task UIDs
export interface Project {
    UID: string;
    title: string;
    description: string;
    owner: string;  // User ID of the owner
    createdAt: number;  // Timestamp
    updatedAt: number;  // Timestamp
    userRoleUIDs: string[];  // List of ProjectRole UIDs
    documentUIDs?: string[];  // List of Document UIDs
    taskUIDs?: string[];  // List of Task UIDs
}

// ProjectRole schema contains user and project UIDs
export interface ProjectRole {
    UID: string;  // Unique ID for this role
    userId: string;  // User ID
    projectId: string;  // Reference to the project
    roleName: string;  // e.g., 'owner', 'collaborator'
    canCreateDocuments: boolean;
    canEditDocuments: boolean;
    canAssignTasks: boolean;
    canManageUsers: boolean;
}

// Document schema references users, version history, permissions, comments, and tasks by their UIDs
export interface Document {
    UID: string;
    title: string;
    filePath: string;
    createdBy: string;  // User ID
    lastEditedBy?: string;  // User ID, optional
    createdAt: number;  // Timestamp
    updatedAt: number;  // Timestamp
    collaboratorUIDs: string[];  // User IDs of collaborators
    activeUserUIDs: string[];  // User IDs of currently editing users
    versionHistoryUIDs: string[];  // List of DocumentVersion UIDs
    //permissionUIDs: string[];  // List of DocumentPermission UIDs
    commentUIDs?: string[];  // Optional List of Comment UIDs
    taskUIDs?: string[];  // Optional List of Task UIDs related to the document
}

// DocumentPermission schema references project role by its UID
export interface DocumentPermission {
    UID: string;
    role: string;  // Project Role ID
    canView: boolean;
    canEdit: boolean;
}

// DocumentVersion schema references the user and contains change details
export interface DocumentVersion {
    UID: string;
    timestamp: number;  // When the version was created
    editedBy: string;  // User ID
    content: string;
    changeType: DocumentChangeType;
    changeSummary?: string;  // Optional summary of the change
}

// Comment schema references user by UID and contains comment data
export interface Comment {
    UID: string;
    text: string;
    createdBy: string;  // User ID
    createdAt: number;  // Timestamp
    resolved: boolean;
}

// Task schema references assigned user by UID and contains task details
export interface Task {
    UID: string;
    description: string;
    assignedToUID: string;  // User ID (could be array for multiple assignees)
    dueDate: number;  // Timestamp
    priority: TaskPriority;
    status: TaskStatus;
    createdBy: string;  // User ID
    createdAt: number;  // Timestamp
}

// Notification schema references project, document, and task by their UIDs
export interface Notification {
    UID: string;
    userUID: string;  // User ID for the notification
    message: string;
    relatedProjectUID?: string;  // Optional Project ID
    relatedDocumentUID?: string;  // Optional Document ID
    relatedTaskUID?: string;  // Optional Task ID
    createdAt: number;  // Timestamp
    read: boolean;
}
