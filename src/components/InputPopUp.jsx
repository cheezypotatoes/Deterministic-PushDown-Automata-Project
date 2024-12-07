/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';

export default function InputPopUp({ isOpen, onClose, position }) {
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
            onMouseDown={handleMouseDown}
            onMouseEnter={(e) => {e.target.style.cursor = "grab"}}
            draggable
            className="w-[25vw] h-[50vh] bg-[#4D8061] cursor-move"
            onDragStart={handleDragStart}
            style={{ position: 'absolute', top: position.y, left: position.x, userSelect: "none"}}
        >
        </div>
    );
}

InputPopUp.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }),
};
