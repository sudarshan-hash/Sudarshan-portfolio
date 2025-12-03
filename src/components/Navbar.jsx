import React from 'react'
import dayjs from 'dayjs'
import { name, navIcons, navLinks } from '#constants'

function Navbar() {
    return (
        <>
            <nav>
                <div>
                    <img src="/public/images/logo.svg" alt="appele Logo" />
                    <p className=' font-bold'>{ name }</p>

                    <ul>
                        {
                            navLinks.map(navLink => (
                                <li key={navLink.id} >
                                    <p> {navLink.name} </p>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div>
                    <ul>
                        {
                            navIcons.map(item => (<li key={item.id} > <img src={item.img} className=' icon-hover' alt={`icons${item.key}`} /> </li>))
                        }
                    </ul>
                    <time> {dayjs().format("ddd MMM D h:mm A")} </time>
                </div>
            </nav>
        </>
    )
}

export default Navbar