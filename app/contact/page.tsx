"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/components/language-provider";
import { Mail, Phone, MapPin } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: t("contact.form.success"),
      description: "We will get back to you as soon as possible.",
    });

    reset();
    setIsSubmitting(false);
  };

  // Simulate loading state (e.g., for initial data fetch or map loading)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an initial data fetch or map load
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="pt-24">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-2 text-center animate-pulse bg-gray-200 h-10 w-3/4 mx-auto rounded"></h1>
          <p className="text-muted-foreground text-center mb-12 animate-pulse bg-gray-200 h-4 w-1/2 mx-auto rounded"></p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="bg-card p-8 rounded-lg shadow-md mb-8 animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                <div className="space-y-6">
                  {Array(3).fill(null).map((_, index) => (
                    <div key={index} className="flex items-start">
                      <div className="h-6 w-6 bg-gray-200 rounded mr-4 mt-1"></div>
                      <div>
                        <div className="h-5 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div className="h-12 bg-gray-200 rounded w-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card p-8 rounded-lg shadow-md animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                <div className="space-y-4">
                  {Array(3).fill(null).map((_, index) => (
                    <div key={index} className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-md animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="space-y-6">
                <div className="h-10 bg-gray-200 rounded w-full"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
                <div className="h-32 bg-gray-200 rounded w-full"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>

          <div className="mt-12 animate-pulse">
            <div className="rounded-lg overflow-hidden shadow-lg h-[400px] bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2 text-center">{t("contact.title")}</h1>
        <p className="text-muted-foreground text-center mb-12">{t("contact.subtitle")}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="bg-card p-8 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-muted-foreground">
                      123 Care Street<br />
                      City, State 12345<br />
                      Country
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground">info@carenest.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Office Hours</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  {t("contact.form.name")}
                </label>
                <Input
                  id="name"
                  {...register("name")}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {t("contact.form.email")}
                </label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  {t("contact.form.message")}
                </label>
                <Textarea
                  id="message"
                  rows={5}
                  {...register("message")}
                  className={errors.message ? "border-destructive" : ""}
                />
                {errors.message && (
                  <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : t("contact.form.submit")}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12">
          <div className="rounded-lg overflow-hidden shadow-lg h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059353029!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1619120778521!5m2!1sen!2sca"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Carenest Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}