"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/language-provider';

// Mock blog data (would be fetched from API in a real app)
const mockBlogs = [
  {
    id: '1',
    title: 'The Importance of Compassionate Care',
    excerpt: 'Exploring how compassionate care can significantly improve the quality of life for individuals with complex care needs.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: '2025-03-15',
  },
  {
    id: '2',
    title: 'Building Strong Support Networks',
    excerpt: 'How creating robust support networks can enhance the effectiveness of home care services and improve client outcomes.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: '2025-02-28',
  },
  {
    id: '3',
    title: 'Innovations in Home Care Technology',
    excerpt: 'Exploring the latest technological advancements that are revolutionizing the delivery of complex care at home.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: '2025-02-10',
  },
  {
    id: '4',
    title: 'The Role of Nutrition in Complex Care',
    excerpt: 'Understanding how proper nutrition plays a crucial role in the overall well-being of individuals with complex care needs.',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: '2025-01-25',
  },
  {
    id: '5',
    title: 'Empowering Caregivers: Self-Care Strategies',
    excerpt: 'Essential self-care practices for caregivers to maintain their well-being while providing quality care to others.',
    image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: '2025-01-12',
  },
  {
    id: '6',
    title: 'Navigating Healthcare Systems',
    excerpt: 'A guide to help clients and families navigate complex healthcare systems and access the resources they need.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: '2024-12-30',
  },
];

export default function BlogsPage() {
  const { t } = useLanguage();
  const [blogs, setBlogs] = useState(mockBlogs);

  // In a real app, you would fetch blogs from your API
  useEffect(() => {
    // Simulating API fetch
    const fetchBlogs = async () => {
      // const response = await fetch('/api/blogs');
      // const data = await response.json();
      // setBlogs(data);
      
      // Using mock data for now
      setBlogs(mockBlogs);
    };

    fetchBlogs();
  }, []);

  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2 text-center">{t('blogs.title')}</h1>
        <p className="text-muted-foreground text-center mb-12">{t('blogs.subtitle')}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle>{blog.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {new Date(blog.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{blog.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Link href={`/blogs/${blog.id}`} passHref>
                  <Button variant="outline">{t('blogs.readMore')}</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}