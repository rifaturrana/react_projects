import {useRouter} from 'next/router'

const BlogDetails = ()=>{
    const router = useRouter()
    const {blogId} = router.query
    console.log(blogId);
    return(
        <div>
            <h1>Blog Details of {blogId}</h1>
        </div>
    )
}

export default BlogDetails