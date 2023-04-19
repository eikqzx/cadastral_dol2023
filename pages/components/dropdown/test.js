import React from 'react'
import DropdownCondoProject from './condoProject';
import DropdownCondoBuild from './condoBuild';
import DropdownCondoRoom from './condoRoom';

export default function Test() {
    const [amphur, setAumphur] = React.useState(null);
    const [condoBulid,setCondoBuild] = React.useState(null);
    const [condoRoom,setCondoRoom] = React.useState(null);
    console.log(amphur, "condoProject");
    console.log(condoBulid,"condoBulid");
    console.log(condoRoom,"condoRoom");
    const _changeAmphur = (event, value) => {
        // console.log(value);
        setAumphur(event.target.value);
    };
    const _changeCondobuild = (event, value) => {
        // console.log(value);
        setCondoBuild(event.target.value);
    };
    const _changeCondoRoom = (event, value) => {
        // console.log(value);
        setCondoRoom(event.target.value);
    };
    return (
        <div>
            <DropdownCondoProject onChange={_changeAmphur} />
            <DropdownCondoBuild condoSeq={amphur} onChange={_changeCondobuild} />
            <DropdownCondoRoom condoSeq={amphur} condoBuildSeq={condoBulid}  onChange={_changeCondoRoom} />
        </div>
    )
}
