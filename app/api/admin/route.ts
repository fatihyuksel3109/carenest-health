// app/api/admin/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

export async function GET(req: NextRequest) {
  console.log('GET /api/admin called');
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== 'admin') {
    console.log('Unauthorized access attempt');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    console.log('Fetching admin with _id:', session.user.id);
    const admin = await db.collection('admin').findOne({ _id: new ObjectId(session.user.id) }); // Changed from "admins" to "admin"

    if (!admin) {
      console.log('Admin not found in database for id:', session.user.id);
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    console.log('Returning admin data:', admin);
    return NextResponse.json({
      id: admin._id.toString(),
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });
  } catch (error) {
    console.error('Error fetching admin data:', error);
    return NextResponse.json({ error: 'Failed to fetch admin data' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  console.log('PUT /api/admin called');
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== 'admin') {
    console.log('Unauthorized update attempt');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, email, password } = await req.json();
    console.log('Received update data:', { name, email, password });

    // Validate input
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    // Prepare update data
    const updateData: { name: string; email: string; password?: string } = {
      name,
      email,
    };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10); // Hash new password
    }

    // Update admin in database
    console.log('Updating admin with _id:', session.user.id);
    const result = await db.collection('admin').updateOne(
      { _id: new ObjectId(session.user.id) }, // Changed from "admins" to "admin"
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      console.log('No admin found to update for id:', session.user.id);
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    console.log('Updated admin data in database:', { name, email });
    return NextResponse.json({
      success: true,
      data: { id: session.user.id, name, email, role: 'admin' },
    });
  } catch (error) {
    console.error('Error updating admin data:', error);
    return NextResponse.json({ error: 'Failed to update admin data' }, { status: 500 });
  }
}