import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import clientPromise from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('carenest');
    
    const blogs = await db.collection('blogs').find({}).sort({ date: -1 }).toArray();
    
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const data = await request.json();
    
    if (!data.title || !data.content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db('carenest');
    
    const blog = {
      title: data.title,
      excerpt: data.excerpt || '',
      content: data.content,
      image: data.image || '',
      date: new Date().toISOString(),
      author: session.user?.name || 'Admin',
    };
    
    const result = await db.collection('blogs').insertOne(blog);
    
    return NextResponse.json({ 
      id: result.insertedId,
      ...blog 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}