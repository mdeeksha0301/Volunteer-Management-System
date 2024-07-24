

// export const getVolunteerOpportunities = async (req: Request, res: Response) => {
//   try {
//     const opportunities = await VolunteerOpportunity.find();
//     res.status(200).json(opportunities);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const getVolunteerOpportunities = async (req: Request, res: Response) => {
//   try {
//       const opportunities = await VolunteerOpportunity.find();
//       res.status(200).json(opportunities);
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error fetching volunteer opportunities' });
//   }
// };



import { Request, Response } from 'express';
import VolunteerOpportunity, { IVolunteerOpportunity } from '../models/EventModel';
import upload from '../config/s3';


// Create a new event (Organization)
// export const createEvent = async (req: Request, res: Response) => {
//   // upload.single('image')(req, res, async (err: any) => {
//   //   if (err) {
//   //     return res.status(500).json({ message: 'Error uploading image', error: err });
//   //   }

//     // Type assertion for req.file
//     // const file = req.file as Express.MulterS3.File;

//     // if (!file) {
//     //   return res.status(400).json({ message: 'No file uploaded' });
//     // }

//     try {
//       const { title, description, date, country, city, location, image} = req.body;

//       if (!req.body.user) {
//         return res.status(403).json({ message: 'User not authenticated' });
//       }

//       const event = new VolunteerOpportunity({
//         organization: req.body.user._id,
//         title,
//         description,
//         date,
//         country,
//         city,
//         location,
//         // image: file.location, // Use the location property from S3
//         image,
//       });

//       await event.save();
//       res.status(201).json({ message: 'Event created successfully', event });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   });
// };

// Create a new event (Organization)
export const createEvent = async (req: Request, res: Response) => {
  try {
      const { title, description, date, country, city, location, image, type } = req.body;
      // Validate input if necessary
    if (!title || !description || !date || !country || !city || !location || !type || !image) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
      const event = new VolunteerOpportunity({
          organization: req.body.user._id,
          title,
          description,
          date,
          country,
          city,
          location,
          type,
          image
      });
      await event.save();
      res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};




// Get all events (Admin and Volunteers)
// export const getEvents = async (req: Request, res: Response) => {
//     try {
//         const events = await VolunteerOpportunity.find().populate('organizationName');
//         console.log(events)
//         res.status(200).json({ events });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

export const getEvents = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user?._id; // Check if user is logged in
    const events = await VolunteerOpportunity.find().populate('organizationName');
    
    // If the user is logged in, send events with the participation option
    if (userId) {
      res.status(200).json({ events, isLoggedIn: true });
    } else {
      // If not logged in, send events without the participation option
      res.status(200).json({ events, isLoggedIn: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /event/:id
export const editEvent = async (req: Request, res: Response) => {
  try {
      const eventId = req.params.id;
      const updatedEvent = await VolunteerOpportunity.findByIdAndUpdate(eventId, req.body, { new: true });
      if (!updatedEvent) {
          return res.status(404).json({ message: 'Event not found' });
      }
      res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};

// GET /event/organization
export const getOrganizationEvents = async (req: Request, res: Response) => {
  try {
      const organizationId = req.body.user._id; // Assuming organization ID is in the request user object
      const events = await VolunteerOpportunity.find({ organization: organizationId });
      res.status(200).json({ events });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};


// Delete an event (Admin)
export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const eventId = req.params.id;
        await VolunteerOpportunity.findByIdAndDelete(eventId);
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};





// Participate in an event (Volunteer)
export const participateEvent = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.body.user._id; // Assuming user ID is passed in the request body

    const event = await VolunteerOpportunity.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the user has already participated
    if (event.participatedEvents.includes(userId)) {
      return res.status(400).json({ message: 'User already participated in this event' });
    }

    event.participatedEvents.push(userId);
    await event.save();

    res.status(200).json({ message: 'Successfully participated in event', event });
  } catch (error) {
    console.error('Error participating in event:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get participated events for a user (Volunteer)
export const getParticipatedEvents = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId; // Assuming user ID is passed as a parameter

    const events = await VolunteerOpportunity.find({ participatedEvents: userId });
    res.status(200).json({ events });
  } catch (error) {
    console.error('Error fetching participated events:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// In your Event Controller

export const getMonthlyEventCount = async (req: Request, res: Response) => {
  try {
      const events = await VolunteerOpportunity.aggregate([
          {
              $group: {
                  _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
                  count: { $sum: 1 }
              }
          },
          {
              $sort: { _id: 1 }
          }
      ]);

      res.status(200).json(events);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};


// In your Event Controller

export const getEventTypeDistribution = async (req: Request, res: Response) => {
  try {
      const events = await VolunteerOpportunity.aggregate([
          {
              $group: {
                  _id: "$type",
                  count: { $sum: 1 }
              }
          }
      ]);

      res.status(200).json(events);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};


