import PropTypes from 'prop-types';

export default function StateWidget({ state }) {
    

    const handleDragStart = (e) => {
        // Store the current mouse position when dragging starts
        const { clientX, clientY } = e;
        e.dataTransfer.setData("text/plain", JSON.stringify({ startX: clientX, startY: clientY }));
    };

  
    return (
        <img
            key={state.id} 
            src={state.src} 
            onDragStart={handleDragStart}
            draggable="true"
            className="w-stateSize h-stateSize" 
            alt="State Image" 
        />
    );
}

// Prop validation
StateWidget.propTypes = {
    state: PropTypes.shape({
        id: PropTypes.number.isRequired,
        src: PropTypes.string.isRequired
    }).isRequired
};