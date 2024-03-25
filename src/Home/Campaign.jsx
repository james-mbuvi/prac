import React, { useState } from 'react';

const CampaignForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { name, email, title, description });
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-blue-100 p-6 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm">Your Name:</label>
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
          <label htmlFor="email" className="text-sm">Your Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm">Campaign Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm">Campaign Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1"
            rows="4"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Submit Campaign
        </button>
      </form>
    </div>
  );
};

export default CampaignForm;
