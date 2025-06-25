import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface TravelPackageCardProps {
  slug: string;
  imageUrl: string;
  title: string;
  duration: string;
  price: number;
  highlights: string[];
}

const TravelPackageCard: React.FC<TravelPackageCardProps> = ({
  slug,
  imageUrl,
  title,
  duration,
  price,
  highlights,
}) => {
  console.log('TravelPackageCard loaded for:', title);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Link to={`/bookingpage?package=${slug}`} className="block group">
      <Card className="relative overflow-hidden w-full h-[450px] rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
        {/* Background Image */}
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
        
        {/* Always-Visible Content Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/70 via-black/50 to-transparent">
          <h3 className="font-heading text-2xl lg:text-3xl font-bold text-white drop-shadow-md">
            {title}
          </h3>
          <p className="text-sm text-primary-foreground/80 mt-1">{duration}</p>
        </div>

        {/* Hover-reveal Content Overlay */}
        <motion.div
          className="absolute inset-0 w-full h-full p-6 flex flex-col justify-end bg-gradient-to-t from-primary/80 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
          initial="hidden"
          whileHover="visible"
          variants={containerVariants}
        >
          <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
            <h4 className="font-heading text-xl font-semibold text-primary-foreground mb-3">
              Key Highlights
            </h4>
            <ul className="space-y-2 mb-4">
              {highlights.slice(0, 3).map((highlight, index) => (
                <motion.li
                  key={index}
                  className="flex items-center text-sm text-primary-foreground"
                  variants={itemVariants}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2 text-accent" />
                  <span>{highlight}</span>
                </motion.li>
              ))}
            </ul>
            <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-white font-heading">
                    ${price.toLocaleString()}
                </p>
                <div className="flex items-center text-accent font-semibold">
                    <span>Book Now</span>
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
            </div>
          </div>
        </motion.div>
      </Card>
    </Link>
  );
};

export default TravelPackageCard;