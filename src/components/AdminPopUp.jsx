import PropTypes from 'prop-types';



export default function AdminPopUp({isAdminPanelOpen, AdminPopUpPosition, CreateState}) {
    if (!isAdminPanelOpen) return null;


    const handleDragStart = (e) => {
        const { clientX, clientY } = e;
        e.dataTransfer.setData("text/plain", JSON.stringify({ startX: clientX, startY: clientY, stateName: "AdminPopUp" }));
    };

    const handleMouseDown = (e) => {
        e.target.style.cursor = "grabbing"
    }

    function CaseOne() {
        CreateState({"e": "Q1"}, null, {"e": "Z0"})
        CreateState({"0": "Q1","1": "Q2"}, {"0": null,"1": "0"}, {"0": "0","1": null})
        CreateState({"e": "Q3","1": "Q2"}, {"e": "Z0","1": "0"}, null)
        CreateState({"e": "Q3"}, {"e": "Z0"}, null)
    }

    function CaseTwo() {
        CreateState({"e": "Q1"}, null, {"e": "Z0"})
        CreateState({"a": "Q1", "b": "Q2"}, {"a": null,"b": "a"}, {"a": ["a", "a"],"b": null})
        CreateState({"e": "Q3","b": "Q2","a": "Q1"}, {"e": "Z0","b": "a"}, {"a": ["a", "a"]})
        CreateState({"e": "Q3"}, {"e": "Z0"}, null)
    }

    function CaseThree() {
        CreateState({"e": "Q1"}, null, {"e": "Z0"})
        CreateState({"a": "Q1","b": "Q1"," ": "Q2"}, null, {"a": "a","b": "b"})
        CreateState({"e": "Q3","a": "Q2","b": "Q2"}, {"e": "Z0","a": "a","b": "b"}, null)
        CreateState({"e": "Q3"}, {"e": "Z0"}, null)
    }

    function CaseFour() {
        CreateState({"e": "Q1"}, null, {"e": "Z0"})
        CreateState({"(": "Q1",")": "Q2"}, {"(": null,")": "("}, {"(": "(",")": null})
        CreateState({"e": "Q3",")": "Q2","(": "Q1"}, {"e": "Z0",")": "(","(": null}, {"(": "("})
        CreateState({"e": "Q3"}, {"e": "Z0"}, null)
    }

    return (

        <div
            className="w-[25vw]  flex flex-col cursor-auto"
            style={{ position: 'absolute', top: AdminPopUpPosition.y, left: AdminPopUpPosition.x, userSelect: "none" }}>
            
        
            <div draggable
             onDragStart={handleDragStart}
             className="w-[25vw] h-[5vh] z-6 relative bg-[#1e3a29] z-10"
             onMouseEnter={(e) => { e.target.style.cursor = "grab"; }}
             onMouseDown={handleMouseDown}
             alt="DraggableHeader">
             </div>


            
            <div className='z-10 bg-[#4d8061] pt-2 pb-2 flex flex-col gap-[15px]'>
                <h1 className="font-pixelify text-3xl w-full text-center text-[#BEDC7F]">Presentation Mode</h1>

                <h1
                    onClick={CaseOne}
                    className="w-[15vw] font-pixelify text-1xl text-center text-[#BEDC7F] bg-[#112318] border border-[#BEDC7F] rounded p-3 cursor-pointer hover:bg-[#BEDC7F] hover:text-[#112318] mx-auto flex items-center justify-center">
                    0ⁿ1ⁿ
                </h1>

                <h1
                    onClick={CaseTwo}
                    className="w-[15vw] font-pixelify text-1xl text-center text-[#BEDC7F] bg-[#112318] border border-[#BEDC7F] rounded p-3 cursor-pointer hover:bg-[#BEDC7F] hover:text-[#112318] mx-auto flex items-center justify-center">
                    aⁿb²ⁿ
                </h1>

                <h1
                    onClick={CaseThree}
                    className="w-[15vw] font-pixelify text-1xl text-center text-[#BEDC7F] bg-[#112318] border border-[#BEDC7F] rounded p-3 cursor-pointer hover:bg-[#BEDC7F] hover:text-[#112318] mx-auto flex items-center justify-center">
                    Palindrome
                </h1>

                <h1
                    onClick={CaseFour}
                    className="w-[15vw] font-pixelify text-1xl text-center text-[#BEDC7F] bg-[#112318] border border-[#BEDC7F] rounded p-3 cursor-pointer hover:bg-[#BEDC7F] hover:text-[#112318] mx-auto flex items-center justify-center">
                    Balanced Parentheses
                </h1>

                
    
            </div>
                
                

                
           
        </div>
    )
}

AdminPopUp.propTypes = {
    isAdminPanelOpen: PropTypes.bool.isRequired,
    AdminPopUpPosition: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    CreateState: PropTypes.func.isRequired,
  };