import type { NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import me from '../public/me.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSquareEnvelope,
    faShop,
    faHeart
} from '@fortawesome/free-solid-svg-icons'
import { 
    faGithubSquare,
    faGitlabSquare
} from '@fortawesome/free-brands-svg-icons'
import { Suspense } from 'react'
const Home: NextPage = () => {
    return (            
        <>

        <Head>
            <title>mkko120's portfolio</title>
            <meta property="og:url" content="https://mkko120.pl" />
            <meta property="og:type" content="website" />
            <meta
            property="og:title"
            content="mkko120's portfolio"
            />
            <meta name="twitter:card" content="summary" />
            <meta
            property="og:description"
            content="Hi, im mkko120 and I am a Javascript and Java developer! Check out my stuff..."
            />
            <meta property="og:image" content="" />Ŕ
      </Head>


        <div className='h-screen w-screen bg-gray-800 text-white flex overflow-hidden'>
                <div className='text-center m-auto min-h-[50vh]'>
                    <div className='flex justify-around items-end space-x-8'>
                        <a href='https://github.com/mkko120'>
                            <FontAwesomeIcon className='pb-11' icon={faGithubSquare} size="2xl"/>
                        </a>
                        <a href='https://gitlab.com/mkko120'>
                            <FontAwesomeIcon className='pb-11' icon={faGitlabSquare} size="2xl" />
                        </a>
                        <div className='flex flex-col justify-between'>
                            <Image className="m-auto h-80 w-80 bg-gray-600 clip-circle" src={me} alt="my picture" />
                            <span className='text-5xl text-center m-auto pt-3'>Mikołaj Ratajczak</span>
                            <span className='text-xl text-center m-auto pt-3'>(mkko120)</span>
                        </div>

                        <a href="https://fiverr.com/mkko120">
                            <FontAwesomeIcon className='pb-11' icon={faShop} size='2xl' />
                        </a>

                        <a href="mailto://contact@mkko120.pl">
                            <FontAwesomeIcon className='pb-11' icon={faSquareEnvelope} size="2xl" />
                        </a>
                        
                    </div>

                    <div className='text-xl text-center m-auto pt-3'>
                        <p>javascript and java backend developer</p>
                        <p>system admin</p>
                    </div>


                    <div className='text-gray-500 text-xs text-center m-auto p3 fixed bottom-0 left-1/2 -translate-x-2/4'>
                        made with <FontAwesomeIcon icon={faHeart} /> by mkko120.studio
                    </div>
                </div>
            </div>

            </>
        )
    }
    
    export default Home
    