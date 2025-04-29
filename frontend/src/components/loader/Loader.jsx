import './Loader.css'

const Loader = () => {
    return (
        <>
            <div className="main h-screen flex items-center justify-center">
                <div className="loader w-[50px] h-[50px] rounded-[50%] border-4 border-[gray]-500 border-t-[#040509]"></div>
            </div>
        </>
    )
}

export default Loader