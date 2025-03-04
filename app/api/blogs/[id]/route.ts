import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    const client = await clientPromise;
    const db = client.db('carenest');
    
    let blog;
    try {
      // Try to find by ObjectId
      blog = await db.collection('blogs').findOne({ _id: new ObjectId(id) });
    } catch (e) {
      // If not a valid ObjectId, try to find by string id
      blog = await db.collection('blogs').findOne({ id: id });
    }
    
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const id = params.id;
    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db('carenest');
    
    const updateData = {
      title: data.title,
      excerpt: data.excerpt || '',
      content: data.content,
      image: data.image || '',
      updatedAt: new Date().toISOString(),
    };
    
    let result;
    try {
      // Try to update by ObjectId
      result = await db.collection('blogs').updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );
    } catch (e) {
      // If not a valid ObjectId, try to update by string id
      result = await db.collection('blogs').updateOne(
        { id: id },
        { $set: updateData }
      );
    }
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const id = params.id;
    
    const client = await clientPromise;
    const db = client.db('carenest');
    
    let result;
    try {
      // Try to delete by ObjectId
      result = await db.collection('blogs').deleteOne({ _id: new ObjectId(id) });
    } catch (e) {
      // If not a valid ObjectId, try to delete by string id
      result = await db.collection('blogs').deleteOne({ id: id });
    }
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}