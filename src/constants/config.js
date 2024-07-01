export const API_NOTIFICATION_MESSAGES =  {
    loading: {
        title: 'Loading.....',
        msg: 'Loading , please wait.....'
    },
    success: {
        title: 'Success',
        msg: 'Successfully loaded',
    },
    responseFailure: {
        title: 'Error',
        msg: 'Error occured while fetching response , please try later',
    },
    requestFailure: {
        title: 'Error',
        msg: 'Error while parsing request data..',
    },
    networkFailure: {
        title: 'Error',
        msg: 'Error while connecting to Server, please check internet connectivity and try again ...',
    }
}

//sample request
// {url: '/' , method: POST/GET/PATCH , params: true/false, query: true/false }
export const SERVICE_URLS = { 
    userSignup: { url: '/signup', method: 'POST'},
    userLogin: {url: '/login', method: 'POST'},
    uploadFile : {url: '/file/upload', method: 'POST'},
    createPost : {url: '/create/post', method: 'POST'},
    getAllPosts: {url: '/posts' , method: 'GET', params:true},
    getPostById : {url: 'post' , method: 'GET' , query: true},
    updatePost : { url : 'update', method: 'PUT', query: true},
    deletePost : { url : 'delete' , method: 'DELETE', query: true },
    postComment: { url: '/comment/new' , method: 'POST'},
    getAllComments: { url: 'comments' , method: 'GET' , query: true},
    deleteComment: {url: '/comment/delete', method: 'DELETE', query: true}
}
