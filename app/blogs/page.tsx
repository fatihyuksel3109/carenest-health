"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import Image from "next/image";
import ReactMarkdown from "react-markdown"; // Add this
import rehypeRaw from "rehype-raw"; // Add this

interface Blog {
  _id: string;
  title: { en: string; tr: string };
  excerpt: { en: string; tr: string };
  content: { en: string; tr: string };
  image: string;
  date: string;
  author?: string;
}

export default function BlogsPage() {
  const { t, language } = useLanguage();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <p className="text-lg">{t("blogs.loading") || "Loading..."}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2 text-center">{t("blogs.title")}</h1>
        <p className="text-muted-foreground text-center mb-12">{t("blogs.subtitle")}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Card key={blog._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <Image
                  src={blog.image || "https://via.placeholder.com/800x600"}
                  alt={blog.title[language]}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle>{blog.title[language]}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {new Date(blog.date).toLocaleDateString(
                    language === "tr" ? "tr-TR" : "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground prose dark:prose-invert">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {blog.excerpt[language]}
                  </ReactMarkdown>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/blogs/${blog._id}`} passHref>
                  <Button variant="outline">{t("blogs.readMore")}</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}