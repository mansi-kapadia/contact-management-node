const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const getContacts = asyncHandler(async (request , response) => {
    const contacts = await Contact.find({ user_id : request.user.id });
    return response.status(200).json(contacts);
});

const getcontactById =  asyncHandler(async(request , response) => {
    const id = request.params.id;
    const contact = await Contact.findById(id);
    if(!contact) {
        response.status(404);
        throw new Error("Contact not found");
    }
    return response.status(200).json(contact);
});

const addContact = asyncHandler(async(request , response) => {
    console.log(request.body)
    const { name , email , phone   } = request.body
    if(!name || !email || !phone){
        response.status(400);
        throw new Error("All fields are mandatory.");
    }
    const contact = await Contact.create({
        name, email, phone, user_id : request.user.id
    });

    return response.status(201).json(contact);
});

const updateContact = asyncHandler(async(request , response) => {
    const id = request.params.id;
    
    const contact = await Contact.findById(id);

    if (!contact) {
        response.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== request.user.id) {
        response.status(403);
        throw new Error("User does not have permission to update this contact");
    }
    
    const updatedContact = await Contact.findByIdAndUpdate(
        id,
        request.body , 
        { new : true }
    );
     
    if(!updatedContact) {
        response.status(404);
        throw new Error("Contact not found");
    }

    return response.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async(request , response) => {
    const id = request.params.id;
    
    const contact = await Contact.findById(id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== request.user.id) {
        response.status(403);
        throw new Error("User does not have permission to delete this contact");
    }

    const deletedContact = await Contact.findByIdAndDelete(request.params.id);

    if (!deletedContact) {
        response.status(404);
        throw new Error("Contact not found");
    }

    return response.status(200).json(deletedContact);
});

module.exports = { getContacts , getcontactById , addContact , updateContact , deleteContact }