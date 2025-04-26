// firebase/firebase.js - Mock Implementation

// Mock firestore implementation
const mockData = {
  auctions: []
};

// Generate a random ID 
const generateId = () => Math.random().toString(36).substring(2, 15);

// Mock Firestore implementation
const firestore = () => {
  return {
    collection: (collectionName) => {
      return {
        add: (data) => {
          const id = generateId();
          const timestamp = new Date();
          const newItem = { 
            id, 
            ...data,
            createdAt: { 
              toMillis: () => timestamp.getTime() 
            }
          };
          mockData[collectionName] = mockData[collectionName] || [];
          mockData[collectionName].push(newItem);
          console.log(`Added document to ${collectionName}:`, newItem);
          return Promise.resolve({ id });
        },
        doc: (id) => {
          return {
            get: () => {
              const collection = mockData[collectionName] || [];
              const doc = collection.find(item => item.id === id);
              return Promise.resolve({
                exists: !!doc,
                id: id,
                data: () => doc || {}
              });
            },
            update: (data) => {
              const collection = mockData[collectionName] || [];
              const index = collection.findIndex(item => item.id === id);
              if (index !== -1) {
                mockData[collectionName][index] = {
                  ...mockData[collectionName][index],
                  ...data
                };
              }
              return Promise.resolve();
            },
            delete: () => {
              const collection = mockData[collectionName] || [];
              const index = collection.findIndex(item => item.id === id);
              if (index !== -1) {
                mockData[collectionName].splice(index, 1);
              }
              return Promise.resolve();
            }
          };
        },
        where: (field, operator, value) => {
          return {
            orderBy: (orderField, direction) => {
              return {
                get: () => {
                  const collection = mockData[collectionName] || [];
                  const filtered = collection.filter(item => {
                    if (operator === '==') return item[field] === value;
                    if (operator === '>=') return item[field] >= value;
                    if (operator === '<=') return item[field] <= value;
                    return true;
                  });
                  
                  // Sort the data
                  const sorted = [...filtered].sort((a, b) => {
                    if (direction === 'desc') {
                      return b[orderField] - a[orderField];
                    }
                    return a[orderField] - b[orderField];
                  });
                  
                  return Promise.resolve({
                    empty: sorted.length === 0,
                    docs: sorted.map(doc => ({
                      id: doc.id,
                      data: () => doc,
                      exists: true
                    }))
                  });
                },
                onSnapshot: (onNext, onError) => {
                  // Call once with initial data
                  const collection = mockData[collectionName] || [];
                  const filtered = collection.filter(item => {
                    if (operator === '==') return item[field] === value;
                    return true;
                  });
                  
                  onNext({
                    docs: filtered.map(doc => ({
                      id: doc.id,
                      data: () => doc,
                      exists: true
                    }))
                  });
                  
                  // Return unsubscribe function
                  return () => console.log('Unsubscribed from snapshot listener');
                }
              };
            },
            get: () => {
              const collection = mockData[collectionName] || [];
              const filtered = collection.filter(item => {
                if (operator === '==') return item[field] === value;
                return true;
              });
              
              return Promise.resolve({
                empty: filtered.length === 0,
                docs: filtered.map(doc => ({
                  id: doc.id,
                  data: () => doc,
                  exists: true
                }))
              });
            },
            onSnapshot: (onNext, onError) => {
              // Call once with initial data
              const collection = mockData[collectionName] || [];
              const filtered = collection.filter(item => {
                if (operator === '==') return item[field] === value;
                return true;
              });
              
              onNext({
                docs: filtered.map(doc => ({
                  id: doc.id,
                  data: () => doc,
                  exists: true
                }))
              });
              
              // Return unsubscribe function
              return () => console.log('Unsubscribed from snapshot listener');
            }
          };
        },
        orderBy: (field, direction) => {
          return {
            get: () => {
              const collection = mockData[collectionName] || [];
              // Sort the data
              const sorted = [...collection].sort((a, b) => {
                if (direction === 'desc') {
                  return b[field] - a[field];
                }
                return a[field] - b[field];
              });
              
              return Promise.resolve({
                empty: sorted.length === 0,
                docs: sorted.map(doc => ({
                  id: doc.id,
                  data: () => doc,
                  exists: true
                }))
              });
            }
          };
        },
        get: () => {
          const collection = mockData[collectionName] || [];
          return Promise.resolve({
            empty: collection.length === 0,
            docs: collection.map(doc => ({
              id: doc.id,
              data: () => doc,
              exists: true
            }))
          });
        },
        onSnapshot: (onNext, onError) => {
          // Call once with initial data
          const collection = mockData[collectionName] || [];
          onNext({
            docs: collection.map(doc => ({
              id: doc.id,
              data: () => doc,
              exists: true
            }))
          });
          
          // Return unsubscribe function
          return () => console.log('Unsubscribed from snapshot listener');
        }
      };
    }
  };
};

// Mock FieldValue
firestore.FieldValue = {
  serverTimestamp: () => new Date()
};

// Mock Auth implementation
const auth = () => {
  return {
    currentUser: {
      uid: 'mock-user-id'
    }
  };
};

export { firestore, auth };
