"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

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
          <h1 className="text-4xl font-bold mb-2 text-center animate-pulse bg-gray-200 h-10 w-3/4 mx-auto rounded"></h1>
          <p className="text-muted-foreground text-center mb-12 animate-pulse bg-gray-200 h-4 w-1/2 mx-auto rounded"></p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(null).map((_, index) => (
              <Card key={index} className="overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardHeader>
                  <CardTitle className="h-6 bg-gray-200 rounded w-3/4"></CardTitle>
                  <p className="text-sm text-muted-foreground h-4 bg-gray-200 rounded w-1/2 mt-2"></p>
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground h-12 bg-gray-200 rounded"></div>
                </CardContent>
                <CardFooter>
                  <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                </CardFooter>
              </Card>
            ))}
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
                      month: "numeric",
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