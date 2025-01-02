import { NextRequest, NextResponse } from 'next/server';

// Define types for role and member
type Role = 'admin' | 'member' | 'viewer';

interface Member {
    userId: string;
    roles: Role[];
}

interface RequestBody {
    projectId: string;
    members: Member[];
}

// Custom error class for validation
class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

// Validate request body without zod
function validateRequestBody(body: any): RequestBody {
    if (!body.projectId || typeof body.projectId !== 'string') {
        throw new ValidationError('Invalid or missing projectId');
    }

    if (!Array.isArray(body.members)) {
        throw new ValidationError('members must be an array');
    }

    const validRoles = ['admin', 'member', 'viewer'];
    
    body.members.forEach((member: any, index: number) => {
        if (!member.userId || typeof member.userId !== 'string') {
            throw new ValidationError(`Invalid or missing userId at index ${index}`);
        }
        
        if (!Array.isArray(member.roles)) {
            throw new ValidationError(`roles must be an array at index ${index}`);
        }

        member.roles.forEach((role: any) => {
            if (!validRoles.includes(role)) {
                throw new ValidationError(`Invalid role: ${role}. Must be one of: ${validRoles.join(', ')}`);
            }
        });
    });

    return body as RequestBody;
}

// Error handler utility
function handleError(error: unknown): NextResponse {
    console.error('Error:', error);
    
    if (error instanceof ValidationError) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }

    // Generic error handling for unknown errors
    return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
    );
}

// Main POST handler
export async function POST(request: NextRequest) {
    try {
        // Parse and validate request body
        const rawBody = await request.json();
        const body = validateRequestBody(rawBody);

        // Example implementation (replace with your actual database logic):
        const updatedMembers = await updateMemberRoles(body.projectId, body.members);

        return NextResponse.json({
            success: true,
            data: {
                projectId: body.projectId,
                members: updatedMembers
            }
        });

    } catch (error) {
        return handleError(error);
    }
}

// Example GET handler to fetch current member roles
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const projectId = searchParams.get('projectId');

        if (!projectId) {
            throw new ValidationError('Project ID is required');
        }

        // Example implementation (replace with your actual database logic):
        const members = await getMemberRoles(projectId);

        return NextResponse.json({
            success: true,
            data: {
                projectId,
                members
            }
        });

    } catch (error) {
        return handleError(error);
    }
}

// Mock database functions (replace these with your actual database implementations)
async function updateMemberRoles(projectId: string, members: Member[]): Promise<Member[]> {
    // Implement your database update logic here
    return members;
}

async function getMemberRoles(projectId: string): Promise<Member[]> {
    // Implement your database query logic here
    return [];
}
