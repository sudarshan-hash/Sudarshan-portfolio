import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react'

const FONT_WEIGHTS = {
    subTitle: { min: 100, max: 400, default: 100 },
    title: { min: 400, max: 900, default: 400 },
}

const setupTextHover = (container, type) => {
    if (!container) return ()=>{} ;

    const letters = container.querySelectorAll("span");
    const { min, max, default: base } = FONT_WEIGHTS[type];

    const animateLetter = (letter, weight, duration = 0.25) => {
        return (
            gsap.to(letter, {
                duration,
                ease: 'power2.out',
                fontVariationSettings: `'wght' ${weight}`
            })
        )
    };

    const handleMouseMove = (event) => {
        const { left } = container.getBoundingClientRect();
        // Mouse Position
        const mouseX = event.clientX - left;

        letters.forEach((letter) => {
            const { left: l, width: w } = letter.getBoundingClientRect();
            const distance = Math.abs(mouseX - (l - left + w / 2))
            const intensity = Math.exp(-(distance ** 2) / 20000)

            animateLetter( letter, min + ( max - min ) + intensity )
        })
    }

    const handleMouseLeave = (event)=>{
        letters.forEach( (letter)=> animateLetter(letter, base, 0.3) )
    }

    container.addEventListener( "mousemove", handleMouseMove )
    container.addEventListener( "mouseleave", handleMouseLeave )

    return ()=>{
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
    }
}



const renderText = (text, className, baseWeight = 400) => {
    return [...text].map((char, index) => (
        <span
            key={index}
            className={className}
            // produce a string like: "'wght' 400" — proper axis name and quoting
            style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
        >
            {char === ' ' ? '\u00A0' : char}
        </span>
    ))
}

function Welcome() {

    const title = useRef(null)
    const subTitle = useRef(null)

    useGSAP( ()=>{
        const titleCleanup = setupTextHover( title.current, 'title' )
        const subTitleCleanup = setupTextHover( subTitle.current, 'subTitle' )

        return ()=> {
            titleCleanup();
            subTitleCleanup();
        }
    }, [] )

    return (
        <section id='welcome' >

            <p ref={subTitle}> {renderText("Hey, I'm Sudarshan Welcome to my", "text-3xl font-georama", 100)} </p>
            <h1 ref={title} className='mt-7' > {renderText("portfolio", "text-9xl italic font-georama")}</h1>

            <div className=' small-screen' >
                <p>This portfolio is designed for desktop/tablet screens only
                    <code className=' text-red-400' > (open in desktop view) </code>
                </p>

            </div>
        </section>
    )
}

export default Welcome