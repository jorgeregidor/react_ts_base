

const AccountSection = ({title, icon, iconColor = 'blue', form}) =>{
    return (
        <>
          <div className="flex flex-wrap m-5 p-3 pt-6 ">
            <div className="h-20 w-full md:w-1/2 flex flex-col"> 
              <div className={`flex justify-center text-${iconColor}-600 text-xl`}>
                {icon}
              </div>
              <div className="text-center mt-2">{title}</div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
                <div className="w-full">
                {form}
                </div>
              
            </div>
          </div>
        </>)
}

export default AccountSection