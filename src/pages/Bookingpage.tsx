import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useSearchParams } from 'react-router-dom';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CreditCard, User, Package } from 'lucide-react';

// Zod schema for form validation
const bookingFormSchema = z.object({
  // Traveler Details
  fullName: z.string().min(3, { message: 'Full name must be at least 3 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  country: z.string().min(2, { message: 'Please select your country.' }),

  // Payment Details
  cardholderName: z.string().min(3, { message: 'Name on card is required.' }),
  cardNumber: z.string().regex(/^\d{16}$/, { message: 'Card number must be 16 digits.' }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: 'Use MM/YY format.' }),
  cvc: z.string().regex(/^\d{3,4}$/, { message: 'CVC must be 3 or 4 digits.' }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const Bookingpage = () => {
  console.log('BookingPage loaded');

  // In a real app, you would use useSearchParams to get package info
  const [searchParams] = useSearchParams();
  const packageName = searchParams.get('package') || 'Majestic Kerala Backwaters';

  // Placeholder for booking details, could be fetched based on searchParams
  const bookingDetails = {
    title: packageName.replace(/-/g, ' '),
    duration: '7 Days / 6 Nights',
    travelers: 2,
    price: 1499,
  };
  const totalAmount = (bookingDetails.price * bookingDetails.travelers).toLocaleString();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      country: '',
      cardholderName: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
    },
  });

  function onSubmit(data: BookingFormValues) {
    console.log('Booking form submitted:', data);
    // Here you would typically handle payment processing
    alert('Booking successful! (Check console for data)');
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <div className="container max-w-4xl mx-auto py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-center mb-4">
            Complete Your Booking
          </h1>
          <p className="text-center text-muted-foreground mb-10">
            Secure your spot for an unforgettable journey.
          </p>

          <Tabs defaultValue="traveler-details" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-secondary">
              <TabsTrigger value="traveler-details">1. Traveler Details</TabsTrigger>
              <TabsTrigger value="payment">2. Payment</TabsTrigger>
              <TabsTrigger value="review">3. Review & Confirm</TabsTrigger>
            </TabsList>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <TabsContent value="traveler-details">
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="font-heading text-2xl flex items-center gap-2">
                        <User className="h-6 w-6 text-primary" />
                        Who is traveling?
                      </CardTitle>
                      <CardDescription>
                        Please provide the primary contact's information.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Ananya Sharma" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="you@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="+91 98765 43210" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your country of residence" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="india">India</SelectItem>
                                <SelectItem value="usa">United States</SelectItem>
                                <SelectItem value="uk">United Kingdom</SelectItem>
                                <SelectItem value="australia">Australia</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="payment">
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="font-heading text-2xl flex items-center gap-2">
                        <CreditCard className="h-6 w-6 text-primary" />
                        Payment Information
                      </CardTitle>
                      <CardDescription>
                        All transactions are secure and encrypted.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-4">
                      <FormField
                        control={form.control}
                        name="cardholderName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name on Card</FormLabel>
                            <FormControl>
                              <Input placeholder="As it appears on your card" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <Input placeholder="•••• •••• •••• ••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="expiryDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Date</FormLabel>
                              <FormControl>
                                <Input placeholder="MM/YY" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="cvc"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVC / CVV</FormLabel>
                              <FormControl>
                                <Input placeholder="•••" {...field} />
                              </FormControl>
                              <FormDescription>3-4 digit code on the back.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="review">
                  <Card className="mt-6">
                    <CardHeader>
                       <CardTitle className="font-heading text-2xl flex items-center gap-2">
                        <Package className="h-6 w-6 text-primary" />
                        Review Your Trip
                      </CardTitle>
                      <CardDescription>
                        One final check before you confirm your adventure.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                        <div className="p-4 rounded-md border bg-secondary/50 space-y-2">
                            <h3 className="font-heading text-lg font-semibold capitalize">{bookingDetails.title}</h3>
                            <p className="text-muted-foreground">{bookingDetails.duration}</p>
                            <p className="text-muted-foreground">{bookingDetails.travelers} Travelers</p>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center text-lg">
                            <span className="text-muted-foreground">Total Price:</span>
                            <span className="font-bold font-heading text-2xl text-primary">${totalAmount}</span>
                        </div>
                         <p className="text-xs text-muted-foreground">
                            By clicking "Confirm & Pay", you agree to the Bharat Yatra <Link to="/terms" className="underline hover:text-primary">Terms of Service</Link> and <Link to="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
                        </p>
                    </CardContent>
                    <div className="p-6 pt-0">
                         <Button type="submit" size="lg" className="w-full font-bold text-lg">
                           Confirm & Pay
                         </Button>
                    </div>
                  </Card>
                </TabsContent>
              </form>
            </Form>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Bookingpage;