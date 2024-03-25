import React, { useState, useEffect } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Membership = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [members, setMembers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editMemberId, setEditMemberId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'members'));
        const fetchedMembers = [];
        querySnapshot.forEach((doc) => {
          fetchedMembers.push({ id: doc.id, ...doc.data() });
        });
        setMembers(fetchedMembers);
      } catch (error) {
        console.error('Error fetching members: ', error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing && editMemberId) {
        await updateDoc(doc(db, 'members', editMemberId), {
          name,
          image,
          phoneNumber,
          location,
          email,
        });
        console.log('Member updated with ID: ', editMemberId);
        setEditMemberId(null);
        setIsEditing(false);
      } else {
        const docRef = await addDoc(collection(db, 'members'), {
          name,
          image,
          phoneNumber,
          location,
          email,
        });
        console.log('Member added with ID: ', docRef.id);
      }
      setName('');
      setImage('');
      setPhoneNumber('');
      setLocation('');
      setEmail('');
    } catch (error) {
      console.error('Error adding/updating member: ', error);
    }
  };

  const handleEdit = (memberId) => {
    const memberToEdit = members.find((member) => member.id === memberId);
    if (memberToEdit) {
      setName(memberToEdit.name);
      setImage(memberToEdit.image);
      setPhoneNumber(memberToEdit.phoneNumber);
      setLocation(memberToEdit.location);
      setEmail(memberToEdit.email);
      setEditMemberId(memberId);
      setIsEditing(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'members', id));
      console.log('Member deleted with ID: ', id);
      // Update the members list after deletion
      setMembers(members.filter((member) => member.id !== id));
    } catch (error) {
      console.error('Error deleting member: ', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 bg-yellow-100 py-8 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="image" className="text-sm">Image URL:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phoneNumber" className="text-sm">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="location" className="text-sm">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          {isEditing ? 'Update Member' : 'Add Member'}
        </button>
      </form>
      <div className="mt-8">
        {members.map((member) => (
          <div key={member.id} className="border border-gray-300 rounded-md p-4 mt-4 flex items-center">
            <img src={member.image} alt="Member" className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm">Phone Number: {member.phoneNumber}</p>
              <p className="text-sm">Location: {member.location}</p>
              <p className="text-sm">Email: {member.email}</p>
              <div className="flex mt-2">
                <button onClick={() => handleEdit(member.id)} className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">Edit</button>
                <button onClick={() => handleDelete(member.id)} className="bg-red-500 text-white px-2 py-1 rounded-md">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Membership;
