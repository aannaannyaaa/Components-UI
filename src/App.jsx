import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Edit } from 'lucide-react';
import './App.css';

export default function App() {

  const tabs = ['About Me', 'Experience', 'Recommended'];

  const dummyData = {
    'About Me': "Hi, I'm Claire Johnson. I'm a passionate software engineer with over 5 years of experience in building innovative solutions. I specialize in full-stack development and enjoy working with cutting-edge technologies. My hobbies include hiking, reading sci-fi novels, and exploring new programming languages. I love collaborating with teams to create impactful software that solves real-world problems. Let's connect and build something great together!",

    'Experience': `Throughout my career, I have gained extensive experience working with a diverse range of technologies and industries, equipping me with a robust skill set and a deep understanding of software development. My journey began with a solid foundation in computer science, where I developed a strong proficiency in programming languages such as JavaScript, Python, and Java. This technical background allowed me to dive into the world of web development, where I specialized in both frontend and backend technologies.
    One of the core technologies I have worked with extensively is React, a powerful JavaScript library for building user interfaces. React's component-based architecture and virtual DOM have enabled me to create dynamic and responsive web applications with a high level of performance and maintainability. My experience with React includes building complex single-page applications (SPAs), implementing state management solutions using Redux, and integrating various APIs to enhance application functionality.
    In addition to React, I have worked with Node.js, a server-side JavaScript runtime environment that has allowed me to build scalable and efficient backend systems. Node.js's non-blocking, event-driven architecture is well-suited for handling high levels of concurrency, making it an ideal choice for developing real-time applications and microservices. My experience with Node.js includes creating RESTful APIs, implementing authentication and authorization mechanisms, and managing database interactions using tools like MongoDB and PostgreSQL.
    `,

    'Recommended': 'Here are some recommendations for you. Explore the latest trends in technology, learn new programming languages, and stay updated with industry news. Consider joining professional groups or online communities to network with other professionals and share knowledge.'
  };

  const [photos, setPhotos] = useState([]);
  const [activeTab, setActiveTab] = useState('About Me');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(dummyData);

  const fileInputRef = useRef(null);


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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setEditedContent((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab],
    }));
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditedContent((prev) => ({
      ...prev,
      [activeTab]: e.target.value,
    }));
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

          <div className="relative">
            <div className="h-64 rounded-lg p-4 overflow-y-auto custom-scrollbar">
              {isEditing ? (
                <textarea
                  value={editedContent[activeTab]}
                  onChange={handleChange}
                  rows={10}
                  className="w-full h-full text-gray-200 bg-gray-900 border border-gray-600 rounded-md p-2"
                />
              ) : (
                <p className="text-md text-gray-400">{editedContent[activeTab]}</p>
              )}
            </div>
            <button
              className={`absolute bottom-6 right-2 p-2 rounded-full shadow-lg transition-all duration-300 ease-in-out ${
                isEditing ? 'bg-green-700 hover:bg-green-800' : 'bg-gray-700 hover:bg-gray-800'
              }`}
              onClick={isEditing ? handleSave : handleEdit}
            >
              <Edit size={24} />
            </button>
          </div>
        </div>

        <div className="h-1 rounded-3xl bg-gray-700 w-5/6 mx-auto"></div>

        <div className="bg-gray-800 rounded-lg p-4 h-1/2">
          <div className="flex items-center mb-2">
            <h2 className="text-3xl bg-gray-950 p-3 px-8 mb-3 rounded-2xl font-bold ml-4">Gallery</h2>

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

          <div className="flex space-x-2 h-48 gallery-images">
            {photos.slice(currentIndex, currentIndex + 3).map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Photo ${index + 1}`}
                className=" object-cover rounded-xl h-48 w-48 flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
