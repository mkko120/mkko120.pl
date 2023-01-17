import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import link from 'next/link'

export default function notfound() {
    return (
        <div className='h-screen w-screen bg-gray-800 text-white flex'>
            <div className='flex flex-col text-center m-auto space-y-5'>
                <span className='text-5xl'>Oops! Page not found.</span>
                <br />
                <span className='text-lg'>Requested site is not available on the server</span>
                <br />
                <span className='text-'>You can always go back to <a href='/' className='font-bold'>homepage <FontAwesomeIcon icon={faHome}/></a></span>
            </div>
        </div>
    )
}