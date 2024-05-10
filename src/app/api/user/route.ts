import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {

        const users = await prisma.user.findMany();
        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
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
        const { firstname, lastname, email } = await request.json();
        const newUser = await prisma.user.create({
            data: {
                firstname,
                lastname,
                email,
            },
        });
        return NextResponse.json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.error();
    } finally {
        await prisma.$disconnect();
    }
}