const Modal = (props) => {
    const closeModal = () => {
        const element = document.getElementById("modal");
        element.style.display = 'none';
    }

    return (
        <div id="modal" className="hidden fixed left-0 top-0 bg-cyan-200 z-1">
            <p>Please enter your name:</p>
            <input className="rounded-sm"/>
            <div>
            <button onClick={props.onSubmit} className="rounded-sm bg-indigo-200">Submit</button>
            <button className="rounded-sm float-right bg-indigo-200" onClick={closeModal}>Cancel</button>
            </div>
        </div>
    )
}

export default Modal;