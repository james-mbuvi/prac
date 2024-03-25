import React, { useState } from 'react';

const ImageWithButton = ({ imageUrl, buttonText, extraText }) => {
  return (
    <div className="flex flex-col items-center">
      <img className="w-48 h-48 object-cover rounded-lg mb-2" src={imageUrl} alt="Image" />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">{buttonText}</button>
      {extraText && (
        <div className="text-center mt-2">
          <h3 className="text-lg font-semibold">{extraText.title}</h3>
          <p className="text-gray-700">{extraText.paragraph}</p>
        </div>
      )}
    </div>
  );
}

const NavBar = ({ handleSearch }) => {
  return (
    <nav className="bg-gray-800 py-4 px-8 w-full mb-4">
      <div className="max-w-7xl mx-auto">
        <input type="text" placeholder="View Member's job title..." className="bg-white rounded-full px-4 py-2 w-full" onChange={handleSearch} />
      </div>
    </nav>
  );
}

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [memberIndex, setMemberIndex] = useState(-1); // Initialize with -1 to indicate no match
  const [error, setError] = useState('');

  const imageUrls = [
    "/src/Home/images/im1.jpeg",
    "/src/Home/images/im2.jpeg",
    "/src/Home/images/im3.jpeg",
    "/src/Home/images/im4.jpeg",
    "/src/Home/images/im5.jpeg",
    "/src/Home/images/im6.jpeg"
  ];
  const buttonTexts = [
    "Vincent",
    "Allan",
    "Francis",
    "Mbuvi",
    "Mary",
    "Jane"
  ];
  const extraTexts = [
    { title: "Marketer", paragraph: "Vincent is a dedicated marketer. He leads our marketing efforts and ensures our products reach the right audience." },
    { title: "Designer", paragraph: "Allan is our talented designer. He is responsible for creating stunning designs and user interfaces." },
    { title: "Developer", paragraph: "Francis is a skilled developer. He specializes in backend development and ensures our applications run smoothly." },
   
    { title: "CEO", paragraph: "Mbuvi is the CEO of our company. He leads the executive team and oversees the overall operations." },
    { title: "HR Manager", paragraph: "Mary is our HR Manager. She oversees all human resource activities and ensures a positive work environment." },
    { title: "Product Manager", paragraph: "Jane is our Product Manager. She leads product development and ensures our products meet customer needs." }
  ];

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === '') {
      setMemberIndex(-1);
      setError('');
      return;
    }

    
    const index = buttonTexts.findIndex(text => text.toLowerCase().includes(query));
    if (index !== -1) {
      setMemberIndex(index);
      setError('');
    } else {
      setMemberIndex(-1);
      setError(`"${query}" is not in the members search a name that you see in the page`);
    }
  }

  return (
    <div>
      <NavBar handleSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchQuery === '' ? (
          imageUrls.map((url, index) => (
            <div key={index}>
              <ImageWithButton imageUrl={url} buttonText={buttonTexts[index]} />
            </div>
          ))
        ) : memberIndex !== -1 && (
          <div>
            <ImageWithButton
              imageUrl={imageUrls[memberIndex]}
              buttonText={buttonTexts[memberIndex]}
              extraText={extraTexts[memberIndex]}
            />
          </div>
        )}
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default HomePage;





