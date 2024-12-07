/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import ModalBackground from "../assets/images/ModalBackground.svg"

export default function InputPopUp({ isOpen, onClose, position , CloseModal}) {
    if (!isOpen) return null;

    const handleDragStart = (e) => {
        // Store the current mouse position and state name when dragging starts
        const { clientX, clientY } = e;
        e.dataTransfer.setData("text/plain", JSON.stringify({ startX: clientX, startY: clientY, stateName: "modal" }));
    };

    const handleMouseDown = (e) => {
        e.target.style.cursor = "grabbing"
    }

    return (
        <div
            className="w-[25vw] h-[60vh] flex flex-col cursor-auto"
            style={{ position: 'absolute', top: position.y, left: position.x, userSelect: "none" }}>
            
             {/* Background image */}
             <img src={ModalBackground} className="absolute w-full h-full object-cover" alt="Background" />

            <div draggable
             onDragStart={handleDragStart}
             className="w-[23vw] h-[5vh] z-6 relative"
             onMouseEnter={(e) => { e.target.style.cursor = "grab"; }}
             onMouseDown={handleMouseDown}
             alt="DraggableHeader">
             </div>

             <h1
                className="text-[1.5rem] font-extrabold text-[#BEDC7F] absolute top-0.4 right-2 z-10 cursor-pointer flex items-center justify-center w-[2rem] h-[2rem] text-center mr-1"
                onClick={CloseModal}>X</h1>

            <div className='w-[25vw] h-[60vh] z-10'>

            </div>

           
            
    
        </div>
    );
}    

InputPopUp.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    CloseModal:PropTypes.func,
    position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }),
};