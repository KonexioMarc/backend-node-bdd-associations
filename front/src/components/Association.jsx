import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { Formik, Field, Form } from 'formik';

export default function Association(props) {
    const { id } = useParams()
    console.log('id params', id)
    let [asso, setAsso] = useState({})

    useEffect(function () {
        fetch('http://localhost:3005/associations/' + id)
            .then(res => res.json())
            .then(asso => {
                console.log('asso', asso)
                setAsso(asso)
            })
    }, [])

    return (
        <div>
            <h1>{asso.name}</h1>
            <h2>{asso.slogan}</h2>
            <p>
                {asso.description}
            </p>
            <Formik
                initialValues={{
                    name: '',
                    message: ''
                }}
                onSubmit={async (values) => {
                    const params = {
                        method: 'POST',
                        headers: new Headers({'content-type': 'application/json'}),
                        body: JSON.stringify({
                            name: values.name,
                            message: values.message,
                            associationId: asso._id,
                        })
                    }
                    fetch('http://localhost:3005/message', params)
                        .then(res => res.json())
                        .then(res => alert('Message Added'))
                }}
            >
                <Form>
                    <label htmlFor="firstName">Name</label>
                    <Field id="name" name="name" placeholder="Name" />

                    <label htmlFor="lastName">Message</label>
                    <Field id="message" name="message" placeholder="Message" />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}