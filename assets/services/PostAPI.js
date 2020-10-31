import Axios from "axios";

function findAll() {
return Axios
    .get("http://127.0.0.1:8000/api/posts")
    .then(response => (response.data["hydra:member"]))

}

function fetchPost(id){
return Axios
    .get("http://127.0.0.1:8000/api/posts/" + id)
}

function newPost(post){
    return Axios.post("http://127.0.0.1:8000/api/posts", post)
}

function deletePost(id){
return Axios
    .delete("http://127.0.0.1:8000/api/posts/" + id)
    .then(response => console.log(response))
}

function updatePost(id, post){
return Axios
    .put("http://127.0.0.1:8000/api/posts/" + id, post)
}



export default {
    findAll,
    fetchPost,
    deletePost,
    updatePost,
    newPost
}