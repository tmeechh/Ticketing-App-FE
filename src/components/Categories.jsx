import useEventStore from '../store/useEventStore'; // adjust path
import React from 'react';
import { Link } from 'react-router-dom'; // 


const Categories = () => {
  const { getCategoryCounts } = useEventStore();
  const categoryCounts = getCategoryCounts();

  const categories = [
    {
      id: 1,
      name: 'Concerts',
      icon: '🎵',
      image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1170&auto=format&fit=crop',
      // count: 142
    },
    {
      id: 2,
      name: 'Sports',
      icon: '⚽',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1170&auto=format&fit=crop',
      // count: 86
    },
    {
      id: 3,
      name: 'Theater',
      icon: '🎭',
      image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=1171&auto=format&fit=crop',
      // count: 64
    },
    {
      id: 4,
      name: 'Conferences',
      icon: '💼',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=1170&auto=format&fit=crop',
      // count: 53
    },
    {
      id: 5,
      name: 'Festivals',
      icon: '🎪',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1074&auto=format&fit=crop',
      // count: 78
    },
    {
      id: 6,
      name: 'Exhibitions',
      icon: '🖼️',
      image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1160&auto=format&fit=crop',
      // count: 41
    },
  ];

  return (
    <section className="bg-secondary py-24">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h5 className="text-accent font-medium tracking-wider uppercase mb-2">Browse Categories</h5>
          <h2 className="heading-lg mb-4">Find Events By Category</h2>
          <p className="text-muted-foreground">
            Discover events that match your interests...
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-6 ">
          {categories.map((category) => {
            const lowerCaseName = category.name.toLowerCase();
            const count = categoryCounts[lowerCaseName] || 0;

            return (
              <Link 
                to={`/events?category=${lowerCaseName}`} 
                key={category.id}
                className="bg-white card-shadow hover:shadow-lg transition-all group rounded-2xl overflow-hidden"
              >
                <div className="h-32 relative">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-primary/30 rounded-2xl"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl">{category.icon}</span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{count} Events</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories