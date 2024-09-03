import { toast } from 'react-toastify';

const apiResponseMiddleware = store => next => action => {
  if (action.type.endsWith('_SUCCESS')) {
    if (action.payload.status === 200) {
      toast.success('İstek başarılı!');
    }
    // Handle other success status codes if needed
    else if (action.payload.status === 201) {
      toast.success('Başarıyla oluşturuldu!');
    }
    // Add more success messages for different status codes as needed
  } 
  
  else if (action.type.endsWith('_FAILURE')) {
    const statusCode = action.payload.response?.status;

    switch (statusCode) {
      case 400:
        toast.error('Geçersiz istek. Lütfen verilerinizi kontrol edin.');
        break;
      case 401:
        toast.error('Önce giriş yapmalısınız.');
        break;
      case 403:
        toast.error('Bu işleme izin verilmedi.');
        break;
      case 404:
        toast.error('Aradığınız kaynak bulunamadı.');
        break;
      case 500:
        toast.error('Sunucu hatası. Lütfen tekrar deneyin.');
        break;
      default:
        toast.error('Bir hata oluştu. Lütfen tekrar deneyin.');
        break;
    }
  }
  
  else if (action.type.endsWith('_ERROR')) {
    // Handle unexpected errors
    toast.error('Bir beklenmedik hata oluştu.');
  }

  return next(action);
};

export default apiResponseMiddleware;
