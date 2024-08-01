import axios from "axios";

const API=axios.create({baseURL:'https://fakestoreapi.com'})


const storedUser = JSON.parse(localStorage.getItem('user'));
const token = storedUser ? storedUser.user.token : null;
API.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
    
  }
);




//contacts
export const getContacts = () => API.get(`/users`)
export const updateContacts = (contact) => API.put(`/Contact/`, contact)

//abouts

export const getAbouts = () => API.get(`/products`)
export const updateAbout = (about) => API.put(`/about`, about)

//category
export const getCategories = () => API.get(`/products`)

//product
export const getAllProducts = () => API.get(`/products`)
export const getProductsById = (id) => API.get(`/products/${id}`)
export const getProductsByCategoryId = (id) => API.get(`/products/category/${id}`) // name ile ama biz id yapcaz !

//catalogs
export const getAllCatalogs = () => API.get(`/products`)

//services
export const getServices = () => API.get(`/products`)
export const addService = (service) => API.get(`/products`,service)
export const updateService = (id, updatedService) => API.get(`/products/${id}`,updatedService)
export const deleteService = (id) => API.get(`/products/${id}`)

//quality
export const getQualities = () => API.get(`/products`)
export const addQualiity = (service) => API.get(`/products`,service)
export const updateQuality = (id, updatedQuality) => API.get(`/products/${id}`,updatedQuality)
export const deleteQuality = (id) => API.get(`/products/${id}`)

//customer stories
export const getCustomerStories = () => API.get(`/products`)

//team
export const getTeams = () => API.get(`/products`)

//users
 export const getUsers = () => API.get(`/users`)

//comment
export const getComments=()=>API.get('/products')

//property
export const getProperties=()=>API.get('/products');
export const getPropertyTypes=()=>API.get('/products');

//models
export const getModels=()=>API.get('/products');
export const addModel=(model)=>API.get('/products');
export const updateModel=(id,model)=>API.get('/products');
export const deleteModel=(id)=>API.get('/products');

// BRANDS
export const getBrands=()=>API.get('/products');
export const addBrand=(brand)=>API.get('/products');
export const updateBrand=(id,brand)=>API.get('/products');
export const deleteBrand=(id)=>API.get('/products');








export const getHighlightsProducts = (userId) => API.get(`/Product/get-highlights/${userId}`)
export const getProductsByBrandId = (id) => API.get(`/Product/get-brand/${id}`)
export const addProduct = (product) => API.post(`/Product/add/`,product, {headers: {'Content-Type':'multipart/form-data'}})
export const updateProduct = (product) => API.put(`/Product/`,product)
export const deleteProduct = (id) => API.delete(`/Product/${id}`)
export const getProductsBySearch = (categoryName) => API.get(`/Product/category/${categoryName}`)


//user
export const login = (formdata) => API.post('/User/login', formdata)
export const signUp = (user) => API.post('/User/sign-up', user)
export const updateUser = (id,user) => API.put(`/User/update/${id}`, user)

export const getAllBrand=()=>API.get(`/Brand/get-all`)
export const getBrandByCategory=(categoryId)=>API.get(`/Brand/get/${categoryId}`)
//comment
export const getCommentByProductId=(productId)=>API.get(`/Comment/get-by-product/${productId}`)
export const getCommentByUserId=(userId)=>API.get(`/Comment/get-by-user/${userId}`)
export const addComment=(comment)=>API.post(`/Comment/add`,comment)
export const updateComment=(comment)=>API.put(`/Comment/update`,comment)
export const deleteComment=(id)=>API.put(`/Comment/delete/${id}`)
//favoritesw
export const getFavoritesByUserId = (userId) => API.get(`/Product/get-favori/${userId}`)
export const addFavorite=(product)=>API.post('/Favorite/add',product)
export const deleteFavorite = (id) => API.delete(`/Favorite/delete/${id}`)
export const deleteFavoriteByUserAndProductId = (userId,productId) => API.delete(`/Favorite/delete/${userId}/${productId}`)
//rental
export const getRentalsByUserId = (userId) => API.get(`/Rental/get-by-user-id/${userId}`)
export const getRentalsByProductId = (prodId) => API.get(`/Rental/get-by-product-id/${prodId}`)
export const addRental=(rental)=>API.post('/Rental/add',rental)

//message
export const getMessagesByUserId = (userId) => API.get(`/Message/get-by-user/${userId}`)
export const getMessagesUserToUser = (senderId,receiverId) => API.get(`/Message/get-userto-user/${senderId}/${receiverId}`)




