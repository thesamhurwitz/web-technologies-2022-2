export class Post {
    #el = null
    #renderPost = null
    #getPost = null
    #postId = null

    constructor(el, options) {
        const { renderPost, getPost } = options
        this.#el = el
        this.#renderPost = renderPost
        this.#getPost = getPost

        window.onpopstate = () => {
            this.init()
        }
    }

    init () {
        const url = new URL(window.location.href);
        const postId = +url.searchParams.get('id');

        this.#postId = postId

        this.loadPost()
    }

    async loadPost () {
        try {
            const { data } = await this.#getPost({ id: this.#postId })
            this.renderPost(data)
        } catch (error) {
            console.log(error);
        }
    }

    renderPost (data) {
        const element = document.createElement('div')
        element.innerHTML = this.#renderPost(data)
        this.#el.appendChild(element)
    }
}