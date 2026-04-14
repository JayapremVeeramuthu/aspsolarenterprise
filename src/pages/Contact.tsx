import { useState } from "react";
import { motion } from "framer-motion";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/Animations";
import { contactInfo } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { sendToWhatsApp } from "@/utils/whatsapp";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
    setForm({ name: "", email: "", phone: "", company: "", message: "" });
  };

  const handleWhatsAppContact = () => {
    const parts: string[] = [];
    if (form.name) parts.push(`Name: ${form.name}`);
    if (form.email) parts.push(`Email: ${form.email}`);
    if (form.phone) parts.push(`Phone: ${form.phone}`);
    if (form.company) parts.push(`Company: ${form.company}`);
    
    const message = `Hello ASP Solar!\n\n${parts.length > 0 ? parts.join("\n") + "\n\n" : ""}${form.message || "I'd like to learn more about your products."}`;
    sendToWhatsApp(message);
  };

  const infoCards = [
    { icon: MapPin, title: "Address", value: contactInfo.address },
    { icon: Phone, title: "Phone", value: contactInfo.phone.join(" / ") },
    { icon: Mail, title: "Email", value: contactInfo.email },
    { icon: Clock, title: "Hours", value: contactInfo.hours },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <FadeUp className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-gray-400 max-w-xl mx-auto">Have questions? Need a bulk quote? We're here to help.</p>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {infoCards.map(card => (
            <StaggerItem key={card.title}>
              <motion.div whileHover={{ y: -4 }} className="bg-gray-800 shadow-md border border-gray-700 rounded-xl p-5 text-center hover:shadow-[var(--shadow-hover)] transition-shadow">
                <card.icon className="w-6 h-6 mx-auto mb-3 text-primary" />
                <p className="text-sm font-semibold mb-1">{card.title}</p>
                {card.title === "Email" ? (
                  <a href={`mailto:${card.value}`} className="text-xs text-gray-400 hover:text-primary transition-colors block">
                    {card.value}
                  </a>
                ) : (
                  <p className="text-xs text-gray-400">{card.value}</p>
                )}
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="grid md:grid-cols-2 gap-10">
          <FadeUp>
            <div className="bg-gray-800 shadow-md border border-gray-700 rounded-2xl p-8">
              <h2 className="font-display text-xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Your Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  <Input placeholder="Email" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  <Input placeholder="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                </div>
                <Textarea placeholder="Tell us about your requirements, quantity needed, or any questions..." rows={5} required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                <div className="grid grid-cols-2 gap-3">
                  <Button type="submit" className="bg-solar-gradient text-primary-foreground hover:opacity-90 h-12" size="lg">
                    <Send className="w-4 h-4 mr-2" /> Send Email
                  </Button>
                  <Button
                    type="button"
                    onClick={handleWhatsAppContact}
                    className="h-12 bg-green-500 text-white hover:bg-green-400 text-white font-semibold shadow-[0_0_15px_rgba(37,211,102,0.2)] hover:shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all duration-300"
                    size="lg"
                  >
                    <WhatsAppIcon className="w-4 h-4 mr-2" /> WhatsApp Us
                  </Button>
                </div>
              </form>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="rounded-2xl overflow-hidden h-full min-h-[400px]">
              <iframe 
                src="https://www.google.com/maps?q=233B%20Kurunthampattu%20Road%20Mangampunjai%20Kallal%20630305%20Tamil%20Nadu%20India&output=embed"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ASP Solar Location"
              />
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
};

export default Contact;
