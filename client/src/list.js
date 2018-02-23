import React from 'react';


const List= (props)=>{
  var ar=[];
for(var i=0;i<props.listitems.length;i++)
 {
   var data=props.listitems[i];
  ar.push( <a href="#!" className="collection-item"><span className="badge">{-data.ctr}</span>{data.word}</a>);
 }

  return (
    <div className="collection">
     {ar}
    </div>
  );
}

export default List;
