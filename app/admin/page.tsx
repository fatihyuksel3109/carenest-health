"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/components/language-provider';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

// Mock blog data (would be fetched from API in a real app)
const mockBlogs = [
  {
    id: '1',
    title: 'The Importance of Compassionate Care',
    excerpt: 'Exploring how compassionate care can significantly improve the quality of life for individuals with complex care needs.',
    content: 'Full content here...',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: '2025-03-15',
  },
  {
    id: '2',
    title: 'Building Strong Support Networks',
    excerpt: 'How creating robust support networks can enhance the effectiveness of home care services and improve client outcomes.',
    content: 'Full content here...',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: '2025-02-28',
  },
];

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    // In a real app, you would fetch blogs from your API
    // Simulating API fetch
    const fetchBlogs = async () => {
      // const response = await fetch('/api/blogs');
      // const data = await response.json();
      // setBlogs(data);
      
      // Using mock data for now
      setBlogs(mockBlogs);
    };

    if (status === 'authenticated') {
      fetchBlogs();
    }
  }, [status]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateBlog = () => {
    setIsCreating(true);
    setIsEditing(false);
    setSelectedBlog(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      image: '',
    });
  };

  const handleEditBlog = (blog: Blog) => {
    setIsEditing(true);
    setIsCreating(false);
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image,
    });
  };

  const handleDeleteBlog = (id: string) => {
    // In a real app, you would call your API to delete the blog
    // Simulating API call
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(updatedBlogs);
    
    toast({
      title: 'Blog deleted',
      description: 'The blog post has been successfully deleted.',
    });
    
    if (selectedBlog?.id === id) {
      setSelectedBlog(null);
      setIsEditing(false);
      setIsCreating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isCreating) {
      // In a real app, you would call your API to create a new blog
      // Simulating API call
      const newBlog: Blog = {
        id: Date.now().toString(),
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        image: formData.image,
        date: new Date().toISOString().split('T')[0],
      };
      
      setBlogs([newBlog, ...blogs]);
      
      toast({
        title: 'Blog created',
        description: 'The blog post has been successfully created.',
      });
    } else if (isEditing && selectedBlog) {
      // In a real app, you would call your API to update the blog
      // Simulating API call
      const updatedBlogs = blogs.map((blog) =>
        blog.id === selectedBlog.id
          ? {
              ...blog,
              title: formData.title,
              excerpt: formData.excerpt,
              content: formData.content,
              image: formData.image,
            }
          : blog
      );
      
      setBlogs(updatedBlogs);
      
      toast({
        title: 'Blog updated',
        description: 'The blog post has been successfully updated.',
      });
    }
    
    setIsCreating(false);
    setIsEditing(false);
    setSelectedBlog(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      image: '',
    });
  };

  if (status === 'loading') {
    return (
      <div className="pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <p className="text-lg">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">{t('admin.title')}</h1>
        
        <Tabs defaultValue="blogs" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="blogs">Manage Blogs</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="blogs">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">{t('admin.blogs.title')}</h2>
                  <Button onClick={handleCreateBlog} size="sm">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    {t('admin.blogs.create')}
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {blogs.map((blog) => (
                    <Card key={blog.id} className="overflow-hidden">
                      <div className="h-32 overflow-hidden">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg">{blog.title}</CardTitle>
                        <CardDescription className="text-xs">
                          {new Date(blog.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="p-4 pt-0 flex justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditBlog(blog)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          {t('admin.blogs.edit')}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteBlog(blog.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          {t('admin.blogs.delete')}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div className="lg:col-span-2">
                {(isCreating || isEditing) && (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {isCreating
                          ? t('admin.blogs.create')
                          : t('admin.blogs.edit')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="title" className="text-sm font-medium">
                            {t('admin.blogs.form.title')}
                          </label>
                          <Input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="excerpt" className="text-sm font-medium">
                            Excerpt
                          </label>
                          <Textarea
                            id="excerpt"
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleInputChange}
                            rows={3}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="content" className="text-sm font-medium">
                            {t('admin.blogs.form.content')}
                          </label>
                          <Textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            rows={10}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="image" className="text-sm font-medium">
                            {t('admin.blogs.form.image')}
                          </label>
                          <Input
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            placeholder="https://example.com/image.jpg"
                            required
                          />
                        </div>
                        
                        <div className="flex justify-end space-x-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setIsCreating(false);
                              setIsEditing(false);
                              setSelectedBlog(null);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button type="submit">
                            {t('admin.blogs.form.submit')}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}
                
                {!isCreating && !isEditing && (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center p-8">
                      <h3 className="text-xl font-semibold mb-2">
                        Select a blog to edit or create a new one
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Use the buttons on the left to manage your blog posts
                      </p>
                      <Button onClick={handleCreateBlog}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        {t('admin.blogs.create')}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">{session?.user?.email}</p>
                  </div>
                  <div>
                    <p className="font-medium">Role</p>
                    <p className="text-muted-foreground">Administrator</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}