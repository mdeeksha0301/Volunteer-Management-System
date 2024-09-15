"use strict";
// export const getVolunteerOpportunities = async (req: Request, res: Response) => {
//   try {
//     const opportunities = await VolunteerOpportunity.find();
//     res.status(200).json(opportunities);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventTypeDistribution = exports.getMonthlyEventCount = exports.getParticipatedEvents = exports.participateEvent = exports.deleteEvent = exports.getOrganizationEvents = exports.editEvent = exports.getEvents = exports.createEvent = void 0;
const EventModel_1 = __importDefault(require("../models/EventModel"));
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
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, date, country, city, location, image, type } = req.body;
        // Validate input if necessary
        if (!title || !description || !date || !country || !city || !location || !type || !image) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const event = new EventModel_1.default({
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
        yield event.save();
        res.status(201).json({ message: 'Event created successfully', event });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.createEvent = createEvent;
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
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.body.user) === null || _a === void 0 ? void 0 : _a._id; // Check if user is logged in
        const events = yield EventModel_1.default.find().populate('organizationName');
        // If the user is logged in, send events with the participation option
        if (userId) {
            res.status(200).json({ events, isLoggedIn: true });
        }
        else {
            // If not logged in, send events without the participation option
            res.status(200).json({ events, isLoggedIn: false });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getEvents = getEvents;
// PUT /event/:id
const editEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.id;
        const updatedEvent = yield EventModel_1.default.findByIdAndUpdate(eventId, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.editEvent = editEvent;
// GET /event/organization
const getOrganizationEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organizationId = req.body.user._id; // Assuming organization ID is in the request user object
        const events = yield EventModel_1.default.find({ organization: organizationId });
        res.status(200).json({ events });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getOrganizationEvents = getOrganizationEvents;
// Delete an event (Admin)
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.id;
        yield EventModel_1.default.findByIdAndDelete(eventId);
        res.status(200).json({ message: 'Event deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.deleteEvent = deleteEvent;
// Participate in an event (Volunteer)
const participateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.eventId;
        const userId = req.body.user._id; // Assuming user ID is passed in the request body
        const event = yield EventModel_1.default.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        // Check if the user has already participated
        if (event.participatedEvents.includes(userId)) {
            return res.status(400).json({ message: 'User already participated in this event' });
        }
        event.participatedEvents.push(userId);
        yield event.save();
        res.status(200).json({ message: 'Successfully participated in event', event });
    }
    catch (error) {
        console.error('Error participating in event:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.participateEvent = participateEvent;
// Get participated events for a user (Volunteer)
const getParticipatedEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId; // Assuming user ID is passed as a parameter
        const events = yield EventModel_1.default.find({ participatedEvents: userId });
        res.status(200).json({ events });
    }
    catch (error) {
        console.error('Error fetching participated events:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getParticipatedEvents = getParticipatedEvents;
// In your Event Controller
const getMonthlyEventCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield EventModel_1.default.aggregate([
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getMonthlyEventCount = getMonthlyEventCount;
// In your Event Controller
const getEventTypeDistribution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield EventModel_1.default.aggregate([
            {
                $group: {
                    _id: "$type",
                    count: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(events);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getEventTypeDistribution = getEventTypeDistribution;
