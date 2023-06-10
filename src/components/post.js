export class Post {
    #el = null
    #renderPost = null
    #postEl = null
    #commentsEl = null
    #getPost = null
    #postId = null
    #getComments = null
    #renderComment = null

    constructor(el, options) {
        const { renderPost, getPost, getComments, renderComment } = options
        this.#el = el
        this.#postEl = el.querySelector('[data-post]')
        this.#commentsEl = el.querySelector('[data-comments]')
        this.#renderPost = renderPost
        this.#getPost = getPost
        this.#getComments = getComments
        this.#renderComment = renderComment

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
            const [post, comments] = await Promise.all([
                this.#getPost({ id: this.#postId }),
                this.#getComments({ id: this.#postId})
            ])
            this.renderPost(post)
            this.renderComments(comments)
        } catch (error) {
            console.error(error)
            alert('Could not load post');
        }
    }

    renderPost ({ data }) {
        const element = document.createElement('div')
        element.innerHTML = this.#renderPost(data)
        this.#postEl.appendChild(element)
    }

    renderComments({ items }) {
        this.#commentsEl.innerHTML = items.map(c => this.#renderComment(c)).join('')
    }
}