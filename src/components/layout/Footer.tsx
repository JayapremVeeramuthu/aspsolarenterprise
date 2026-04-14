import { Link } from "react-router-dom";
import { Sun, Mail, Phone, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { contactInfo } from "@/data/products";

export const Footer = () => (
  <footer className="bg-foreground text-background py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-solar-gradient flex items-center justify-center">
              <Sun className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">ASP Solar</span>
          </div>
          <p className="text-background/60 text-sm leading-relaxed mb-4">
            Powering India with smart energy solutions. Quality solar products for homes, offices and industries.
          </p>
          {/* WhatsApp CTA in footer */}
          <a
            href="https://wa.me/919003028001?text=Hi%2C%20I%27m%20interested%20in%20your%20solar%20products"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-white text-white text-sm font-semibold hover:bg-green-400 transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Chat with us
          </a>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[{ l: "Products", t: "/products" }, { l: "About Us", t: "/about" }, { l: "Contact", t: "/contact" }].map(n => (
              <Link key={n.t} to={n.t} className="text-sm text-background/60 hover:text-primary transition-colors">{n.l}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Categories</h4>
          <div className="flex flex-col gap-2">
            {[
              { name: "Solar Panels", slug: "solar-panels" },
              { name: "Solar Lights", slug: "solar-lights" },
              { name: "Extension Boards", slug: "extension-boards" },
              { name: "Accessories", slug: "accessories" },
            ].map(c => (
              <Link key={c.slug} to={`/products?category=${c.slug}`} className="text-sm text-background/60 hover:text-primary transition-colors">{c.name}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-background/60">
            <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" />{contactInfo.address}</div>
            <a href={`tel:${contactInfo.phone[0].replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4 shrink-0" />{contactInfo.phone[0]}
            </a>
            <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="w-4 h-4 shrink-0" />{contactInfo.email}
            </a>
            <a
              href="https://wa.me/919003028001"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#25D366] transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0" />
              {contactInfo.whatsapp}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10 mt-12 pt-8 text-center text-sm text-background/40">
        © {new Date().getFullYear()} ASP Solar Enterprise. All rights reserved.
      </div>
    </div>
  </footer>
);
