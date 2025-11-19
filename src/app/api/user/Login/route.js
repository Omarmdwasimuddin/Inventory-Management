import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
import { CreateToken } from "@/utility/JWTTokenHelper";



export async function POST(req){
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;

        const prisma = new PrismaClient();
        const result = await prisma.user.findUnique({
            where: { email }
        })

        if (!result){
            return NextResponse.json(
                { status: 'fail', message: 'Invalid credentials'},
                {status: 401}
            )
        }
        if (password !== result.password){
            return NextResponse.json(
                { status: 'fail', message: 'Invalid Credentials' },
                { status: 401 }
            )
        }

        // Determine role
        let role = 'user'; // default role
        if (email === 'nazimrbl0103@gmail.com') role = 'admin';
        else if (email === 'salesmanage@gmail.com') role = 'sales';

        // Create JWT Token
        const token = await CreateToken(result.email, result.id, role);
        const expireDuration = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day

        const cookieString = `token=${token}; expires=${expireDuration.toUTCString()}; path=/`;

        return NextResponse.json(
            {
                status: 'success',
                data: {
                    token,
                    user: {
                        id: result.id,
                        email: result.email,
                        role
                    }
                }
            },
            {
                status: 200,
                headers: { "set-cookie": cookieString }
            }
        )


    } catch (error) {
        return NextResponse.json({status: 'fail', message: error.message});
    }
}