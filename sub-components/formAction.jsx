export default function FormAction({
    handleSubmit,
    type='Button',
    action='submit',
    text
}){
    return(
        <>
        {
            type==='Button' ?
            <button
            style={{backgroundColor:'#3C5186', color:'#C6B4CE'}}
                type={action}
                className="group relative w-full flex justify-center py-2 px-4 border  text-sm font-medium rounded-md text-black hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-50 mt-10"
                onSubmit={handleSubmit}
            >

                {text}
            </button>
            :
            <></>
        }
        </>
    )
}