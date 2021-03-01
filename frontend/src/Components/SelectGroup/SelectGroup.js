import React from 'react';

function SelectGroup({allGroups,selectedGroup,setSelectedGroup}) {
    const handleChangeSelect = (e) => {
        setSelectedGroup(+e.target.value)
    }
    return (
        <div className="select-group">
            <select value={selectedGroup} onChange={handleChangeSelect}>
                {
                    allGroups.map((item,index) => {
                        return <option key={index} value={index}>{item}</option>;
                    })
                }
                
            </select>
        </div>
    );
}

export default SelectGroup;