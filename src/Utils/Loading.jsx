const Loading = () => {

    return (
        <div className={`h-[100vh] w-[100vw] flex justify-center items-center bg-slate-300 flex-col`}>
            <p className={`h-20 w-20 border-[7px] rounded-full  border-slate-200 border-t-blue-600 animate-spin`}></p>
            <p className={`text-2xl mt-2 font-extrabold text-slate-500 animate-pulse`}>Loading Page ..</p>
        </div>
    )
}

export default Loading;