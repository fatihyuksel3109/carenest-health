"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/language-provider";
import ReactMarkdown from "react-markdown"; // Import react-markdown
import rehypeRaw from "rehype-raw"; // Allow raw HTML in Markdown

interface Blog {
  _id: string;
  title: { en: string; tr: string };
  excerpt: { en: string; tr: string };
  content: { en: string; tr: string };
  image: string;
  date: string;
  author?: string;
}

export default function BlogPost() {
  const params = useParams();
  const { t, language } = useLanguage();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const id = Array.isArray(params.id) ? params.id[0] : params.id;
        const response = await fetch(`/api/blogs/${id}`);
        if (!response.ok) throw new Error("Failed to fetch blog post");
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchBlog();
    }
  }, [params.id]);

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

  if (!blog) {
    return (
      <div className="pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64 flex-col">
            <p className="text-lg mb-4">{t("blogs.notFound") || "Blog post not found"}</p>
            <Link href="/blogs" passHref>
              <Button>{t("blogs.back") || "Back to Blogs"}</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 py-12">
        <Link href="/blogs" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("blogs.back") || "Back to Blogs"}
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title[language]}</h1>

          <div className="flex items-center mb-6">
            <div className="mr-4">
              <p className="font-semibold">{blog.author || t("blogs.unknownAuthor") || "Unknown Author"}</p>
            </div>
            <div className="text-sm text-muted-foreground">
              {new Date(blog.date).toLocaleDateString(
                language === "tr" ? "tr-TR" : "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </div>
          </div>

          <div className="rounded-lg overflow-hidden mb-8">
            <Image
              src={blog.image || "https://via.placeholder.com/1200x500"}
              alt={blog.title[language]}
              width={1200}
              height={500}
              className="w-full h-auto object-cover"
              style={{ maxHeight: "500px" }}
            />
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {blog.content[language]}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}