import { supabase } from "../supabaseClient"
import { useState, useEffect } from "react"
import { useAppSelector } from "../reduxHooks"

const SupabaseTest =()=> {
    const [posts,setPosts] = useState([])
    const [post,setPost] = useState({title:'', content:""})
    const {title, content} = post
    const id = useAppSelector(state=> state.userData.user?.id)   
    
    useEffect(()=>{
        fetchPosts()
    },[])

    async function createPost() {
        await supabase
        .from('posts')
        .insert([
            {title, content}            
        ])
        .single()
        setPost({title:"", content:""})
        fetchPosts()
        
    }

    async function fetchPosts() {
        const{data} =await supabase.from('posts').select()
        setPosts(data)
        console.log(data)
    }
    return(
        <div>
            <input 
            placeholder="title"
            value={title}
            onChange={e=>setPost({...post, title: e.target.value})}
            />
             <input 
            placeholder="content"
            value={content}
            onChange={e=>setPost({...post, content: e.target.value})}
            />
            <button onClick={createPost}>Create Post</button>

            {
                posts.map(post=>(
                    <div key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default SupabaseTest