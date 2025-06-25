import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Hotel, Plane, Car, UtensilsCrossed } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter'; // Assuming this component exists

// Define the structure for our trip configuration
interface TripConfig {
  days: number;
  hotel: {
    enabled: boolean;
    stars: '3' | '4' | '5';
  };
  flight: {
    enabled: boolean;
    class: 'economy' | 'business';
  };
  transport: {
    enabled: boolean;
    type: 'private-cab' | 'rental-car';
  };
  meals: {
    enabled: boolean;
  };
}

// Define some base costs for calculation
const COSTS = {
  hotel: { '3': 50, '4': 100, '5': 200 }, // per day
  flight: { economy: 300, business: 800 }, // one-time
  transport: { 'private-cab': 40, 'rental-car': 60 }, // per day
  meals: 30, // per day
};

const TripEstimatorModule: React.FC = () => {
  console.log('TripEstimatorModule loaded');

  const [config, setConfig] = useState<TripConfig>({
    days: 5,
    hotel: { enabled: true, stars: '4' },
    flight: { enabled: true, class: 'economy' },
    transport: { enabled: false, type: 'private-cab' },
    meals: { enabled: false },
  });

  const totalCost = useMemo(() => {
    let total = 0;
    if (config.hotel.enabled) {
      total += COSTS.hotel[config.hotel.stars] * config.days;
    }
    if (config.flight.enabled) {
      total += COSTS.flight[config.flight.class];
    }
    if (config.transport.enabled) {
      total += COSTS.transport[config.transport.type] * config.days;
    }
    if (config.meals.enabled) {
      total += COSTS.meals * config.days;
    }
    return total;
  }, [config]);

  const handleSwitchChange = (service: keyof Omit<TripConfig, 'days'>, checked: boolean) => {
    setConfig(prev => ({ ...prev, [service]: { ...prev[service], enabled: checked } }));
  };

  const handleSelectChange = (service: 'hotel' | 'flight' | 'transport', value: string) => {
    const key = service === 'hotel' ? 'stars' : service === 'flight' ? 'class' : 'type';
    setConfig(prev => ({ ...prev, [service]: { ...prev[service], [key]: value } }));
  };
  
  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const days = Math.max(1, parseInt(e.target.value) || 1); // Ensure days are at least 1
    setConfig(prev => ({...prev, days}));
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="font-heading text-3xl md:text-4xl text-foreground">
          Trip Cost Estimator
        </CardTitle>
        <CardDescription className="font-body text-muted-foreground">
          Customize your journey and see the cost update in real-time.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center gap-4">
            <Label htmlFor="days" className="font-semibold text-lg min-w-[150px]">Number of Days</Label>
            <Input id="days" type="number" value={config.days} onChange={handleDaysChange} className="max-w-[100px]" min="1" />
        </div>

        <Separator />
        
        {/* Service Rows */}
        <div className="space-y-4">
            {/* Hotel */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Hotel className="h-6 w-6 text-primary" />
                    <Label htmlFor="hotel-switch" className="text-lg font-body">Hotel Stay</Label>
                </div>
                <div className="flex items-center gap-4">
                    <Select value={config.hotel.stars} onValueChange={(val) => handleSelectChange('hotel', val)} disabled={!config.hotel.enabled}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Select Rating" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="3">3-Star</SelectItem>
                            <SelectItem value="4">4-Star</SelectItem>
                            <SelectItem value="5">5-Star</SelectItem>
                        </SelectContent>
                    </Select>
                    <Switch id="hotel-switch" checked={config.hotel.enabled} onCheckedChange={(c) => handleSwitchChange('hotel', c)} />
                </div>
            </div>

            {/* Flight */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Plane className="h-6 w-6 text-primary" />
                    <Label htmlFor="flight-switch" className="text-lg font-body">Return Flights</Label>
                </div>
                <div className="flex items-center gap-4">
                    <Select value={config.flight.class} onValueChange={(val) => handleSelectChange('flight', val)} disabled={!config.flight.enabled}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Select Class" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="economy">Economy</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                        </SelectContent>
                    </Select>
                    <Switch id="flight-switch" checked={config.flight.enabled} onCheckedChange={(c) => handleSwitchChange('flight', c)} />
                </div>
            </div>

            {/* Transport */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Car className="h-6 w-6 text-primary" />
                    <Label htmlFor="transport-switch" className="text-lg font-body">Local Transport</Label>
                </div>
                 <div className="flex items-center gap-4">
                    <Select value={config.transport.type} onValueChange={(val) => handleSelectChange('transport', val)} disabled={!config.transport.enabled}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="private-cab">Private Cab</SelectItem>
                            <SelectItem value="rental-car">Rental Car</SelectItem>
                        </SelectContent>
                    </Select>
                    <Switch id="transport-switch" checked={config.transport.enabled} onCheckedChange={(c) => handleSwitchChange('transport', c)} />
                </div>
            </div>

            {/* Meals */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <UtensilsCrossed className="h-6 w-6 text-primary" />
                    <Label htmlFor="meals-switch" className="text-lg font-body">Daily Meals</Label>
                </div>
                <Switch id="meals-switch" checked={config.meals.enabled} onCheckedChange={(c) => handleSwitchChange('meals', c)} />
            </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-col sm:flex-row items-center justify-between p-6 bg-secondary/50 rounded-b-lg">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <p className="text-sm font-body text-muted-foreground">Estimated Total</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold font-heading text-primary">$</span>
            <AnimatedCounter value={totalCost} />
          </div>
        </div>
        <Button size="lg" asChild className="font-semibold text-lg w-full sm:w-auto">
            <Link to="/bookingpage">
                Book This Trip
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TripEstimatorModule;