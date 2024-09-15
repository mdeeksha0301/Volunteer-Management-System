"use strict";
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
exports.deleteUser = exports.getUsers = exports.deleteEvent = exports.getEvents = exports.deleteDonation = exports.getDonations = exports.deleteOrganization = exports.getOrganizations = exports.deleteVolunteer = exports.getVolunteers = void 0;
const User_1 = __importDefault(require("../models/User"));
const Donation_1 = __importDefault(require("../models/Donation")); // Import Donation model
const EventModel_1 = __importDefault(require("../models/EventModel"));
// get volunteers
const getVolunteers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const volunteerData = yield User_1.default.find({ role: 'volunteer' }).sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            totalCount: volunteerData.length,
            message: 'Volunteer List Fetched Successfully',
            volunteerData,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error fetching volunteer Data',
        });
    }
});
exports.getVolunteers = getVolunteers;
const deleteVolunteer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.default.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'Volunteer deleted successfully' });
    }
    catch (error) {
        res.status(500).send({ error: 'Error deleting volunteer' });
    }
});
exports.deleteVolunteer = deleteVolunteer;
// get your organizations
const getOrganizations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organizationData = yield User_1.default.find({ role: 'organization' }).sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            totalCount: organizationData.length,
            message: 'Organization List Fetched Successfully',
            organizationData,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error fetching Organization Data',
        });
    }
});
exports.getOrganizations = getOrganizations;
const deleteOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.default.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'Organization deleted successfully' });
    }
    catch (error) {
        res.status(500).send({ error: 'Error deleting organization' });
    }
});
exports.deleteOrganization = deleteOrganization;
// Donation Controllers
const getDonations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const donations = yield Donation_1.default.find();
        res.status(200).send({ donationsData: donations });
    }
    catch (error) {
        res.status(500).send({ error: 'Error fetching donations' });
    }
});
exports.getDonations = getDonations;
const deleteDonation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Donation_1.default.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'Donation deleted successfully' });
    }
    catch (error) {
        res.status(500).send({ error: 'Error deleting donation' });
    }
});
exports.deleteDonation = deleteDonation;
// Event Controllers
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield EventModel_1.default.find();
        res.status(200).json({ eventsData: events });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error fetching Events Data',
        });
    }
});
exports.getEvents = getEvents;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.id;
        const deletedEvent = yield EventModel_1.default.findByIdAndDelete(eventId);
        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully', deletedEvent });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error deleting events Data',
        });
    }
});
exports.deleteEvent = deleteEvent;
// get all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({ role: 'volunteer' });
        res.status(200).json({ userData: users });
    }
    catch (error) {
        res.status(500).send('Error fetching users');
    }
});
exports.getUsers = getUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.default.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).send('Error deleting user');
    }
});
exports.deleteUser = deleteUser;
