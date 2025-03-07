"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/components/language-provider";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import Image from "next/image";

interface Blog {
  _id: string;
  title: { en: string; tr: string };
  excerpt: { en: string; tr: string };
  content: { en: string; tr: string };
  image: string;
  date: string;
  author?: string;
}

interface AdminData {
  id: string;
  name: string;
  email: string;
  role: string;
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
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: { en: "", tr: "" },
    excerpt: { en: "", tr: "" },
    content: { en: "", tr: "" },
    image: "",
  });

  // Admin settings state
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [adminForm, setAdminForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isEditingAdmin, setIsEditingAdmin] = useState(false);

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Fetch blogs error:", error);
        toast({
          title: "Error",
          description: "Failed to load blogs",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated") {
      console.log("Authenticated, fetching blogs");
      fetchBlogs();
    }
  }, [status, toast]);

  // Fetch admin data
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        console.log("Fetching admin data with session:", session);
        const response = await fetch("/api/admin");
        if (!response.ok) throw new Error("Failed to fetch admin data");
        const data = await response.json();
        setAdminData(data);
        setAdminForm({ name: data.name, email: data.email, password: "" });
      } catch (error) {
        console.error("Fetch admin error:", error);
        toast({
          title: "Error",
          description: "Failed to load admin data",
          variant: "destructive",
        });
      }
    };

    if (status === "authenticated") {
      fetchAdminData();
    }
  }, [status, toast]);

  // Redirect if unauthenticated
  useEffect(() => {
    console.log("Session status:", status, "Session data:", session);
    if (status === "unauthenticated") {
      console.log("Unauthenticated, redirecting to /admin/login");
      router.push("/admin/login");
    }
  }, [status, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    lang: "en" | "tr"
  ) => {
    const { name, value } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: value }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: { ...prev[name as "title" | "excerpt" | "content"], [lang]: value },
      }));
    }
  };

  const handleAdminInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateBlog = () => {
    setIsCreating(true);
    setIsEditing(false);
    setSelectedBlog(null);
    setFormData({
      title: { en: "", tr: "" },
      excerpt: { en: "", tr: "" },
      content: { en: "", tr: "" },
      image: "",
    });
  };

  const handleEditBlog = (blog: Blog) => {
    setIsEditing(true);
    setIsCreating(false);
    setSelectedBlog(blog);
    setFormData({
      title: { en: blog.title.en, tr: blog.title.tr },
      excerpt: { en: blog.excerpt.en, tr: blog.excerpt.tr },
      content: { en: blog.content.en, tr: blog.content.tr },
      image: blog.image,
    });
  };

  const handleDeleteBlog = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete blog");
      setBlogs(blogs.filter((blog) => blog._id !== id));
      toast({
        title: "Blog deleted",
        description: "The blog post has been successfully deleted.",
      });
      if (selectedBlog?._id === id) {
        setSelectedBlog(null);
        setIsEditing(false);
        setIsCreating(false);
      }
    } catch (error) {
      console.error("Delete blog error:", error);
      toast({
        title: "Error",
        description: "Failed to delete blog",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isCreating) {
        const response = await fetch("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error("Failed to create blog");
        const newBlog = await response.json();
        setBlogs([newBlog, ...blogs]);
        toast({
          title: "Blog created",
          description: "The blog post has been successfully created.",
        });
      } else if (isEditing && selectedBlog) {
        const response = await fetch(`/api/blogs/${selectedBlog._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error("Failed to update blog");
        await response.json();
        if (!selectedBlog) throw new Error("Selected blog is null");
        const updatedBlog: Blog = {
          _id: selectedBlog._id,
          date: selectedBlog.date,
          author: selectedBlog.author,
          title: formData.title,
          excerpt: formData.excerpt,
          content: formData.content,
          image: formData.image,
        };
        setBlogs(
          blogs.map((blog) =>
            blog._id === selectedBlog._id ? updatedBlog : blog
          )
        );
        toast({
          title: "Blog updated",
          description: "The blog post has been successfully updated.",
        });
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast({
        title: "Error",
        description: isCreating ? "Failed to create blog" : "Failed to update blog",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
      setIsEditing(false);
      setSelectedBlog(null);
      setFormData({
        title: { en: "", tr: "" },
        excerpt: { en: "", tr: "" },
        content: { en: "", tr: "" },
        image: "",
      });
      setIsLoading(false);
    }
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminForm),
      });
      if (!response.ok) throw new Error("Failed to update admin data");
      const updatedData = await response.json();
      setAdminData(updatedData.data);
      setIsEditingAdmin(false);
      toast({
        title: "Admin updated",
        description: "Your account information has been successfully updated.",
      });

      // If email or password changed, sign out to force re-authentication
      if (
        adminForm.email !== session?.user?.email ||
        adminForm.password
      ) {
        await signOut({ redirect: false });
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Admin update error:", error);
      toast({
        title: "Error",
        description: "Failed to update admin data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="pt-24">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8 animate-pulse bg-gray-200 h-10 w-1/2 rounded"></h1>

          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-full mb-8"></div> {/* Tabs placeholder */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div> {/* Blog list title */}
                <div className="space-y-4">
                  {Array(3).fill(null).map((_, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="h-32 bg-gray-200 rounded-t-lg"></div>
                      <CardHeader className="p-4">
                        <CardTitle className="h-6 bg-gray-200 rounded w-3/4"></CardTitle>
                        <CardDescription className="h-4 bg-gray-200 rounded w-1/2 mt-2"></CardDescription>
                      </CardHeader>
                      <CardFooter className="p-4 pt-0 flex justify-between">
                        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="h-8 bg-gray-200 rounded w-1/3"></CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Tabs defaultValue="en" className="w-full">
                        <TabsList className="mb-4">
                          <div className="h-10 bg-gray-200 rounded w-1/4"></div> {/* Tabs placeholder */}
                        </TabsList>
                        <TabsContent value="en">
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-1/6"></div> {/* Label */}
                            <div className="h-10 bg-gray-200 rounded w-full"></div> {/* Input */}
                          </div>
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-1/6"></div> {/* Label */}
                            <div className="h-20 bg-gray-200 rounded w-full"></div> {/* Textarea */}
                          </div>
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-1/6"></div> {/* Label */}
                            <div className="h-40 bg-gray-200 rounded w-full"></div> {/* Textarea */}
                          </div>
                        </TabsContent>
                        <TabsContent value="tr">
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-1/6"></div> {/* Label */}
                            <div className="h-10 bg-gray-200 rounded w-full"></div> {/* Input */}
                          </div>
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-1/6"></div> {/* Label */}
                            <div className="h-20 bg-gray-200 rounded w-full"></div> {/* Textarea */}
                          </div>
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-1/6"></div> {/* Label */}
                            <div className="h-40 bg-gray-200 rounded w-full"></div> {/* Textarea */}
                          </div>
                        </TabsContent>
                      </Tabs>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/6"></div> {/* Label */}
                        <div className="h-10 bg-gray-200 rounded w-full"></div> {/* Input */}
                      </div>
                      <div className="flex justify-end space-x-4">
                        <div className="h-10 bg-gray-200 rounded w-1/4"></div> {/* Cancel button */}
                        <div className="h-10 bg-gray-200 rounded w-1/4"></div> {/* Submit button */}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="mt-8 animate-pulse">
            <Card>
              <CardHeader>
                <CardTitle className="h-8 bg-gray-200 rounded w-1/3"></CardTitle>
                <CardDescription className="h-4 bg-gray-200 rounded w-1/2"></CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array(3).fill(null).map((_, index) => (
                    <div key={index}>
                      <div className="h-4 bg-gray-200 rounded w-1/6"></div> {/* Label */}
                      <div className="h-6 bg-gray-200 rounded w-3/4 mt-1"></div> {/* Value */}
                    </div>
                  ))}
                  <div className="h-10 bg-gray-200 rounded w-1/4"></div> {/* Edit button */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null; // Redirect handled by useEffect
  }

  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">{t("admin.title")}</h1>

        <Tabs defaultValue="blogs" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="blogs">{t("admin.blogs.manage") || "Manage Blogs"}</TabsTrigger>
            <TabsTrigger value="settings">{t("admin.blogs.settings") || "Settings"}</TabsTrigger>
          </TabsList>

          <TabsContent value="blogs">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">{t("admin.blogs.title")}</h2>
                  <Button onClick={handleCreateBlog} size="sm" disabled={isLoading}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    {t("admin.blogs.create")}
                  </Button>
                </div>

                <div className="space-y-4">
                  {blogs.map((blog) => (
                    <Card key={blog._id} className="overflow-hidden">
                      <div className="h-32 overflow-hidden">
                        <Image
                          src={blog.image || "https://via.placeholder.com/400x400"}
                          alt={blog.title.en}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg">{blog.title.en}</CardTitle>
                        <CardDescription className="text-xs">
                          {new Date(blog.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="p-4 pt-0 flex justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditBlog(blog)}
                          disabled={isLoading}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          {t("admin.blogs.edit")}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteBlog(blog._id)}
                          disabled={isLoading}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          {t("admin.blogs.delete")}
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
                        {isCreating ? t("admin.blogs.create") : t("admin.blogs.edit")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <Tabs defaultValue="en" className="w-full">
                          <TabsList className="mb-4">
                            <TabsTrigger value="en">English</TabsTrigger>
                            <TabsTrigger value="tr">Turkish</TabsTrigger>
                          </TabsList>

                          <TabsContent value="en">
                            <div className="space-y-2">
                              <label htmlFor="title-en" className="text-sm font-medium">
                                Title (English)
                              </label>
                              <Input
                                id="title-en"
                                name="title"
                                value={formData.title.en}
                                onChange={(e) => handleInputChange(e, "en")}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="excerpt-en" className="text-sm font-medium">
                                Excerpt (English)
                              </label>
                              <Textarea
                                id="excerpt-en"
                                name="excerpt"
                                value={formData.excerpt.en}
                                onChange={(e) => handleInputChange(e, "en")}
                                rows={3}
                              />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="content-en" className="text-sm font-medium">
                                Content (English)
                              </label>
                              <Textarea
                                id="content-en"
                                name="content"
                                value={formData.content.en}
                                onChange={(e) => handleInputChange(e, "en")}
                                rows={10}
                                required
                              />
                            </div>
                          </TabsContent>

                          <TabsContent value="tr">
                            <div className="space-y-2">
                              <label htmlFor="title-tr" className="text-sm font-medium">
                                Title (Turkish)
                              </label>
                              <Input
                                id="title-tr"
                                name="title"
                                value={formData.title.tr}
                                onChange={(e) => handleInputChange(e, "tr")}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="excerpt-tr" className="text-sm font-medium">
                                Excerpt (Turkish)
                              </label>
                              <Textarea
                                id="excerpt-tr"
                                name="excerpt"
                                value={formData.excerpt.tr}
                                onChange={(e) => handleInputChange(e, "tr")}
                                rows={3}
                              />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="content-tr" className="text-sm font-medium">
                                Content (Turkish)
                              </label>
                              <Textarea
                                id="content-tr"
                                name="content"
                                value={formData.content.tr}
                                onChange={(e) => handleInputChange(e, "tr")}
                                rows={10}
                                required
                              />
                            </div>
                          </TabsContent>
                        </Tabs>

                        <div className="space-y-2">
                          <label htmlFor="image" className="text-sm font-medium">
                            {t("admin.blogs.form.image")}
                          </label>
                          <Input
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={(e) => handleInputChange(e, "en")}
                            placeholder="https://example.com/image.jpg"
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
                            disabled={isLoading}
                          >
                            Cancel
                          </Button>
                          <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Submitting..." : t("admin.blogs.form.submit")}
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
                        {t("admin.blogs.editCreateTitle") || "Select a blog to edit or create a new one"}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {t("admin.blogs.editCreateText") || "Use the buttons on the left to manage your blog posts"}
                      </p>
                      <Button onClick={handleCreateBlog} disabled={isLoading}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        {t("admin.blogs.create")}
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
                <CardTitle>{t("admin.account.settings") || "Account Settings"}</CardTitle>
                <CardDescription>
                  {t("admin.account.manage") || "Manage your account settings and preferences"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isEditingAdmin ? (
                  <form onSubmit={handleAdminSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <Input
                        id="name"
                        name="name"
                        value={adminForm.name}
                        onChange={handleAdminInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={adminForm.email}
                        onChange={handleAdminInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium">New Password (optional)</label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={adminForm.password}
                        onChange={handleAdminInputChange}
                        placeholder="Leave blank to keep current password"
                      />
                    </div>
                    <div className="flex justify-end space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditingAdmin(false)}
                        disabled={isLoading}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Name</p>
                      <p className="text-muted-foreground">{adminData?.name || "Loading..."}</p>
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">{adminData?.email || "Loading..."}</p>
                    </div>
                    <div>
                      <p className="font-medium">Role</p>
                      <p className="text-muted-foreground">{adminData?.role || "Loading..."}</p>
                    </div>
                    <Button onClick={() => setIsEditingAdmin(true)} disabled={isLoading || !adminData}>
                      Edit Profile
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}