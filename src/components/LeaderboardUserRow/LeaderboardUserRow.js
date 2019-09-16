import React from 'react';

const LeaderboardUserRow = (props) => {

  function bagCounter(bagId) {
    let counter = 0
    props.user.bagged.forEach(element => {
      if(element === bagId){
        counter++
      }
    });
    return counter;
  }

  return (
    <tr key={props.user.Name}>
      <td className="headColumn">{props.user.Name}</td>
      <td>{Number(props.user['Total Buck Score'])}</td>
      <td>{props.user['Total Points']}</td>
      <td>{props.user['Total Kills']}</td>
      <td>{props.user['Total Weight']}</td>
      <td>{bagCounter(1)}</td>
      <td>{bagCounter(2)}</td>
      <td>{bagCounter(3)}</td>
      <td>{bagCounter(4)}</td>
      <td>{bagCounter(5)}</td>
      <td>{bagCounter(6)}</td>
      <td>{bagCounter(7)}</td>
      <td>{bagCounter(8)}</td>
      <td>{bagCounter(9)}</td>
      <td>{bagCounter(10)}</td>
      <td>{bagCounter(11)}</td>
      <td>{bagCounter(12)}</td>
      <td>{bagCounter(13)}</td>
      <td>{bagCounter(14)}</td>
      <td>{bagCounter(15)}</td>
    </tr>
  )
}

export default LeaderboardUserRow;