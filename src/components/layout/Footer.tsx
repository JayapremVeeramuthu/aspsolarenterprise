import { Link } from "react-router-dom";
import { Sun, Mail, Phone, MapPin } from "lucide-react";
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
          <p className="text-background/60 text-sm leading-relaxed">
            Powering India with smart energy solutions. Quality solar products for homes, offices and industries.
          </p>
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
            {["Solar Panels", "Solar Lights", "Extension Boards", "Accessories"].map(c => (
              <Link key={c} to="/products" className="text-sm text-background/60 hover:text-primary transition-colors">{c}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-background/60">
            <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" />{contactInfo.address}</div>
            <div className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" />{contactInfo.phone[0]}</div>
            <div className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" />{contactInfo.email}</div>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10 mt-12 pt-8 text-center text-sm text-background/40">
        © {new Date().getFullYear()} ASP Solar Enterprise. All rights reserved.
      </div>
    </div>
  </footer>
);
