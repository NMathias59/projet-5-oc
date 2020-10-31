import Axios from "axios";


function PostComment(comment){
    return Axios
        .post("http://127.0.0.1:8000/api/comments", comment)
}

function findAll(){
    return Axios
        .get("http://127.0.0.1:8000/api/comments")
        .then(response => response.data["hydra:member"])
}

function deleteComment(id){
    return Axios
        .delete("http://127.0.0.1:8000/api/comments/" + id)
        .then(response => console.log(response))
}


export default {
    PostComment,
    findAll,
    deleteComment
}