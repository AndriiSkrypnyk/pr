function change(){

    var matrix_a_array=[];
    for(var i=0; i<document.getElementsByClassName("a_matrix")[0].rows.length;i++){
        matrix_a_array[i]=[];
        for(var j=0; j<document.getElementsByClassName("a_matrix")[0].rows[0].cells.length; j++) {
            var a =parseInt(document.getElementById("a_matrix"+"_"+(i+1)+"_"+(j+1)).value);
            matrix_a_array[i][j]=a;
        }
    }
    var target_table= document.getElementsByClassName("a_matrix")[0];
    var rowsA=target_table.rows.length;
    var cellsA=target_table.rows[0].cells.length;
    for(var i=0;i<rowsA;i++){
        target_table.deleteRow(0);
    }

    var matrix_b_array=[];
    for(var i=0; i<document.getElementsByClassName("b_matrix")[0].rows.length;i++){
        matrix_b_array[i]=[];
        for(var j=0; j<document.getElementsByClassName("b_matrix")[0].rows[0].cells.length; j++) {
            var a =parseInt(document.getElementById("b_matrix"+"_"+(i+1)+"_"+(j+1)).value);
            matrix_b_array[i][j]=a;
        }
    }
    var target_table= document.getElementsByClassName("b_matrix")[0];
    var rowsB=target_table.rows.length;
    var cellsB=target_table.rows[0].cells.length;
    for(var i=0;i<rowsB;i++){
        target_table.deleteRow(0);
    }

    var target_table= document.getElementsByClassName("out_matrix")[0];
    var rowsOut=target_table.rows.length;
    for(var i=0;i<rowsOut;i++){
        target_table.deleteRow(0);
    }
    window.first="a_matrix";
    window.second="b_matrix";
    window.third="";

    table_generator(rowsB,cellsB,first, "a");
    table_generator(rowsA,cellsA,second, "b");
    var m1= document.getElementsByClassName(first)[0];
    var m2= document.getElementsByClassName(second)[0];

    for(var j=0; j<m2.rows.length; j++){
        for(var i=0; i<m2.rows[0].cells.length;i++){
            var res=document.getElementById(second+"_"+(j+1)+"_"+(i+1));
            var out=matrix_a_array[j][i];
            if(isNaN(out)){
                out="";
            }
            res.value=out;
        }
    }

    for(var j=0; j<m1.rows.length; j++){
        for(var i=0; i<m1.rows[0].cells.length;i++){
            var res=document.getElementById(first+"_"+(j+1)+"_"+(i+1));
            var out=matrix_b_array[j][i];
            if(isNaN(out)){
                out="";
            }
            res.value=out;
        }
    }

    table_generator(rowsB,cellsA,"out_matrix", "c");

    var symb=document.getElementById("a").innerHTML;
    document.getElementById("a").innerHTML=document.getElementById("b").innerHTML;
    document.getElementById("b").innerHTML=symb;

    third=first
    first=second;
    second=third;

    disable_button_a();
    disable_button_b();
}
function mat(){
    var matrix_a= document.getElementsByClassName("a_matrix")[0];
    var matrix_b= document.getElementsByClassName("b_matrix")[0];
    var cellsA=matrix_a.rows[0].cells.length;
    var rowsB=matrix_b.rows.length;
    if(matrix_a.rows[0].cells.length!=matrix_b.rows.length){
        return err(1);
    }

    var matrix_a_array=[];
    for(var i=0; i<matrix_a.rows.length;i++){
		matrix_a_array[i]=[];
        for(var j=0; j<matrix_a.rows[0].cells.length; j++) {
            var a =parseInt(document.getElementById("a_matrix"+"_"+(i+1)+"_"+(j+1)).value);
            if (isNaN(a)){
                document.getElementById("a_matrix"+"_"+(i+1)+"_"+(j+1)).setAttribute("style", "outline:2px red solid");
                return;
            }
            matrix_a_array[i][j]=a;
        }
    }


    var matrix_b_array=[];
    for(var i=0; i<matrix_b.rows.length;i++){
		matrix_b_array[i]=[];
        for(var j=0; j<matrix_b.rows[0].cells.length; j++) {
            var b =parseInt(document.getElementById("b_matrix"+"_"+(i+1)+"_"+(j+1)).value);
            if (isNaN(b)){
                document.getElementById("b_matrix"+"_"+(i+1)+"_"+(j+1)).setAttribute("style", "outline:2px red solid");
                return;
            }
            matrix_b_array[i][j]=b;
        }
    }

    for(var j=0; j<matrix_b.rows[0].cells.length; j++){
 		for(var i=0; i<matrix_a.rows.length;i++){
             var res=0;
 			for (var z=0; z<matrix_b.rows.length; z++){
 				res+=matrix_a_array[i][z]*matrix_b_array[z][j];
 			}
         var out=document.getElementById("out_matrix"+"_"+(i+1)+"_"+(j+1));
         out.value=res;
 		}
 	}
    err(0);
}
function err(power){
    if(power==1){
	    color_ch('left_half','#f6c1c0');
	    document.getElementById("error").style.visibility = "visible";
    }
    else if(power==0){
        color_ch('left_half','#bcbcbc');
    	document.getElementById("error").style.visibility = "hidden";
    }
}
function disable_arrow_button(){
    var matrix_a= document.getElementsByClassName("a_matrix")[0];
    var matrix_b= document.getElementsByClassName("b_matrix")[0];
    if(matrix_a.rows[0].cells.length!=matrix_b.rows.length){
        document.getElementById("e").disabled=true;
        return err(1);
    }
    else {
        document.getElementById("e").disabled=false;
        return err(0);
    }
}
function addDataA(){
    var target_table= document.getElementsByClassName("a_matrix")[0];
    for(var i=0; i<target_table.rows.length; i++) {
        var row=target_table.rows[i];
        var cell=row.insertCell(-1);
        var input = document.createElement("input");
        input.type = "text";
        input.placeholder="a"+(i+1)+","+(target_table.rows[0].cells.length);
        input.id="a_matrix"+"_"+(i+1)+"_"+(target_table.rows[0].cells.length);
        input.setAttribute("onfocus","color_ch('left_half','#5199db')");
        input.setAttribute("onblur","color_ch('left_half','#bcbcbc')");
        cell.appendChild(input);
    }
    disable_button_a();
}
function addData(){
    var target_table= document.getElementsByClassName("b_matrix")[0];
    for(var i=0; i<target_table.rows.length; i++) {
        var row=target_table.rows[i];
        var cell=row.insertCell(-1);
        var input = document.createElement("input");
        input.type = "text";
        input.placeholder="b"+(i+1)+","+(target_table.rows[0].cells.length);
        input.id="b_matrix"+"_"+(i+1)+"_"+(target_table.rows[0].cells.length);
        input.setAttribute("onfocus","color_ch('left_half','#5199db')");
        input.setAttribute("onblur","color_ch('left_half','#bcbcbc')");
        cell.appendChild(input);
    }
    var target_table= document.getElementsByClassName("out_matrix")[0];
    for(var i=0; i<target_table.rows.length; i++) {
        var row=target_table.rows[i];
        var cell=row.insertCell(-1);
        var input = document.createElement("input");
        input.type = "text";
        input.placeholder="c"+(i+1)+","+(target_table.rows[0].cells.length);
        input.id="out_matrix"+"_"+(i+1)+"_"+(target_table.rows[0].cells.length);
        input.setAttribute("onfocus","color_ch('left_half','#5199db')");
        input.setAttribute("onblur","color_ch('left_half','#bcbcbc')");
        input.disabled=true;
        cell.appendChild(input);
    }
    disable_button_b();
}
function addRowB(){
    var target_table= document.getElementsByClassName("b_matrix")[0];
    var row=target_table.insertRow(-1);
        for(var j=0;j<target_table.rows[0].cells.length; j++) {
            var cell=row.insertCell(-1);
            var input = document.createElement("input");
            input.type = "text";
      	    input.placeholder="b"+(target_table.rows.length)+","+(j+1);
            input.id="b_matrix"+"_"+(target_table.rows.length)+"_"+(j+1);
      	    input.setAttribute("onfocus","color_ch('left_half','#5199db')");
      	    input.setAttribute("onblur","color_ch('left_half','#bcbcbc')");
            cell.appendChild(input);
        }
    disable_button_b();
}
function addRow(){
    var target_table= document.getElementsByClassName("a_matrix")[0];
    var row=target_table.insertRow(-1);
        for(var j=0;j<target_table.rows[0].cells.length; j++) {
            var cell=row.insertCell(-1);
            var input = document.createElement("input");
            input.type = "text";
      	    input.placeholder="a"+(target_table.rows.length)+","+(j+1);
            input.id="a_matrix"+"_"+(target_table.rows.length)+"_"+(j+1);
      	    input.setAttribute("onfocus","color_ch('left_half','#5199db')");
      	    input.setAttribute("onblur","color_ch('left_half','#bcbcbc')");
            cell.appendChild(input);
        }
        var target_table= document.getElementsByClassName("out_matrix")[0];
        var row=target_table.insertRow(-1);
            for(var j=0;j<target_table.rows[0].cells.length; j++) {
                var cell=row.insertCell(-1);
                var input = document.createElement("input");
                input.type = "text";
          	    input.placeholder="c"+(target_table.rows.length)+","+(j+1);
                input.id="out_matrix"+"_"+(target_table.rows.length)+"_"+(j+1);
          	    input.setAttribute("onfocus","color_ch('left_half','#5199db')");
          	    input.setAttribute("onblur","color_ch('left_half','#bcbcbc')");
                input.disabled=true;
                cell.appendChild(input);
            }
    disable_button_a();
}
function delRowB(){
    var target_table= document.getElementsByClassName("b_matrix")[0];
    var row=target_table.deleteRow(-1);
    disable_button_b();
}
function delRow(){
    var target_table= document.getElementsByClassName("a_matrix")[0];
    var row=target_table.deleteRow(-1);
    var target_table= document.getElementsByClassName("out_matrix")[0];
    var row=target_table.deleteRow(-1);
    disable_button_a();
}
function delDataA(){
    var target_table= document.getElementsByClassName("a_matrix")[0];
    for(var i=0; i<target_table.rows.length; i++) {
        var row=target_table.rows[i];
        row.deleteCell(-1);
    }
    disable_button_a();
}
function delData(){
    var target_table= document.getElementsByClassName("b_matrix")[0];
    for(var i=0; i<target_table.rows.length; i++) {
        var row=target_table.rows[i];
        row.deleteCell(-1);
    }
    var target_table= document.getElementsByClassName("out_matrix")[0];
    for(var i=0; i<target_table.rows.length; i++) {
        var row=target_table.rows[i];
        row.deleteCell(-1);
    }
    disable_button_b();
}
function disable_button_b(){
    var target_table= document.getElementsByClassName("b_matrix")[0];

    var btn=document.getElementById("del_row");
    if(target_table.rows.length==2){
        btn.disabled=true;
    }
    else{
        btn.disabled=false;
    }
    var btn=document.getElementById("del_d");
    if(target_table.rows[0].cells.length==2){
         btn.disabled=true;
     }
     else{
         btn.disabled=false;
     }

     var btn=document.getElementById("ins_row");
     if(target_table.rows.length==10){
         btn.disabled=true;
     }
     else{
         btn.disabled=false;
     }
    var btn=document.getElementById("ins_d");
     if(target_table.rows[0].cells.length==10){
         btn.disabled=true;
     }
     else{
         btn.disabled=false;
     }
     disable_arrow_button();
}
function disable_button_a(){
    var target_table= document.getElementsByClassName("a_matrix")[0];
    var btn=document.getElementById("del_d");
    if(target_table.rows[0].cells.length==2){
         btn.disabled=true;
     }
     else{
         btn.disabled=false;
     }
     var btn=document.getElementById("del_row");
     if(target_table.rows.length==2){
         btn.disabled=true;
     }
     else{
         btn.disabled=false;
     }
     var btn=document.getElementById("ins_d");
     if(target_table.rows[0].cells.length==10){
          btn.disabled=true;
      }
      else{
          btn.disabled=false;
      }
      var btn=document.getElementById("ins_row");
      if(target_table.rows.length==10){
           btn.disabled=true;
       }
       else{
           btn.disabled=false;
       }
       disable_arrow_button();
}
function table_generator(rowsCount, cellsCount, clss, mname){
  var target_table=document.getElementsByClassName(clss)[0];
    for(var i=0; i<rowsCount; i++) {
        var row=target_table.insertRow(i);
        for(var j=0;j<cellsCount; j++) {
            var cell=row.insertCell(-1);
            var input = document.createElement("input");
            input.type = "text";
      	    input.placeholder=mname+(i+1)+","+(j+1);
            input.id=clss+"_"+(i+1)+"_"+(j+1);
      	    input.setAttribute("onfocus","color_ch('left_half','#5199db')");
      	    input.setAttribute("onblur","color_ch('left_half','#bcbcbc')");
            input.setAttribute("onchange","checkInput(this.value, this.id);")
            if(clss=="out_matrix") {
                input.disabled=true;
            }
            cell.appendChild(input);
        }
    }
}
function generate_table(){
    table_generator(4,3,"out_matrix", "c");
	table_generator(4,2,"a_matrix", "a");
	table_generator(2,3,"b_matrix", "b");
    workB();
}
function color_ch(name, color){
    document.getElementById(name).style.backgroundColor = color;
}
function workA(){
	var btnact=document.getElementById("ins_row").setAttribute('onClick', 'addRow()');
	var btnact=document.getElementById("ins_d").setAttribute('onClick', 'addDataA()');
	var btnact=document.getElementById("del_row").setAttribute('onClick', 'delRow()');
    var btnact=document.getElementById("del_d").setAttribute('onClick', 'delDataA()');
    disable_button_a();
}
function workB(){
	var btnact=document.getElementById("ins_row").setAttribute('onClick', 'addRowB()');
	var btnact=document.getElementById("ins_d").setAttribute('onClick', 'addData()');
	var btnact=document.getElementById("del_row").setAttribute('onClick', 'delRowB()');
	var btnact=document.getElementById("del_d").setAttribute('onClick', 'delData()');
    disable_button_b();
}
function checkInput(a,id) {
    var elem=document.getElementById(id);
    if(isNaN(a)){
        elem.setAttribute("style", "outline:2px red solid");
        elem.value="";
    }
    else{
        elem.removeAttribute("style");
    }
}
