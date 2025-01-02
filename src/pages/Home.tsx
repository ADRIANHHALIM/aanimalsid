import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import type { Database } from "@/integrations/supabase/types";

type Pet = Database['public']['Tables']['pets']['Row'];

const Home = () => {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const fetchPets = async () => {
      const { data, error } = await supabase
        .from('pets')
        .select('*');
      
      if (error) {
        console.error("Error fetching pets:", error);
        return;
      }

      setPets(data || []);
    };

    fetchPets();
  }, []);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Your Pets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pets.map((pet) => (
            <Card key={pet.id} className="p-4">
              <img
                src={pet.photo_url || "/placeholder.svg"}
                alt={pet.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">{pet.name}</h3>
              <p className="text-gray-600">{pet.species}</p>
              <p className="text-gray-600">{pet.age} years old</p>
            </Card>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">Latest News</h2>
        <p className="text-gray-600">News feed coming soon...</p>
      </section>
    </div>
  );
};

export default Home;