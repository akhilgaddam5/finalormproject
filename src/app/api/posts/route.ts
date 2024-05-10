import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const posts = await prisma.post.findMany();
        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function POST(request: NextRequest) {
    try {
        if (request.method !== 'POST') {
            return NextResponse.error();
        }
        const { authorId, content } = await request.json();
        const authorIdNumber = Number(authorId);
        const newPost = await prisma.post.create({
            data: {
                authorId:authorIdNumber,
                content
            },
        });
        return NextResponse.json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.error();
    } finally {
        await prisma.$disconnect();
    }
}

