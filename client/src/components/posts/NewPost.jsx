import { useContext, useState } from 'react'
import { Button, Form, FormInput, Label } from 'semantic-ui-react'
import AppContext from '../../context/AppContext'

const NewPost = () => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const { addPost } = useContext(AppContext)

    const handleSubmit = async (event) => {
        event.preventDefault()

        try{
            setLoading(true)

            if(title === '') {
                setError(true)
                setLoading(false)
                return
            }
            await addPost(title)
            setLoading(false)
            setError(false)

        }catch(error){
            console.log(error)
            setLoading(false)
        }finally{
            setTitle('')
        }
    }

    return(
        <section>
            <p className="font-semibold text-xl px-2">Create a Post</p>
            <div className="container mx-auto my-2 w-1/2">
                <Form onSubmit={handleSubmit}>
                    <FormInput
                        label='Title'
                        placeholder="Ex. New Post"
                        onChange={(event) => setTitle(event.target.value)}
                        value={title}
                    />
                    {error && <Label color='red' pointing='above'>Please enter a title</Label>}
                    <div className='w-full mx-auto my-3'>
                        <Button loading={loading} fluid type='submit' content='Create Post' color={'blue'}/>
                    </div>
                </Form>
            </div>        
        </section>
    )
}

export default NewPost