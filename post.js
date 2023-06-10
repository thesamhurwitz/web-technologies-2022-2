import { Post } from "./src/components/post.js"

const getPost = async ({ id }) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    const data = await res.json()

    return { data }
}

const getComments = async ({ id }) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)

    if (!res.ok) {
        throw new Error(res.statusText)
    }
    
    const items = await res.json()

    return { items }
}

const renderPost = ({ body, title }) => `
    <h1>${title}</h1>
    <div>
        ${body}
    </div>
`

const renderComment = ({ name, body }) => `
    <h4>${name}</h4>
    <div>${body}</div>
`

const init = () => {
    const post = document.getElementById('post')
    new Post(post, { 
        renderPost,
        getPost,
        renderComment,
        getComments,
     }).init()
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}
