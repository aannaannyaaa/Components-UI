import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import './App.css';

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [activeTab, setActiveTab] = useState('About Me');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fileInputRef = useRef(null);

  const tabs = ['About Me', 'Experience', 'Recommended'];

  const content = {
    'About Me': "Hello! I'm Claire, your sales rep here from Salesforce...".repeat(100),
    'Experience': 'Experience content goes here.',
    'Recommended': 'Recommended content goes here.'.repeat(100),
  };

  useEffect(() => {
    const savedPhotos = JSON.parse(localStorage.getItem('photos')) || [];
    setPhotos(savedPhotos);
  }, []);

  useEffect(() => {
    localStorage.setItem('photos', JSON.stringify(photos));
  }, [photos]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos((prevPhotos) => [...prevPhotos, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const addPhoto = () => {
    fileInputRef.current.click();
  };

  const handleNext = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-800 to-gray-950 text-white">
      <div className="bg-gray-700 m-6 my-20 rounded-lg w-1/2 border-slate-400 border-2"></div>

      <div className="w-1/2 space-y-4 flex flex-col m-6 my-20">
        <div className="overflow-hidden rounded-lg p-4 bg-gradient-to-tl from-gray-800 to-gray-900 shadow-md shadow-gray-950">
          <div className="relative w-full bg-gray-950 p-2 rounded-3xl mb-2 overflow-hidden">
            <div className="text-xl mx-auto text-center space-x-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`px-12 py-2 rounded-full transition-all duration-300 ease-in-out hover:scale-110 ${
                    activeTab === tab ? 'bg-gray-700 scale-105 text-gray-200' : 'bg-gray-950 hover:bg-gray-750 text-gray-400'
                  } flex-shrink-0`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 rounded-lg p-4 overflow-y-auto custom-scrollbar">
            <p className="text-md text-gray-400">{content[activeTab]}</p>
          </div>
        </div>

        <div className="h-1 rounded-3xl bg-gray-700 w-5/6 mx-auto"></div>

        <div className="bg-gray-800 rounded-lg p-4 overflow-hidden h-1/2">
          <div className="flex items-center mb-4">
            <h2 className="text-3xl bg-gray-950 p-3 px-8 rounded-2xl font-bold ml-4">Gallery</h2>

            <button
              className="ml-52 mr-6 bg-gray-700 p-2 px-4 rounded-full shadow-lg shadow-gray-800 hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-slate-600"
              onClick={addPhoto}
            >
              <div className="flex space-x-1 text-md mt-1">
                <Plus size={24} /> <p>ADD IMAGE</p>
              </div>
            </button>
            <button
              className="bg-gray-900 p-2 mr-6 rounded-full text-gray-600 shadow-lg shadow-gray-900 hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-gray-800"
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="bg-gray-900 p-2 rounded-full text-gray-600 shadow-lg shadow-gray-900 hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-gray-800"
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div className="flex space-x-2 overflow-x-auto h-48 gallery-images">
            {photos.slice(currentIndex, currentIndex + 3).map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Photo ${index + 1}`}
                className="mt-4 object-cover rounded-xl h-48 w-48 flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
