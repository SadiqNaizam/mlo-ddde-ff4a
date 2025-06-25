import React from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Custom UI Components
import TravelPackageCard from '@/components/TravelPackageCard';

// shadcn/ui Components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';

// Placeholder data for travel packages, inspired by the user journey
const travelPackages = [
  {
    slug: 'kerala-backwaters-escape-7d',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&h=600&auto=format&fit=crop',
    title: 'Enchanting Kerala Backwaters',
    duration: '7 Days / 6 Nights',
    price: 950,
    highlights: ['Houseboat Stay in Alleppey', 'Munnar Tea Gardens Visit', 'Kathakali Performance'],
  },
  {
    slug: 'rajasthan-royal-heritage-tour-10d',
    imageUrl: 'https://images.unsplash.com/photo-1599661046227-14e7a70a8317?q=80&w=800&h=600&auto=format&fit=crop',
    title: 'Royal Rajasthan Heritage',
    duration: '10 Days / 9 Nights',
    price: 1450,
    highlights: ['Amber Fort Elephant Ride', 'Jaisalmer Desert Safari', 'Udaipur Lake Palace View'],
  },
  {
    slug: 'himalayan-adventure-trek-8d',
    imageUrl: 'https://images.unsplash.com/photo-1616423841369-142827138355?q=80&w=800&h=600&auto=format&fit=crop',
    title: 'Himalayan Adventure Trek',
    duration: '8 Days / 7 Nights',
    price: 1200,
    highlights: ['Trek to Triund', 'Paragliding in Bir Billing', 'Stay in Dharamshala'],
  },
  {
    slug: 'goa-beach-paradise-5d',
    imageUrl: 'https://images.unsplash.com/photo-1590372793661-a4bce985245a?q=80&w=800&h=600&auto=format&fit=crop',
    title: 'Goa Beach Paradise',
    duration: '5 Days / 4 Nights',
    price: 700,
    highlights: ['North Goa Beach Hopping', 'Dudhsagar Falls Trip', 'Anjuna Flea Market'],
  },
  {
    slug: 'sacred-varanasi-spiritual-journey-4d',
    imageUrl: 'https://images.unsplash.com/photo-1561361089-c520a396459c?q=80&w=800&h=600&auto=format&fit=crop',
    title: 'Sacred Varanasi Journey',
    duration: '4 Days / 3 Nights',
    price: 600,
    highlights: ['Ganges River Boat Ride', 'Evening Ganga Aarti', 'Sarnath Temple Visit'],
  },
  {
    slug: 'wildlife-safari-jim-corbett-3d',
    imageUrl: 'https://images.unsplash.com/photo-1549462314-3c6DE0f384b6?q=80&w=800&h=600&auto=format&fit=crop',
    title: 'Wildlife Safari at Corbett',
    duration: '3 Days / 2 Nights',
    price: 550,
    highlights: ['Jeep Safari in Corbett NP', 'River Ramganga Views', 'Nature Walks'],
  },
];


const PackagesResultspage = () => {
    console.log('PackagesResultspage loaded');

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-grow">
                <div className="container max-w-screen-2xl py-6 md:py-10">
                    {/* Breadcrumb and Title */}
                    <div className="mb-8">
                        <Breadcrumb className="mb-2">
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link to="/">Home</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Packages</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                            Travel Packages
                        </h1>
                        <p className="mt-2 text-lg text-muted-foreground font-body">
                            Discover curated journeys across the beautiful landscapes of India.
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filters Sidebar */}
                        <aside className="w-full lg:w-1/4 xl:w-1/5">
                            <div className="sticky top-24 p-6 rounded-lg bg-card border">
                                <h3 className="font-heading text-xl font-semibold mb-4">Filter & Sort</h3>
                                <Separator className="mb-4" />
                                <Accordion type="multiple" defaultValue={['category', 'price']} className="w-full">
                                    <AccordionItem value="category">
                                        <AccordionTrigger className="font-semibold font-body">Category</AccordionTrigger>
                                        <AccordionContent className="space-y-3 pt-3">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="adventure" />
                                                <Label htmlFor="adventure" className="font-normal">Adventure</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="spiritual" />
                                                <Label htmlFor="spiritual" className="font-normal">Spiritual</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="heritage" />
                                                <Label htmlFor="heritage" className="font-normal">Heritage</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="beach" />
                                                <Label htmlFor="beach" className="font-normal">Beach</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="wildlife" />
                                                <Label htmlFor="wildlife" className="font-normal">Wildlife</Label>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="price">
                                        <AccordionTrigger className="font-semibold font-body">Price Range</AccordionTrigger>
                                        <AccordionContent className="pt-4">
                                            <Label className="mb-2 block">Max Price: $2000</Label>
                                            <Slider defaultValue={[2000]} max={5000} step={100} />
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="duration">
                                        <AccordionTrigger className="font-semibold font-body">Duration</AccordionTrigger>
                                        <AccordionContent className="space-y-3 pt-3">
                                             <div className="flex items-center space-x-2">
                                                <Checkbox id="d-short" />
                                                <Label htmlFor="d-short" className="font-normal">1-3 Days</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="d-medium" />
                                                <Label htmlFor="d-medium" className="font-normal">4-7 Days</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="d-long" />
                                                <Label htmlFor="d-long" className="font-normal">7+ Days</Label>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </aside>

                        {/* Results Grid */}
                        <div className="w-full lg:w-3/4 xl:w-4/5">
                            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                                {travelPackages.map((pkg) => (
                                    <TravelPackageCard key={pkg.slug} {...pkg} />
                                ))}
                            </section>

                            {/* Pagination */}
                            <div className="mt-12 flex justify-center">
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious href="#" />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#" isActive>1</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">2</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">3</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationNext href="#" />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PackagesResultspage;