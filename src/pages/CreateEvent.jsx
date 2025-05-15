import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calendar, Clock, MapPin, Upload, Loader } from 'lucide-react';
import useEventStore from '../store/useEventStore';
import useAuthStore from '../store/authStore';
import { toast } from 'sonner';

const CreateEvent = () => {
  const navigate = useNavigate();
  const { createEvent, isLoading } = useEventStore();
  const { isAuthenticated } = useAuthStore();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullDescription: '',
    category: '',
    date: '',
    time: '',
    location: '',
    address: '',
    organizer: '',
    ticketTypes: {
      general: 0,
      vip: 0,
      premium: 0,
    },
    ticketsAvailable: {
      general: 50,
      vip: 30,
      premium: 10,
    },
  });

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle ticket type price changes
  const handleTicketPriceChange = (type, value) => {
    setFormData((prev) => ({
      ...prev,
      ticketTypes: {
        ...prev.ticketTypes,
        [type]: Number(value),
      },
    }));
  };

  // Handle ticket availability changes
  const handleTicketAvailabilityChange = (type, value) => {
    setFormData((prev) => ({
      ...prev,
      ticketsAvailable: {
        ...prev.ticketsAvailable,
        [type]: Number(value),
      },
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('You must be logged in to create an event');
      navigate('/');
      return;
    }

    if (!image) {
      toast.error('Please upload an event image');
      return;
    }

    try {
      // Prepare data for submission
      const eventData = {
        ...formData,
        image,
      };

      const newEvent = await createEvent(eventData);

      if (newEvent) {
        toast.success('Event created successfully!');
        navigate(`/events/${newEvent.id}`);
      }
    } catch (error) {
      toast.error('Failed to create event. Please try again.');
    }
  };

  const categories = [
    'Concerts',
    'Sports',
    'Conferences',
    'Theater',
    'Festivals',
    'Exhibitions',
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <div className="hero-gradient text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="heading-lg mb-4">Create New Event</h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Share your event with the world and start selling tickets on our
              platform.
            </p>
          </div>
        </div>

        {/* Event Form */}
        <div className="container mx-auto px-4 py-12">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Event Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* Basic Information */}
                <div className="premium-card">
                  <h2 className="heading-md mb-6">Basic Information</h2>

                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="title"
                        className="block font-medium mb-1 required"
                      >
                        Event Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border border-input rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Give your event a catchy title"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="category"
                        className="block font-medium mb-1 required"
                      >
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border border-input rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className="block font-medium mb-1 required"
                      >
                        Short Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border border-input rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                        rows="3"
                        placeholder="Briefly describe your event (150 characters max)"
                        maxLength="150"
                        required
                      ></textarea>
                    </div>

                    <div>
                      <label
                        htmlFor="fullDescription"
                        className="block font-medium mb-1 required"
                      >
                        Full Description
                      </label>
                      <textarea
                        id="fullDescription"
                        name="fullDescription"
                        value={formData.fullDescription}
                        onChange={handleChange}
                        className="w-full border border-input rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                        rows="6"
                        placeholder="Provide detailed information about your event"
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Date, Time & Location */}
                <div className="premium-card">
                  <h2 className="heading-md mb-6">Date, Time & Location</h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="date"
                          className="block font-medium mb-1 required"
                        >
                          Event Date
                        </label>
                        <div className="flex items-center border border-input rounded-md overflow-hidden">
                          <span className="px-3 py-2.5 bg-muted/50">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                          </span>
                          <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="flex-1 p-2.5 border-0 focus:outline-none focus:ring-0"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="time"
                          className="block font-medium mb-1 required"
                        >
                          Event Time
                        </label>
                        <div className="flex items-center border border-input rounded-md overflow-hidden">
                          <span className="px-3 py-2.5 bg-muted/50">
                            <Clock className="h-5 w-5 text-muted-foreground" />
                          </span>
                          <input
                            type="time"
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className="flex-1 p-2.5 border-0 focus:outline-none focus:ring-0"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="location"
                        className="block font-medium mb-1 required"
                      >
                        Venue Name
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full border border-input rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g. Madison Square Garden"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="address"
                        className="block font-medium mb-1 required"
                      >
                        Address
                      </label>
                      <div className="flex items-center border border-input rounded-md overflow-hidden">
                        <span className="px-3 py-2.5 bg-muted/50">
                          <MapPin className="h-5 w-5 text-muted-foreground" />
                        </span>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="flex-1 p-2.5 border-0 focus:outline-none focus:ring-0"
                          placeholder="Full address of the venue"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="organizer"
                        className="block font-medium mb-1 required"
                      >
                        Organizer
                      </label>
                      <input
                        type="text"
                        id="organizer"
                        name="organizer"
                        value={formData.organizer}
                        onChange={handleChange}
                        className="w-full border border-input rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Who is organizing this event?"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Ticket Information */}
                <div className="premium-card">
                  <h2 className="heading-md mb-6">Ticket Information</h2>

                  <div className="space-y-6">
                    {/* General Admission */}
                    <div className="border border-muted rounded-lg p-4">
                      <h3 className="font-medium mb-4">General Admission</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="general-price"
                            className="block text-sm mb-1 required"
                          >
                            Price ($)
                          </label>
                          <input
                            type="number"
                            id="general-price"
                            min="0"
                            value={formData.ticketTypes.general}
                            onChange={(e) =>
                              handleTicketPriceChange('general', e.target.value)
                            }
                            className="w-full border border-input rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="general-available"
                            className="block text-sm mb-1 required"
                          >
                            Available Tickets
                          </label>
                          <input
                            type="number"
                            id="general-available"
                            min="1"
                            value={formData.ticketsAvailable.general}
                            onChange={(e) =>
                              handleTicketAvailabilityChange(
                                'general',
                                e.target.value
                              )
                            }
                            className="w-full border border-input rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* VIP */}
                    <div className="border border-muted rounded-lg p-4">
                      <h3 className="font-medium mb-4">VIP</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="vip-price"
                            className="block text-sm mb-1 required"
                          >
                            Price ($)
                          </label>
                          <input
                            type="number"
                            id="vip-price"
                            min="0"
                            value={formData.ticketTypes.vip}
                            onChange={(e) =>
                              handleTicketPriceChange('vip', e.target.value)
                            }
                            className="w-full border border-input rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="vip-available"
                            className="block text-sm mb-1 required"
                          >
                            Available Tickets
                          </label>
                          <input
                            type="number"
                            id="vip-available"
                            min="1"
                            value={formData.ticketsAvailable.vip}
                            onChange={(e) =>
                              handleTicketAvailabilityChange(
                                'vip',
                                e.target.value
                              )
                            }
                            className="w-full border border-input rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Premium */}
                    <div className="border border-muted rounded-lg p-4">
                      <h3 className="font-medium mb-4">Premium</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="premium-price"
                            className="block text-sm mb-1 required"
                          >
                            Price ($)
                          </label>
                          <input
                            type="number"
                            id="premium-price"
                            min="0"
                            value={formData.ticketTypes.premium}
                            onChange={(e) =>
                              handleTicketPriceChange('premium', e.target.value)
                            }
                            className="w-full border border-input rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="premium-available"
                            className="block text-sm mb-1 required"
                          >
                            Available Tickets
                          </label>
                          <input
                            type="number"
                            id="premium-available"
                            min="1"
                            value={formData.ticketsAvailable.premium}
                            onChange={(e) =>
                              handleTicketAvailabilityChange(
                                'premium',
                                e.target.value
                              )
                            }
                            className="w-full border border-input rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Image Upload & Preview */}
              <div className="lg:col-span-1">
                <div className="premium-card sticky top-24">
                  <h2 className="heading-md mb-6">Event Image</h2>

                  <div className="space-y-4">
                    {/* Image Upload */}
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors ${
                        previewUrl ? 'border-primary/50' : 'border-muted'
                      }`}
                      onClick={() =>
                        document.getElementById('event-image').click()
                      }
                    >
                      {previewUrl ? (
                        <div className="space-y-4">
                          <img
                            src={previewUrl}
                            alt="Event preview"
                            className="mx-auto rounded-lg max-h-48"
                          />
                          <p className="text-sm text-muted-foreground">
                            Click to change image
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                          <div>
                            <p className="font-medium">Upload Event Image</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Click to browse or drag and drop
                            </p>
                          </div>
                        </div>
                      )}
                      <input
                        type="file"
                        id="event-image"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                        required
                      />
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Recommended size: 1200 x 800 pixels. Max file size: 5MB.
                      JPG, PNG or WEBP format.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-8 pt-6 border-t border-muted">
                    <button
                      type="submit"
                      className="btn-primary w-full py-4 flex justify-center items-center"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader className="h-5 w-5 animate-spin mr-2" />
                          Creating Event...
                        </>
                      ) : (
                        'Create Event'
                      )}
                    </button>
                    <p className="text-center text-xs text-muted-foreground mt-4">
                      By creating this event, you agree to our Terms of Service
                      and Event Policies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateEvent;
