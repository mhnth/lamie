import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prismadb';
import { revalidatePath } from 'next/cache';
import { formDataToObject } from '@/lib/utils';
import { UserLoginData } from '@/lib/types';
import { createAuthHeaders } from '../utils';

export async function POST(req: Request) {
  console.log('user');
  const formData = await req.formData();

  const userData = formDataToObject<UserLoginData>(formData);

  if (!userData)
    return NextResponse.json(
      { error: 'Input data is missing or empty!' },
      { status: 401 },
    );

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        username: userData.username,
      },
    });

    const { password, ...userWithoutPassword } = newUser;

    const headers = createAuthHeaders(userWithoutPassword);

    revalidatePath('/');

    return NextResponse.json(
      { data: userWithoutPassword },
      {
        status: 200,
        headers,
      },
    );
  } catch (err) {
    console.log('ERR register user:', err);

    if ((err as any).code == 'P2002')
      return NextResponse.json(
        { error: 'This email/username already exist, please choose another' },
        { status: 400 },
      );

    return NextResponse.json({ error: 'Register Failed' }, { status: 400 });
  }
}
