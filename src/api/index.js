import axios from "axios";

const API=axios.create({baseURL:'https://localhost:7183/api/v2'})
function getTokenFromCookie() {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=');
        acc[name] = value;
        return acc;
    }, {});

    return cookies.authToken;
}

// const token = getTokenFromCookie();
// API.interceptors.request.use(
//   (config) => {
//     if (token) {
//       config.headers.Authorization = `${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
    
//   }
// );




//contacts
export const getContacts = () => API.get(`/Contact`)
export const updateContacts = (contact) => API.put(`/Contact/`, contact) //

//abouts

export const getAbouts = () => API.get(`/AboutUs`)
export const updateAbout = (about) => API.put(`/AboutUs`, about) //

//category
export const getCategories = () => API.get(`/Category`)

//product
export const getAllProducts = () => API.get(`/Product`)
export const getProductsById = (id) => API.get(`/Product/${id}`)
export const getProductsByCategoryId = (id) => API.get(`/Product/Category/${id}`) // name ile ama biz id yapcaz ! //

//catalogs
export const getAllCatalogs = () => API.get(`/Catalog`)

//services
export const getServices = () => API.get(`/Employment`)
export const addService = (service) => API.get(`/Employment`,service)
export const updateService = (updatedService) => API.get(`/Employment`,updatedService)
export const deleteService = (id) => API.get(`/Employment/${id}`)

//quality
export const getQualities = () => API.get(`/Quality`)
export const addQualiity = (quality) => API.get(`/Quality`,quality)
export const updateQuality = (updatedQuality) => API.get(`/Quality`,updatedQuality)
export const deleteQuality = (id) => API.get(`/Quality/${id}`)

//comments
export const getCustomerStories = () => API.get(`/Comment`)

//team
export const getTeams = () => API.get(`/Member`)

//users
 export const getUsers = () => API.get(`/Customer`) //

//comment
export const getComments=()=>API.get('/Comment')//

//property
export const getProperties=()=>API.get('/Property'); 
export const getPropertyTypes=()=>API.get('/PropertyType'); 

//models
export const getModels=()=>API.get('/Product');
export const addModel=(model)=>API.get('/Product');
export const updateModel=(id,model)=>API.get('/Product');
export const deleteModel=(id)=>API.get('/Product');

// BRANDS
export const getBrands=()=>API.get('/Product');
export const addBrand=(brand)=>API.get('/Product');
export const updateBrand=(id,brand)=>API.get('/Product');
export const deleteBrand=(id)=>API.get('/Product');








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




