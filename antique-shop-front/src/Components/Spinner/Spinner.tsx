export function Spinner() {
    return (
        <div className="container" style={{
            display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"
        }}>
            <div className="spinner-border" role="status" >
                <span className="sr-only"></span>
            </div>
        </ div>
    )
}