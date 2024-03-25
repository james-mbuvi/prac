import React, { useState, useEffect } from 'react';
import { addDoc, collection, deleteDoc, doc as firestoreDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Finance = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [finances, setFinances] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editFinanceId, setEditFinanceId] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
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

    const fetchFinances = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'finances'));
        const fetchedFinances = [];
        querySnapshot.forEach((doc) => {
          fetchedFinances.push({ id: doc.id, ...doc.data() });
        });
        setFinances(fetchedFinances);
      } catch (error) {
        console.error('Error fetching finances: ', error);
      }
    };

    fetchMembers();
    fetchFinances();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing && editFinanceId) {
        await updateDoc(firestoreDoc(db, 'finances', editFinanceId), {
          memberId: selectedMember,
          amount,
          description,
        });
        console.log('Finance updated with ID: ', editFinanceId);
        setEditFinanceId(null);
        setIsEditing(false);
      } else {
        const docRef = await addDoc(collection(db, 'finances'), {
          memberId: selectedMember,
          amount,
          description,
        });
        console.log('Finance added with ID: ', docRef.id);
      }
      
      setAmount('');
      setDescription('');
    } catch (error) {
      console.error('Error adding/updating finance: ', error);
    }
  };

  const handleEdit = (financeId) => {
    const financeToEdit = finances.find((finance) => finance.id === financeId);
    if (financeToEdit) {
      setSelectedMember(financeToEdit.memberId);
      setAmount(financeToEdit.amount);
      setDescription(financeToEdit.description);
      setEditFinanceId(financeId);
      setIsEditing(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(firestoreDoc(db, 'finances', id));
      console.log('Finance deleted with ID: ', id);
      setFinances(finances.filter((finance) => finance.id !== id));
    } catch (error) {
      console.error('Error deleting finance: ', error);
    }
  };

  return (
    <div className="finance-container bg-blue-200 p-4">
      <h2 className="text-xl font-bold mb-4">Finance Tracker</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-col mb-4">
          <label htmlFor="member" className="mb-1">Member:</label>
          <select
            id="member"
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            required
            className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
          >
            <option value="">Select Member</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="amount" className="mb-1">Amount:</label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="description" className="mb-1">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {isEditing ? 'Update Finance' : 'Add Finance'}
        </button>
      </form>
      <div>
        {finances.map((finance) => (
          <div key={finance.id} className="bg-white rounded p-4 mb-4">
            <p><strong>Member:</strong> {members.find((member) => member.id === finance.memberId)?.name}</p>
            <p><strong>Amount:</strong> {finance.amount}</p>
            <p><strong>Description:</strong> {finance.description}</p>
            <button onClick={() => handleEdit(finance.id)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2">
              Edit
            </button>
            <button onClick={() => handleDelete(finance.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Finance;
