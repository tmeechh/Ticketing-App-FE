
import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Music Enthusiast',
    image: 'https://i.pravatar.cc/150?img=1',
    quote: "EventHorizon has completely changed how I discover and book events. The interface is beautiful, and I love how easy it is to find concerts near me."
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Sports Fan',
    image: 'https://i.pravatar.cc/150?img=8',
    quote: "I've used many ticketing platforms before, but none compare to EventHorizon. The ticket management is seamless, and I never worry about missing an event."
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Event Organizer',
    image: 'https://i.pravatar.cc/150?img=5',
    quote: "As an event organizer, I appreciate the attention to detail that EventHorizon provides. Their platform helps us reach the right audience every time."
  }
];

const Testimonials = () => {
  return (
    <section className="section-container">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h5 className="text-accent font-bold tracking-wider uppercase mb-2">Testimonials</h5>
        <h2 className="heading-lg mb-4">What Our Customers Say</h2>
        <p className="text-muted-foreground">
          Join thousands of satisfied customers who have found their perfect events through EventHorizon.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div 
            key={testimonial.id} 
            className="premium-card flex flex-col hover-lift"
          >
            <div className="mb-4">
              <Quote className="h-6 w-6 text-accent" />
            </div>
            
            <p className="text-lg mb-6 flex-1">{testimonial.quote}</p>
            
            <div className="flex items-center mt-4">
              <img 
                src={testimonial.image} 
                alt={testimonial.name} 
                className="h-12 w-12 rounded-full object-cover mr-4" 
              />
              <div>
                <h4 className="font-bold">{testimonial.name}</h4>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
