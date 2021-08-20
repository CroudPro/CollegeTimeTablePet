import React from 'react';
import PropTypes from 'prop-types';

/**
 * Selector Component For select group
 * @param {Array<number>} allGroups - array of all groups from backend
 * @param {number} selectedGroup - index of current selected group
 * @param {Function} setSelectedGroup - set index of current selected group
 * @return {JSX.Element}
 * @constructor
 */
function SelectGroup({
  allGroups,
  selectedGroup,
  setSelectedGroup,
}) {
  const handleChangeSelect = (e) => {
    setSelectedGroup(+e.target.value);
  };
  return (
    <div className="select-group">
      <select value={selectedGroup} onChange={handleChangeSelect}>
        {
          allGroups.map((item, index) => {
            return <option key={index} value={index}>{item}</option>;
          })
        }

      </select>
    </div>
  );
}

SelectGroup.propTypes = {
  allGroups: PropTypes.arrayOf(PropTypes.number),
  selectedGroup: PropTypes.number,
  setSelectedGroup: PropTypes.func,
};


export default SelectGroup;
