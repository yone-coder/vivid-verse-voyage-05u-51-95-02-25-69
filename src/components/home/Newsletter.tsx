
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, CheckCircle, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/context/LanguageContext";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div className="py-6 bg-gradient-to-r from-orange-50 to-red-50">
      <div className="container mx-auto px-3">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-base md:text-lg font-bold mb-1">{t('newsletter.title')}</h2>
          <p className="text-xs md:text-sm text-gray-600 mb-4">
            {t('newsletter.description')}
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 items-center">
            <div className="relative flex-1 w-full">
              <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                type="email"
                placeholder={t('newsletter.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9 h-10"
              />
            </div>
            <Button 
              type="submit" 
              className="bg-orange-500 hover:bg-orange-600 w-full md:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('newsletter.subscribing') : t('newsletter.subscribe')}
            </Button>
          </form>
          
          <p className="text-[10px] md:text-xs text-gray-500 mt-2">
            {t('newsletter.terms')}
          </p>
          
          <div className="mt-4 flex justify-center gap-3">
            <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
