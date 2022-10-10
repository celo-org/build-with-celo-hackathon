const Proposal = () => {
    return ( 
        <div className="flex items-center justify-around mx-5 py-5 bg-gray-200">
            <div >
                <img src={process.env.PUBLIC_URL + "/african_kids.jpg"} alt="" className="h-[200px] w-[300px]" />
            </div>
            <div className="flex flex-col justify-around h-[200px]">
                <h1 className="text-4xl">Accept Donation to  St Lisa school for  Girls</h1>
                <h3 className="font-extrabold">Voting Closed</h3>
                <div className="flex">
                    <h4 className="">Approval:86%</h4>
                    <h4 className="px-2">Against:14%</h4>
                </div>
            </div>
        </div>
     );
}
 
export default Proposal;