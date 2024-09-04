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
export const getContacts = () => API.get(`/Contact`)//ok
export const updateContact = (id, contact) => API.put(`/Contact/${id}`, contact);//ok

//services
export const getServices = () => API.get(`/Employment`) //ok
export const addService = (service) => API.post(`/Employment`,service) // ok
export const updateService = (id , updatedService) => API.put(`/Employment/${id}`,updatedService)//ok
export const deleteService = (id) => API.delete(`/Employment/${id}`) //ok

//team
export const getTeams = () => API.get(`/Member`) //ok
export const addTeam = (team) => API.post(`/Member/sign-up`,team ,{headers: {'Content-Type':'multipart/form-data'}}) //ok
export const updateTeam = (updatedTeam) => API.put(`/Member/update` , updatedTeam ,)//ok
export const deleteTeam = (id) => API.delete(`/Member/${id}`)//ok

//category
export const getCategories = () => API.get(`/Category`)//ok
export const addCategory = (category) => API.post(`/Category`,category,{headers: {'Content-Type': 'application/json',},}) //ok
export const updateCategory = (id , updatedCategory) => API.put(`/Category/${id}`,updatedCategory ,{headers: {'Content-Type': 'application/json',},}) //ok
export const deleteCategory= (id) => API.delete(`/Category/${id}`) //ok

//property
export const getProperties=()=>API.get('/Property'); //ok
export const addProperty = (property) => API.post(`/Property`,property,{headers: {'Content-Type': 'application/json',},}) //ok
export const updateProperty = (id , updatedProperty) => API.put(`/Property/${id}`,updatedProperty ,{headers: {'Content-Type': 'application/json',},}) 
export const deleteProperty= (id) => API.delete(`/Property/${id}`)

//PROPERTY TYPE
export const getPropertyTypes=()=>API.get('/PropertyType'); //ok
export const addPropertyType = (property) => API.post(`/PropertyType`,property,{headers: {'Content-Type': 'application/json',},}) //ok
export const updatePropertyType = (id , updatedPropertyType) => API.put(`/PropertyType/${id}`,updatedPropertyType ,{headers: {'Content-Type': 'application/json',},}) //ok
export const deletePropertyType= (id) => API.delete(`/PropertyType/${id}`) //ok






//abouts
export const getAbouts = () => API.get(`/AboutUs`)
export const updateAbout = (about) => API.put(`/AboutUs`, about) //


//product
export const getAllProducts = () => API.get(`/Product`)
export const getProductsById = (id) => API.get(`/Product/${id}`)
export const getProductsByCategoryId = (id) => API.get(`/Product/Category/${id}`)

//catalogs
export const getAllCatalogs = () => API.get(`/Catalog`)


//quality
export const getQualities = () => API.get(`/Quality`)
export const addQualiity = (quality) => API.get(`/Quality`,quality)
export const updateQuality = (updatedQuality) => API.get(`/Quality`,updatedQuality)
export const deleteQuality = (id) => API.get(`/Quality/${id}`)

//comments
export const getCustomerStories = () => API.get(`/Comment`)



//users
 export const getUsers = () => API.get(`/Customer`) //

//comment
export const getComments=()=>API.get('/Comment')//



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




