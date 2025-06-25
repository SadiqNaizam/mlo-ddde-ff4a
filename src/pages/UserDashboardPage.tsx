import React from 'react';

// Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Icons
import { ListChecks, User, Heart } from 'lucide-react';

// Placeholder data for the bookings table
const bookings = [
  {
    id: 'TRP75631',
    packageName: 'Kerala Backwaters Retreat',
    date: '2024-08-15',
    status: 'Confirmed',
    total: 2450,
  },
  {
    id: 'TRP69812',
    packageName: 'Rajasthan Royal Tour',
    date: '2024-05-20',
    status: 'Completed',
    total: 3200,
  },
  {
    id: 'TRP88234',
    packageName: 'Himalayan Trekking Adventure',
    date: '2023-11-10',
    status: 'Completed',
    total: 1800,
  },
];

// Placeholder data for saved trips
const savedTrips = [
    { id: 1, name: 'Golden Triangle Expedition', destination: 'Delhi, Agra, Jaipur' },
    { id: 2, name: 'Goa Beach Paradise', destination: 'Goa' },
    { id: 3, name: 'Spiritual Journey to Varanasi', destination: 'Varanasi' },
];


const UserDashboardPage: React.FC = () => {
    console.log('UserDashboardPage loaded');

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">My Dashboard</h1>
                    <p className="mt-2 text-muted-foreground font-body">Manage your bookings, profile, and saved trips all in one place.</p>
                </div>

                <Tabs defaultValue="bookings" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto">
                        <TabsTrigger value="bookings">
                            <ListChecks className="mr-2 h-4 w-4" />
                            My Bookings
                        </TabsTrigger>
                        <TabsTrigger value="profile">
                            <User className="mr-2 h-4 w-4" />
                            Profile Settings
                        </TabsTrigger>
                        <TabsTrigger value="saved">
                            <Heart className="mr-2 h-4 w-4" />
                            Saved Trips
                        </TabsTrigger>
                    </TabsList>

                    {/* Bookings Content */}
                    <TabsContent value="bookings" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-heading">Booking History</CardTitle>
                                <CardDescription className="font-body">A record of all your past and upcoming trips.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[120px]">Booking ID</TableHead>
                                            <TableHead>Package</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Total</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {bookings.map((booking) => (
                                            <TableRow key={booking.id}>
                                                <TableCell className="font-medium">{booking.id}</TableCell>
                                                <TableCell>{booking.packageName}</TableCell>
                                                <TableCell>{booking.date}</TableCell>
                                                <TableCell>
                                                    <Badge variant={booking.status === 'Confirmed' ? 'default' : 'secondary'}
                                                        className={booking.status === 'Confirmed' ? 'bg-primary/80' : ''}
                                                    >
                                                        {booking.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">${booking.total.toLocaleString()}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Profile Content */}
                    <TabsContent value="profile" className="mt-6">
                        <Card className="max-w-2xl mx-auto">
                            <CardHeader>
                                <CardTitle className="font-heading">Personal Information</CardTitle>
                                <CardDescription className="font-body">Update your personal details here. Click save when you are done.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" defaultValue="Anaya Sharma" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" type="email" defaultValue="anaya.sharma@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="ml-auto">Save Changes</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* Saved Trips Content */}
                    <TabsContent value="saved" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-heading">Saved Trips & Packages</CardTitle>
                                <CardDescription className="font-body">Your personalized travel wishlist. Ready to book when you are.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {savedTrips.map((trip) => (
                                        <Card key={trip.id} className="bg-secondary/50">
                                            <CardHeader>
                                                <CardTitle className="text-lg font-heading">{trip.name}</CardTitle>
                                                <CardDescription className="font-body">{trip.destination}</CardDescription>
                                            </CardHeader>
                                            <CardFooter>
                                                <Button variant="outline" size="sm" className="w-full">View Package</Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                                {savedTrips.length === 0 && (
                                    <div className="text-center py-10">
                                        <p className="text-muted-foreground">You haven't saved any trips yet.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                </Tabs>

            </main>
            <Footer />
        </div>
    );
}

export default UserDashboardPage;