import { useState } from 'react';

const StoreForm = ({ setIsFormOpen, currentStore, setStores, stores, handleCreateStore }) => {
  const [name, setName] = useState(currentStore ? currentStore.name : '');
  const [description, setDescription] = useState(currentStore ? currentStore.description : '');
  const [phoneNumber, setPhoneNumber] = useState(currentStore ? currentStore.phoneNumber : '');
  const [address, setAddress] = useState(currentStore ? currentStore.address : '');
  const [avatar, setAvatar] = useState(currentStore ? currentStore.avatar : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStore = {
      id: currentStore ? currentStore.id : Date.now(),
      name,
      description,
      phoneNumber,
      address,
      avatar,
      productCount: currentStore ? currentStore.productCount : 0
    };

    if (currentStore) {
      setStores(stores.map(store => store.id === currentStore.id ? newStore : store));
    } else {
      handleCreateStore(newStore);
    }

    setIsFormOpen(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(file);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full p-2 border rounded" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Description</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="w-full p-2 border rounded" 
              required 
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Phone Number</label>
            <input 
              type="text" 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
              className="w-full p-2 border rounded" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Address</label>
            <input 
              type="text" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              className="w-full p-2 border rounded" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Avatar</label>
            <input 
              type="file" 
              onChange={handleAvatarChange} 
              className="w-full p-2 border rounded" 
              accept="image/*" 
              required 
            />
          </div>
          {avatar && <img src={avatar} alt="Avatar" className="w-16 h-16 rounded-full mb-4" />}
          <div className="flex space-x-2">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
            <button type="button" onClick={() => setIsFormOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default StoreForm;