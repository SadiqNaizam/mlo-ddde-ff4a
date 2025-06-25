import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OfferBannerProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  className?: string;
}

const OfferBanner: React.FC<OfferBannerProps> = ({
  title = "Limited Time Offer",
  description = "Discover amazing deals and save big on your next adventure with our exclusive packages.",
  ctaText = "Explore Deals",
  ctaLink = "/packages-resultspage",
  className,
}) => {
  console.log('OfferBanner loaded');

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-accent text-accent-foreground p-8 md:p-10 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-accent/20",
        className
      )}
    >
      {/* Subtle decorative overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-60"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-grow">
          <h2 className="font-heading text-2xl md:text-4xl font-bold">
            {title}
          </h2>
          <p className="mt-2 text-sm md:text-base max-w-prose opacity-90 font-body">
            {description}
          </p>
        </div>
        <div className="flex-shrink-0 mt-4 md:mt-0">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-md hover:shadow-lg transition-shadow"
          >
            <Link to={ctaLink}>
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;