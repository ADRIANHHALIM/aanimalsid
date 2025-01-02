import { Card } from "@/components/ui/card";

const Services = () => {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Veterinary Consultation</h3>
            <p className="text-gray-600 mb-4">
              Book appointments with experienced veterinarians for your pets.
            </p>
            <button className="bg-[#E95901] text-white px-4 py-2 rounded-md hover:bg-[#E95900] transition-colors">
              Book Consultation
            </button>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Pet Grooming</h3>
            <p className="text-gray-600 mb-4">
              Professional grooming services for your beloved pets.
            </p>
            <button className="bg-[#E95901] text-white px-4 py-2 rounded-md hover:bg-[#E95900] transition-colors">
              Book Grooming
            </button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Services;