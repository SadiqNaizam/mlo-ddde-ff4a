import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TripEstimatorModule from '@/components/TripEstimatorModule';

const Tripcostestimatorpage: React.FC = () => {
  console.log('Tripcostestimatorpage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
      <Header />
      <main className="flex-grow w-full flex items-center justify-center container mx-auto px-4 py-12 md:py-20">
        <TripEstimatorModule />
      </main>
      <Footer />
    </div>
  );
};

export default Tripcostestimatorpage;