import { setLoading, setProducts, setError, setCategoryData } from './emarketSlice';

const shouldFetchProducts = (lastFetched) => {
  if (!lastFetched) return true;
  const now = new Date();
  const lastFetchDate = new Date(lastFetched);
  return now - lastFetchDate > 5 * 60 * 1000;
};


export const fetchProductsThunk = (url, token) => async (dispatch, getState) => {
    const { lastFetched, selectedCategory, categoryData } = getState().emarket;
    
    if (selectedCategory && categoryData[selectedCategory]) {
        const cachedData = categoryData[selectedCategory];
        const cacheAge = new Date() - new Date(cachedData.timestamp);
        
        if (cacheAge < 5 * 60 * 1000) {
            dispatch(setProducts(cachedData.data));
            return;
        }
    }

    dispatch(setLoading(true));
    
    try {
        const headers = {
            'Content-Type': 'application/json',
        };
        
        if (token) {
            headers['Authorization'] = `Token ${token}`;
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        dispatch(setProducts(data));
        
        if (selectedCategory) {
            dispatch(setCategoryData({
                category: selectedCategory,
                data
            }));
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};