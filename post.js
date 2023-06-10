import { Post } from "./src/components/post.js"

const getPost = async ({ id }) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const data = await res.json()

    console.log(data)

    return { data }
}

const renderPost = ({ id, body, title }) => `
    <h1>${title}</h1>
    <div>
        ${body}
    </div>
`

const init = () => {
    const post = document.getElementById('post')
    new Post(post, { 
        renderPost,
        getPost
     }).init()
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}
