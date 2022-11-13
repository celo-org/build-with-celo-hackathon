import { BsPlusLg } from 'react-icons/bs'

//
import { setGlobalState } from '../../store'

const AddButton = () => {
    return (
        <div className="fixed right-10 bottom-10 flex space-x-2 justify-center">
            <button 
              type='button'
              onClick={() => setGlobalState('modal', true)}
              className="bg-red-500 text-white rounded-full p-4">
                <BsPlusLg className='font-bold' size={20}/>
            </button>
        </div>
    )
}

export default AddButton