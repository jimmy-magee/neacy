import axios from 'axios'

const webClient = axios.create({
  baseURL: `/`,
});

webClient.interceptors.request.use(function (config) {
    config.headers['Authorization'] = localStorage.authHeader
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// Add a response interceptor
webClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  }, function (error) {

      if(error.response.status == 401 ) {
          error.response.data = {'message': 'Unauthorised to access this page'}
      }
      if(error.response.status == 403) {
           error.data = {'message': 'Forbidden to access this page'}
      }
      if(error.response.status == 400 ) {
          //const formValidationException = JSON.parse(error.response.data.error)
          //const fieldErrors = formValidationException.fieldErrors.map( x =>  [x.fieldName, x.defaultMessage])
          //store.commit('setFormValidationError', formValidationException)
      }
    //store.commit('setError', error.response.data)
     return Promise.reject(error);
  });

  export default webClient