import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Clock, MapPin, Upload, Loader } from 'lucide-react';
import useEventStore from '@/store/useEventStore';
import useAuthStore from '@/store/authStore';
import { toast } from 'sonner';

const CreateEvent = () => {
  const navigate = useNavigate();
  const { createEvent, isLoading } = useEventStore();
  const { user, isAuthenticated } = useAuthStore();

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
      general: '',
      vip: '',
      premium: '',
    },
    ticketsAvailable: {
      general: '',
      vip: '',
      premium: '',
    },
  });

  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const [time, setTime] = useState('');
  const [isAm, setIsAm] = useState(true);

  const handleTimeChange = (e) => {
     const newTime = e.target.value;
  setTime(newTime);
  // Update formData with the formatted time
  setFormData(prev => ({
    ...prev,
    time: `${newTime} ${isAm ? 'AM' : 'PM'}`
  }));
  };

  const handleAmPmChange = () => {
    const newIsAm = !isAm;
  setIsAm(newIsAm);
  // Update formData with the formatted time whenever AM/PM changes
  setFormData(prev => ({
    ...prev,
    time: `${time} ${newIsAm ? 'AM' : 'PM'}`
  }));
  };

  // Format for backend (combines time + AM/PM)
  const formatTimeForBackend = () => {
    if (!time) return '';
    return `${time} ${isAm ? 'AM' : 'PM'}`;
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    //  Check if adding new files would exceed the limit
  if (images.length + files.length > 5) {
    toast.error('You can only upload a maximum of 5 images');
    return;
  }


    // Append new files to existing ones
    setImages((prevImages) => [...prevImages, ...files]);

    // Also append new previews
    const newPreviews = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newPreviews).then((newPreviewUrls) => {
      setPreviewUrls((prevPreviews) => [...prevPreviews, ...newPreviewUrls]);
    });
  };

  // Adding this new function to remove images
const handleRemoveImage = (index) => {
  // Remove from both images and preview URLs
  setImages((prevImages) => prevImages.filter((_, idx) => idx !== index));
  setPreviewUrls((prevPreviews) => prevPreviews.filter((_, idx) => idx !== index));
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
  // const handleTicketPriceChange = (type, value) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     ticketTypes: {
  //       ...prev.ticketTypes,
  //       [type]: Number(value),
  //     },
  //   }));
  // };

  const handleTicketChange = (field, type, value) => {
    // Handle empty string or NaN values by defaulting to 0
    const numericValue = value === '' ? 0 : Number(value);

    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [type]: Number(value), // Ensure numeric value
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

    if (!images || images.length === 0) {
      toast.error('Please upload at least one event image');
      return;
    }

    const processedData = {
      ...formData,
      ticketTypes: {
        general:
          formData.ticketTypes.general === ''
            ? 0
            : Number(formData.ticketTypes.general),
        vip:
          formData.ticketTypes.vip === ''
            ? 0
            : Number(formData.ticketTypes.vip),
        premium:
          formData.ticketTypes.premium === ''
            ? 0
            : Number(formData.ticketTypes.premium),
      },
      ticketsAvailable: {
        general:
          formData.ticketsAvailable.general === ''
            ? 0
            : Number(formData.ticketsAvailable.general),
        vip:
          formData.ticketsAvailable.vip === ''
            ? 0
            : Number(formData.ticketsAvailable.vip),
        premium:
          formData.ticketsAvailable.premium === ''
            ? 0
            : Number(formData.ticketsAvailable.premium),
      },
    };

    if (!user?._id) {
      throw new Error('User not authenticated');
    }
    try {
      // Prepare data with proper structure
      const eventData = {
        ...formData,
        organizerId: user._id,
        ...processedData,
        images,

        // Ensure ticket data is properly structured
        // ticketPrices: formData.ticketTypes, // Or keep as ticketPrices if that's your model
        // ticketsAvailable: formData.ticketsAvailable
      };

      const response = await createEvent(eventData);

      if (response && response.event) {
        toast.success('Event created successfully!');
        navigate(`/events/${response.event.id}`);
      }
    } catch (error) {
      console.error('Creation error:', error);
      toast.error(error.response?.data?.message || 'Failed to create event');
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
                          {/* <span className="px-3 py-2.5 bg-muted/50">
                            <Clock className="h-5 w-5 text-muted-foreground" />
                          </span> */}
                          <input
                            type="time"
                            value={time}
                            onChange={handleTimeChange}
                            className="flex-1 p-2.5 border-0 focus:outline-none focus:ring-0  hide-ampm"
                            required
                          />
                          <button
                            type="button"
                            onClick={handleAmPmChange}
                            className="px-3 py-2.5 bg-muted/50 border-l border-input"
                          >
                            {isAm ? 'AM' : 'PM'}
                          </button>
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
                              handleTicketChange(
                                'ticketTypes',
                                'general',
                                e.target.value
                              )
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
                              handleTicketChange(
                                'ticketsAvailable',
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
                              handleTicketChange(
                                'ticketTypes',
                                'vip',
                                e.target.value
                              )
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
                              handleTicketChange(
                                'ticketsAvailable',
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
                              handleTicketChange(
                                'ticketTypes',
                                'premium',
                                e.target.value
                              )
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
                              handleTicketChange(
                                'ticketsAvailable',
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
                        previewUrls ? 'border-primary/50' : 'border-muted'
                      }`}
                      onClick={() =>
                        document.getElementById('event-image').click()
                      }
                    >
                      {previewUrls.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4">
                          {previewUrls.map((url, idx) => (
                            <div key={idx} className="relative">
                              <img
                                src={url}
                                alt={`Preview ${idx}`}
                                className="rounded-lg max-h-48 object-cover w-full"
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent triggering the file input
                          handleRemoveImage(idx); 
                                }}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                          <div className="col-span-2 flex justify-between items-center">
                            <p className="text-sm text-muted-foreground">
                              Click to add more images ({images.length}/5)
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                          <div>
                            <p className="font-medium">Upload Event Images</p>
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
                        multiple
                        className="hidden"
                        onChange={handleImageChange}
                        required={previewUrls.length === 0}
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
