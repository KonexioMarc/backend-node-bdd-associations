import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
export default function Home() {

    let [assos, setAssos] = useState([])

    useEffect( () => {
        fetch('http://localhost:3005/associations')
            .then(res => res.json())
            .then(res => {
                setAssos(res)
            })
    }, [])

    return (
        <div>
            {assos.map(a => {
                return (
                    <Link to={`/association/${a._id}`}>
                        <h1> {a.name} </h1>
                        <p> {a.description} </p>
                    </Link>
                )
            })}
            Coucou c'est la home
        </div>
    )
}