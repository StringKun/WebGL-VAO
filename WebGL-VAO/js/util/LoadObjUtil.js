 	  function ObjectData
  	(
  	  vertexCountIn,verticesIn,texcoordsIn,normalsIn
  	)
  	{  	 
  	  this.vertexCount=vertexCountIn;
  	  this.vertices=verticesIn;
  	  this.texcoords=texcoordsIn;
  	  this.normals=normalsIn;  	  
  	}	
  	
    function fromObjStrToObjectData(objStr)
		{
		  //ԭʼ���������б�--ֱ�Ӵ�obj�ļ��м���
    	var alv=new Array();
    	//������������б�--������֯��
    	var alvResult=[];  
    	//ԭʼ���������б�
    	var alt=new Array();
    	//�����������б�
    	var altResult=[];  
    	//ԭʼ�������б�
    	var aln=new Array();    
    	//���������б�
    	var alnResult=[];     	
    	
    	var lines = objStr.split("\n");
    	
    	for (var lineIndex in lines) 
    	{
        var line = lines[lineIndex].replace(/[ \t]+/g, " ").replace(/\s\s*$/, "");
        if (line[0] == "#")
        {
           continue;
        }

        var array = line.split(" ");
        if (array[0] == "v") 
        {
            alv.push(parseFloat(array[1]));
            alv.push(parseFloat(array[2]));
            alv.push(parseFloat(array[3]));
        }
        else if (array[0] == "vt") 
        {
            alt.push(parseFloat(array[1]));
            alt.push(1.0-parseFloat(array[2]));
        }
        else if (array[0] == "vn") 
        {
            aln.push(parseFloat(array[1]));
            aln.push(parseFloat(array[2]));
            aln.push(parseFloat(array[3]));
        }
        else if (array[0] == "f") 
        {
           if (array.length != 4)
           {
                alert("array.length != 4");
                continue;
           }
           for (var i = 1; i < 4; ++i) 
           {
              var tempArray=array[i].split("/");
              var vIndex=tempArray[0]-1;
              var tIndex=tempArray[1]-1;
              var nIndex=tempArray[2]-1;
              
              alvResult.push(alv[vIndex*3+0]);
              alvResult.push(alv[vIndex*3+1]);
              alvResult.push(alv[vIndex*3+2]);
              
              altResult.push(alt[tIndex*2+0]);
              altResult.push(alt[tIndex*2+1]);
        
              alnResult.push(aln[nIndex*3+0]);
              alnResult.push(aln[nIndex*3+1]);
              alnResult.push(aln[nIndex*3+2]);
           }
        }
      }
      return new ObjectData(alvResult.length/3,alvResult,altResult,alnResult);
		}