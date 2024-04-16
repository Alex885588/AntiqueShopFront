export function Footer() {
    return (
        <footer className="bg-dark text-light py-3 position-absolute bottom-0 w-100">
            <div className="container text-center">
                <span>Copyright © {new Date().getFullYear()} Scopic</span>
            </div>
        </footer>
    )
}