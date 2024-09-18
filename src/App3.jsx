import  { useState, useEffect } from 'react';
import axios from 'axios';

const App3 = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);

  // Fetch images from backend
  const fetchImages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/images');
      setUploadedImages(res.data);
    } catch (err) {
      console.error('Failed to fetch images', err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle image selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);

    try {
      await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchImages(); // Fetch updated image list
    } catch (err) {
      console.error('Failed to upload image', err);
    }
  };

  return (
    <div className="App">
      <h1>Upload an Image</h1>
      <form onSubmit={handleImageUpload}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Upload</button>
      </form>
      {preview && (
        <div>
          <h3>Preview:</h3>
          <img src={preview} alt="Preview" style={{ width: '300px' }} />
        </div>
      )}
      <div>
        <h3>Uploaded Images:</h3>
        <div className="image-list">
          {uploadedImages.map((img) => (
            <img
              key={img._id}
              src={`http://localhost:5000/image/${img.filename}`}
              alt={img.filename}
              style={{ width: '300px', margin: '10px' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App3;
