import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Custom Page-specific Components
import TravelPackageCard from '@/components/TravelPackageCard';
import OfferBanner from '@/components/OfferBanner';

// shadcn/ui Components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Placeholder data for featured travel packages
const featuredPackages = [
  {
    slug: 'kerala-backwaters',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1932&auto=format&fit=crop',
    title: 'Enchanting Kerala Backwaters',
    duration: '7 Days, 6 Nights',
    price: 1200,
    highlights: ['Houseboat Stay', 'Kathakali Performance', 'Spice Plantation Tour'],
  },
  {
    slug: 'rajasthan-royalty',
    imageUrl: 'https://images.unsplash.com/photo-1599661046227-14e7122151b6?q=80&w=1974&auto=format&fit=crop',
    title: 'The Royal Rajasthan Tour',
    duration: '10 Days, 9 Nights',
    price: 1800,
    highlights: ['Jaipur City Palace', 'Udaipur Lake Pichola', 'Jodhpur Mehrangarh Fort'],
  },
  {
    slug: 'himalayan-escapade',
    imageUrl: 'https://images.unsplash.com/photo-1626621341526-447a44a6b2e7?q=80&w=1974&auto=format&fit=crop',
    title: 'Himalayan Mountain Vistas',
    duration: '8 Days, 7 Nights',
    price: 1550,
    highlights: ['Trekking in Manali', 'Rohtang Pass Drive', 'Solang Valley Adventures'],
  },
];

const Homepage = () => {
  console.log('Homepage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[75vh] w-full flex items-center justify-center text-center text-white">
          <img
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop"
            alt="Taj Mahal"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 container flex flex-col items-center px-4">
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-lg">
              Discover the Soul of India
            </h1>
            <p className="font-body mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/90 drop-shadow-sm">
              From majestic mountains to serene backwaters, your unforgettable journey begins here.
            </p>
            <form className="mt-8 flex w-full max-w-lg items-center space-x-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="text"
                placeholder="Search for a destination... e.g., 'Kerala'"
                className="flex-grow h-12 text-base bg-white/90 text-foreground placeholder:text-muted-foreground focus:bg-white"
              />
              <Button asChild size="lg" className="h-12 text-base">
                <Link to="/packages-resultspage">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Link>
              </Button>
            </form>
          </div>
        </section>

        {/* Featured Packages Section */}
        <section className="py-16 lg:py-24 bg-secondary/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                Featured Journeys
              </h2>
              <p className="font-body mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
                Handpicked experiences that capture the vibrant essence of India, curated just for you.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPackages.map((pkg) => (
                <TravelPackageCard key={pkg.slug} {...pkg} />
              ))}
            </div>
          </div>
        </section>

        {/* Offer Banner Section */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <OfferBanner
                title="Monsoon Getaway Deals"
                description="Embrace the magic of the monsoons. Get up to 20% off on select packages."
                ctaText="View Monsoon Offers"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;