import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Clock, MapPin, Upload, Loader } from 'lucide-react';
import useEventStore from '@/store/useEventStore';
import useAuthStore from '@/store/authStore';
import { toast } from 'sonner';

const UpdateEvent = () => {
  const { id } = useParams();
  const { currentEvent, fetchEventById, updateEvent, isLoading } =
    useEventStore();
  const {user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // State initialization
  const [isInitializing, setIsInitializing] = useState(true);
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
    ticketTypes: { general: '', vip: '', premium: '' },
    ticketsAvailable: { general: '', vip: '', premium: '' },
  });
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [time, setTime] = useState('');
  const [isAm, setIsAm] = useState(true);
  const [deletedImages, setDeletedImages] = useState([]);

  

  // Load event data
  useEffect(() => {
    const loadEvent = async () => {
      try {
        await fetchEventById(id);
      } finally {
        setIsInitializing(false);
      }
    };
    loadEvent();
  }, [id, fetchEventById]);

  // if (!user?._id) {
  //   throw new Error('User not authenticated');
  // }

  // Initialize form with current event data
  useEffect(() => {
    if (currentEvent) {
      setFormData({
        title: currentEvent.title || '',
        description: currentEvent.description || '',
        fullDescription: currentEvent.fullDescription || '',
        category: currentEvent.category || '',
        date: currentEvent.date?.split('T')[0] || '',
        time: currentEvent.time || '',
        location: currentEvent.location || '',
        address: currentEvent.address || '',
        organizer: currentEvent.organizer || '',
        organizerId: currentEvent.organizerId || '',
         // ✅ Remove Object.fromEntries() — ticketPrices is already an object
      ticketTypes: currentEvent.ticketPrices || { general: '', vip: '', premium: '' },
      // ✅ Same for ticketsAvailable
      ticketsAvailable: currentEvent.ticketsAvailable || { general: '', vip: '', premium: '' },
      });

      // Initialize time and AM/PM
      if (currentEvent.time) {
        // Convert stored "HH:MM AM/PM" to 24-hour format for the input
        const [timePart, period] = currentEvent.time.split(' ');
        let [hours, minutes] = timePart.split(':');
        
        if (period === 'PM' && hours !== '12') {
          hours = String(Number(hours) + 12);
        } else if (period === 'AM' && hours === '12') {
          hours = '00';
        }
        
        setTime(`${hours}:${minutes}`);
        setIsAm(period === 'AM');
      }
      setPreviewUrls(currentEvent.images || []);
    }
  }, [currentEvent]);

  // Image handling
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    if (previewUrls.length + files.length > 4) {
      toast.error('Maximum 4 images allowed');
      return;
    }
  
    // Clear the file input to allow re-uploads of same files
    e.target.value = '';
  
    const newImages = [...images, ...files];
    setImages(newImages);
  
    Promise.all(
      files.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      })
    ).then(newUrls => {
      setPreviewUrls(prev => [...prev, ...newUrls]);
    });
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    setTime(value);
    
    // Convert 24-hour format to AM/PM for formData
    let [hours, minutes] = value.split(':');
    hours = parseInt(hours, 10);
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format
    
    setFormData(prev => ({
      ...prev,
      time: `${hours}:${minutes} ${period}`
    }));
  };


  const removeImage = (index) => {
    const urlToRemove = previewUrls[index];
    
    // If it's an existing image (not a blob), add to deleted images
    if (!urlToRemove.startsWith('blob:')) {
      setDeletedImages(prev => [...prev, urlToRemove]);
    }
    
    // Remove from preview URLs
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    
    // If it was a newly uploaded file (blob), remove from images array
    if (urlToRemove.startsWith('blob:')) {
      setImages(prev => 
        prev.filter((_, i) => i !== index - (previewUrls.length - images.length))
      );
    }
  };

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTicketChange = (field, type, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: { ...prev[field], [type]: value === '' ? 0 : Number(value) },
    }));
  };

  const handleAmPmChange = () => {
    if (!time) return;
    
    const newIsAm = !isAm;
    setIsAm(newIsAm);
    
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours, 10);
    
    // Convert between AM/PM while maintaining the same visual time
    if (newIsAm && hours >= 12) {
      hours -= 12;
    } else if (!newIsAm && hours < 12) {
      hours += 12;
    }
    
    // Update formData with new AM/PM
    setFormData(prev => ({
      ...prev,
      time: `${hours}:${minutes} ${newIsAm ? 'AM' : 'PM'}`
    }));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('You must be logged in to update an event');
      return navigate('/login');
    }

    // Validate at least one image exists
    if (previewUrls.length === 0) {
      toast.error('Please keep at least one image');
      return;
    }

    // Validate at least one ticket price is set
    const hasValidTickets = Object.values(formData.ticketTypes).some(
      (price) => price > 0
    );
    if (!hasValidTickets) {
      toast.error('Please set at least one ticket price');
      return;
    }

    if (!time) {
      toast.error('Please set a valid time');
      return;
    }
  

    try {
      const eventData = {
        ...formData,
        time: time ? `${time} ${isAm ? 'AM' : 'PM'}` : currentEvent.time,
        images,
        deletedImages,
        existingImages: previewUrls
        .filter(url => !url.startsWith('blob:')) // Only keep non-blob URLs
        .filter(url => !deletedImages.includes(url)), // Exclude deleted images
    };

    

      const response = await updateEvent(id, eventData);

      if (response?.event) {
        toast.success('Event updated successfully!');
        window.scrollTo(0, 0);
        navigate(`/events/${response.event.id}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update event');
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

  // Loading state
  if (isInitializing || isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <Loader className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  console.log('Input time:', time);
console.log('Form time:', formData.time);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <div className="hero-gradient text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="heading-lg mb-4">Update Event</h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Update your event details and ticket information.
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
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors ${
                        previewUrls.length
                          ? 'border-primary/50'
                          : 'border-muted'
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
      className={`rounded-lg max-h-48 object-cover w-full ${
        deletedImages.includes(url) ? 'opacity-50' : ''
      }`}
    />
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        removeImage(idx);
      }}
      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
    >
      ×
    </button>
    {url.startsWith('blob:') && (
      <span className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
        New
      </span>
    )}
  </div>
))}
                          <div className="col-span-2 flex justify-between items-center">
                            <p className="text-sm text-muted-foreground">
                              {previewUrls.length >= 4
                                ? 'Maximum 4 images'
                                : 'Click to add more images'}
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
                          Updating Event...
                        </>
                      ) : (
                        'Update Event'
                      )}
                    </button>
                    <p className="text-center text-xs text-muted-foreground mt-4">
                      By updating this event, you agree to our Terms of Service
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

export default UpdateEvent;
