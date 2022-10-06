const Background = () => {
    return ( 
        <div>
            <img src={process.env.PUBLIC_URL + "/landing-image.jpg"} alt="" />
            <h1>Hope for all</h1>
            <h3>We believe in empowering africa's daughters for tommorrow</h3>
            <div>
                <button>See the Impact</button>
                <button>Join Us</button>
            </div>
        </div>
     );
}
 
export default Background;