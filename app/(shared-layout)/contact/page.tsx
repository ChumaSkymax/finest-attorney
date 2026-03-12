"use client";

import { useState } from "react";
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
  SendIcon,
  CheckCircleIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Title from "@/components/web/Title";
import AnimatedContent from "@/components/web/AnimatedContent";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormState({ name: "", email: "", phone: "", message: "" });
  };

  const contactInfo = [
    {
      icon: MapPinIcon,
      label: "Office Address",
      value:
        '2nd Floor, NIC Life House Building, Wing "B", Sokoine Drive / Ohio Street',
      subValue: "P.O Box 31833, Dar es Salaam, Tanzania",
    },
    {
      icon: PhoneIcon,
      label: "Phone Number",
      value: "+255 684 615 956",
      subValue: null,
    },
    {
      icon: MailIcon,
      label: "Email Address",
      value: "info@finestattorneys.co.tz",
      subValue: null,
    },
    {
      icon: ClockIcon,
      label: "Working Hours",
      value: "Mon – Fri: 8:00 AM – 5:00 PM",
      subValue: "Sat – Sun: Closed",
    },
  ];

  return (
    <div className="relative mt-28 mb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Page Header */}
        <Title
          title="Speak With Us"
          description="We'd love to hear from you. Reach out for expert legal guidance, consultations, or any inquiries about our services."
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
          {/* Contact Info Side */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Gradient Info Card */}
            <AnimatedContent distance={40}>
              <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-2xl p-8 text-white shadow-xl shadow-primary/20">
                <h2 className="text-xl text-white dark:text-gray-100 font-semibold mb-2">
                  Finest Attorneys
                </h2>
                <p className="text-sm text-white dark:text-gray-100 mb-8 leading-relaxed">
                  Providing strategic, reliable and results-driven legal
                  services to both local and international clients since 2014.
                </p>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="bg-white/15 backdrop-blur-sm p-2.5 rounded-xl shrink-0">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-white dark:text-gray-100 uppercase tracking-wider mb-1">
                            {info.label}
                          </p>
                          <p className="text-sm font-medium leading-relaxed text-white dark:text-gray-100">
                            {info.value}
                          </p>
                          {info.subValue && (
                            <p className="text-sm text-white dark:text-gray-100 mt-0.5">
                              {info.subValue}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Decorative Element */}
                <div className="mt-8 pt-8 border-t border-white/15">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-3 w-3 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                      <span className="relative inline-flex size-2 rounded-full bg-green-400" />
                    </div>
                    <span className="text-sm text-white/70">
                      Available for consultations
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedContent>

            {/* Map Embed */}
            <AnimatedContent distance={40} delay={0.15}>
              <div className="rounded-2xl overflow-hidden border border-border shadow-sm h-[220px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.8!2d39.29!3d-6.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDknMTIuMCJTIDM5wrAxNyczMC4wIkU!5e0!3m2!1sen!2stz!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Finest Attorneys Office Location"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </AnimatedContent>
          </div>

          {/* Contact Form Side */}
          <AnimatedContent distance={40} delay={0.1} className="lg:col-span-3">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-sm">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-foreground">
                  Send Us a Message
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Fill in the form below and our legal team will get back to you
                  within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-foreground"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="h-12 rounded-xl bg-muted/50 border-border focus:border-primary focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-foreground"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="h-12 rounded-xl bg-muted/50 border-border focus:border-primary focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-foreground"
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+255 XXX XXX XXX"
                    value={formState.phone}
                    onChange={handleChange}
                    className="h-12 rounded-xl bg-muted/50 border-border focus:border-primary focus:ring-primary/20 transition-all"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground"
                  >
                    Your Message
                  </Label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us about your legal matter..."
                    value={formState.message}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl bg-muted/50 border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex items-center gap-4">
                  <Button
                    type="submit"
                    disabled={submitted}
                    className="h-12 px-8 rounded-xl text-sm font-medium cursor-pointer
                    bg-primary hover:bg-primary/90 text-white transition-all 
                    shadow-lg shadow-primary/25 hover:shadow-primary/40
                    disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {submitted ? (
                      <>
                        <CheckCircleIcon className="w-4 h-4 mr-2" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <SendIcon className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                  {submitted && (
                    <p className="text-sm text-green-600 dark:text-green-400 animate-in fade-in">
                      We'll get back to you shortly.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </div>
  );
}
