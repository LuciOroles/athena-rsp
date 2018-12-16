function createDivClass(classNm) {
	var d = document.createElement('div');
	    d.classList.add(classNm);
	    return d;
}

/**
* @function 
*@name bordGenerator
* creates a html structure based on the input, having wrapper, number of rows and colums
*@param {string} || {array} columnClass
*@return {dom, logic} having both DOM elements returned and the logical structure of them ease of traversing, this wasn't used as originally intended
*/


const bordGenerator = function (wrapperClass, rowClass, rowNr, columnClass, columnNr) {
	let wrapperStructure= {
		node: null,
		rows : []
	}

	let wrapper = createDivClass(wrapperClass)	;
		wrapperStructure.node = wrapper;
		for(let i=0; i<rowNr; i++) {
			let rowStruct= {
				node: null,
				cols : []
			}
			let row = createDivClass(rowClass);
				rowStruct.node = row;
			for(let c=0; c<columnNr; c++) {
				let col;
			if ( typeof columnClass =='string')	 col= createDivClass(columnClass);
			if ( typeof columnClass =='object')  col= createDivClass(columnClass[c]);  
			  row.appendChild(col);
			  rowStruct.cols.push(col);
			}
			wrapperStructure.rows.push(rowStruct);
			wrapper.appendChild(row);
		}
		return {
			dom : wrapper,
			logic: wrapperStructure
		}
};


export default bordGenerator;