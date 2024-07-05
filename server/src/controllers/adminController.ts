import { Request, Response } from 'express';
import User from '../models/User';
import Donation, { IDonation } from '../models/DonationModel'; // Import Donation model
import VolunteerOpportunity, { IVolunteerOpportunity } from '../models/EventModel';

// get volunteers
export const getVolunteers = async (req: Request, res: Response) => {
  try {
    const volunteerData = await User.find({ role: 'volunteer' }).sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      totalCount: volunteerData.length,
      message: 'Volunteer List Fetched Successfully',
      volunteerData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error fetching volunteer Data',
    });
  }
};

export const deleteVolunteer = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Volunteer deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Error deleting volunteer' });
  }
};

// get your organizations
export const getOrganizations = async (req: Request, res: Response) => {
  try {
    const organizationData = await User.find({ role: 'organization' }).sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      totalCount: organizationData.length,
      message: 'Organization List Fetched Successfully',
      organizationData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error fetching Organization Data',
    });
  }
};

export const deleteOrganization = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Organization deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Error deleting organization' });
  }
};

// Donation Controllers
export const getDonations = async (req: Request, res: Response) => {
  try {
    const donations = await Donation.find();
    res.status(200).send({ donationsData: donations });
  } catch (error) {
    res.status(500).send({ error: 'Error fetching donations' });
  }
};

export const deleteDonation = async (req: Request, res: Response) => {
  try {
    await Donation.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Donation deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Error deleting donation' });
  }
};

// Event Controllers
export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await VolunteerOpportunity.find();
    res.status(200).json({ eventsData: events });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Error fetching Events Data',
    });
  }
};


export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;
    const deletedEvent = await VolunteerOpportunity.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully', deletedEvent });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Error deleting events Data',
    });
  }
};


// get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ role: 'volunteer' });
    res.status(200).json({ userData: users });
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).send('Error deleting user');
  }
};