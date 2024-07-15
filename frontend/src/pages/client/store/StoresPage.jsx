import { useEffect, useState } from 'react';
import StoreForm from '../../../components/client/storePage/storeForm/StoreForm';
import StoreCard from '../../../components/client/storePage/storeCard/StoreCard';
import { createNewStore, deleteStore, getMyStores } from '../../../services/stores';

const StoresPage = () => {
  const [stores, setStores] = useState();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentStore, setCurrentStore] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      const response = await getMyStores();
      setStores(response.stores);
    }
    fetchStores()
  }, [])            

  const handleAddNewStore = async () => {
    setIsFormOpen(true);
    setCurrentStore(null);
  };

  const handleCreateStore = async (newStore) => {
    const response = await createNewStore(newStore);
    setStores([...stores, response.store]);
    setIsFormOpen(false);
  }

  const handleEditStore =  async (store) => {
    setIsFormOpen(true);
    setCurrentStore(store);
  };

  const handleDeleteStore = async (storeId) => {
    const confirmed = window.confirm("Are you sure?");
    if (confirmed) {
      await deleteStore(storeId);
      setStores(stores.filter(store => store.id !== storeId));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <button 
        onClick={handleAddNewStore} 
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add New Store
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stores && stores.map(store => (
          <StoreCard 
            key={store.id} 
            store={store} 
            onEdit={() => handleEditStore(store)} 
            onDelete={() => handleDeleteStore(store.id)} 
          />
        ))}
      </div>
      {isFormOpen && (
        <StoreForm 
          setIsFormOpen={setIsFormOpen} 
          currentStore={currentStore} 
          setStores={setStores} 
          stores={stores} 
          handleCreateStore={handleCreateStore}
        />
      )}
    </div>
  );
}

export default StoresPage;