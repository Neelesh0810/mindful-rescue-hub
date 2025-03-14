
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Coins, Package, Truck } from "lucide-react";

interface DonationTypeSelectorProps {
  donationType: string;
  setDonationType: (type: string) => void;
}

const DonationTypeSelector = ({ donationType, setDonationType }: DonationTypeSelectorProps) => {
  return (
    <RadioGroup 
      value={donationType}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      onValueChange={setDonationType}
    >
      <div className={`flex items-center space-x-2 rounded-md border p-4 ${donationType === 'money' ? 'border-primary' : 'border-white/10'}`}>
        <RadioGroupItem value="money" id="money" />
        <Label htmlFor="money" className="flex items-center cursor-pointer">
          <Coins className="mr-2" size={18} />
          Money
        </Label>
      </div>
      <div className={`flex items-center space-x-2 rounded-md border p-4 ${donationType === 'items' ? 'border-primary' : 'border-white/10'}`}>
        <RadioGroupItem value="items" id="items" />
        <Label htmlFor="items" className="flex items-center cursor-pointer">
          <Package className="mr-2" size={18} />
          Essential Items
        </Label>
      </div>
      <div className={`flex items-center space-x-2 rounded-md border p-4 ${donationType === 'pickup' ? 'border-primary' : 'border-white/10'}`}>
        <RadioGroupItem value="pickup" id="pickup" />
        <Label htmlFor="pickup" className="flex items-center cursor-pointer">
          <Truck className="mr-2" size={18} />
          Schedule Pickup
        </Label>
      </div>
    </RadioGroup>
  );
};

export default DonationTypeSelector;
