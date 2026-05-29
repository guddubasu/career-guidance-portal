import "./ShowScholarship.css";
export default function ShowScholarship({src,name}){
    return (
        <div>
            <div className="container">
            <div className="Name">{name}</div>
            <div className="Explore"><a href={src} style={{textDecoration:"none"}}>Explore</a></div>
            </div>
        </div>
    );
}