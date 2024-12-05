import PropTypes from 'prop-types';

export default function StateWidget({ state, stateName, position}) {
    

    const handleDragStart = (e) => {
        // Store the current mouse position when dragging starts

        const { clientX, clientY } = e;
        e.dataTransfer.setData("text/plain", JSON.stringify({ startX: clientX, startY: clientY, stateName: stateName}));
    };

  
    return (
        <img
            key={state.id} 
            src={state.src} 
            onDragStart={handleDragStart}
            draggable="true"
            className="w-stateSize h-stateSize" 
            alt="State Image" 
            style={{
                position: 'absolute',
                top: position.y,
                left: position.x,
                cursor: 'grab',
            }}
        />
    );
}

// Prop validation
StateWidget.propTypes = {
    state: PropTypes.shape({
        id: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired
    }).isRequired,
    stateName: PropTypes.string.isRequired,
    position: PropTypes.object.isRequired,
};