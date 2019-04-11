const createCanvas =  function () {
    let cvs = document.createElement('canvas');
        cvs.getContext('2d');
        cvs.width=240;
        cvs.height=651;
        cvs.style.border="1px solid #333";

        return cvs;
}



export { createCanvas } 

