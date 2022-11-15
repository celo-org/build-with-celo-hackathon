import axios from 'axios';
import Link from 'next/link';
import React, {useState, useEffect} from 'react'
import Final from '../../../components/FormComponents/formsteps/Final';
import FormStepper from '../../../components/FormComponents/formsteps/FormStepper';
import StepOne from '../../../components/FormComponents/formsteps/StepOne';
import StepThree from '../../../components/FormComponents/formsteps/StepThree';
import StepTwo from '../../../components/FormComponents/formsteps/StepTwo';
import DropdownIcon from '../../../components/Icons/DropdownIcon';
import UserLayout from '../../../components/UserLayout/Layout'
import { UseContextProvider } from '../../../contexts/NavigationContext';


export const getStaticPaths = async () => {
    const res = await axios.get(`http://127.0.0.1:8080/api/requests`)
    if(res){
        const data = await res.data.data;
  
        const paths = data.map(request => {
            return {
                params: {
                    id: request.id.toString()
                }
            }
        })

        return {
            paths,
            fallback: false

        }
    }
  }


  export const getStaticProps = async (context) =>{
    try{
        const id = context.params.id;
        // const id = (location.pathname.split("/")[3]);
        console.log(id)
        const res = await axios.get('http://127.0.0.1:8080/api/requests/' + id);

        if(res){
            console.log(res, "ress")
            const data = await res.data;

            return {
                props: {data}
            }

        }
    }catch(err){
        return {
            redirect: {
                destination: '/login',
                statusCode: 307
            }
        }

    }
 
  }



const RequestDetail = ({data}) => {
    console.log(data);
    const [fulfillRequest, setfulfillRequest] = useState();
    const [confirmTransfer, setConfirmTransfer] = useState();
    const [successTransfer, setSuccessTransfer] = useState();

    const handlefulfillRequest = () => {
        setfulfillRequest(!fulfillRequest)
    }
    const handleconfirmTransfer = () => {
        setConfirmTransfer(!confirmTransfer)
    }
    const handleSuccessTransfer = () => {
        setConfirmTransfer(false)
        setSuccessTransfer(!successTransfer)
    }



    const [currentStep, setCurrentStep] = useState(1);

    const steps = [
      "Fulfill request",
      "Gather Plastics",
      "Deliver Plastics",
      "Complete",
    ];
  
    const displayStep = (step) => {
      switch (step) {
        case 1:
          return <StepOne handleClick={handleClick}
          currentStep={currentStep}
          steps={steps} 
          data={data}
          
          />;
        case 2:
          return <StepTwo  handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}/>;
        case 3:
          return <StepThree handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}/>;
        case 4:
          return <Final />;
        default:
      }
    };
  
    const handleClick = (direction) => {
      let newStep = currentStep;
  
      direction === "next" ? newStep++ : newStep--;
      // check if steps are within bounds
      newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    };

    return (
        <>
        <UserLayout>


            <div>
                
                <section className='py-12'>
                    <div className='container mx-auto px-6'>

                        <div className='md:px-6 '>




                            <div className='flex items-start w-full py-6 gap-9 flex-col lg:flex-row'>

                                <div className='w-full lg:w-4/12'>
                                    <div className='px-4 py-3 '>
                                            <div className='flex w-full py-4 pb-10 mb-8 items-center'>
                                                <h3 className='h2  mt-3'>Request Details</h3>
                                            </div>

                                        <div className='card shadow-lg rounded-md'>
                                            <div className=''>
                                                <div className='w-full h-56'>
                                                    <img src='/images/marketimage.png' className='w-full h-full object-cover rounded-md'/>
                                                </div>
                                            </div>
                                            <div className=' flex items-start justify-between mt-3 px-5 py-4 flex-col w-full gap-2'>
                                                <div className='flex items-center justify-between w-full'>
                                                    <h4 className='font-semibold text-[#3D4044] text-lg'>{data.title}</h4>
                                                    <p>PET Bottles</p>
                                                </div>

                                                
                                                <div  className='flex items-center justify-between w-full'>
                                                    <div className='flex items-center justify-start gap-2'>
                                                        <img src='/images/location.svg' className=''/>
                                                        <div>
                                                            <p className='text-base text-[#6D747D]'>{data.location && (data.location.name)} {data.location && (data.location.state)}</p>
                                                        </div>
                                                    </div> 

                                                    <h4 className=''>300kg</h4>
                                                </div>
                                                <div className='flex items-start justify-between w-full gap-2'>
                                                    <p className='flex-1 text-xs text-[#878A90]'>{data.description.substring(0, 150)}</p>
                                                        <div className='flex items-end justify-start flex-col gap-1 flex-1'>
                                                            <p className='text-xs'>Request expires in:</p>
                                                            <div>
                                                                <p className='text-base text-[#3D4044] font-semibold'>12d : 24h : 34m : 32s</p>
                                                            </div>
                                                        </div> 

                                                        
                                                    </div>
                                                
                                            </div>
                                        </div>

                                        <div className="mt-5 py-4 relative rounded-full flex-1  items-center grow flex w-full ">



                                            

                                            <div className="rounded-full w-full bg-gray-200 h-2">
                                                
                                                <div className="bg-[#DD7D37] h-2 rounded-full wrapper relative " style={{'width' : '55%'}}>

                                                </div>
                                            </div>

                                            

                                            <div className='h-10 w-10'>
                                                <img src="/images/plastics.svg " className='h-full w-full object-cover'/>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className='w-full lg:w-8/12'>



                                    <div className='px-4 py-3 '>

                                        <div>
                                            <FormStepper steps={steps} currentStep={currentStep} />
                                        </div>
                                        

                                        <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>


                                        {/* First Step */}
                                        {/* <StepOne handlefulfillRequest={handlefulfillRequest}/> */}





                                        {/* Second Step */}
                                        {/* <StepTwo/> */}
                                       







                                        {/* Third Step */}
                                        {/* <StepThree/> */}
                                        






                                        {/* Fourth Step */}
                                        
                                        {/* <Final handleconfirmTransfer={handleconfirmTransfer}/> */}







                                        








                                        








                                    </div>





                                </div>
                            </div>
                    




                        </div>                
                    </div>  
                
                </section>


            </div>







            



            


            </UserLayout>
        </>

    )
}

export default RequestDetail