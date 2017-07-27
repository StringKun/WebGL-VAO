  	function loadballObjFile(url)
		{
		    var req = new XMLHttpRequest();
		    req.onreadystatechange = function () { processBallLoadObj(req) };
		    req.open("GET", url, true);
		    req.responseType = "text";
		    req.send(null);
		}
		
		function createBall(objDataIn)
		{
		   if(shaderProgArray[0])
		   {
		      //���������õ�����
          	ball=new ObjObject(gl,objDataIn.vertices,objDataIn.normals,objDataIn.texcoords,shaderProgArray[0]);
           }
		   else
		   {
		      setTimeout(function(){createBall(objDataIn);},10); //��ʱ����createBall����������ֻ����һ�� 
		   }
		}

    function createshadow(objDataIn)
    {
        if(shaderProgArray[1])
        {
            //���������õ�����
            ballshadow=new ShadowObject(gl,objDataIn.vertices,shaderProgArray[1]);
        }
        else
        {
            setTimeout(function(){createshadow(objDataIn);},10); //��ʱ����createBall����������ֻ����һ��
        }
    }
	
		function processBallLoadObj(req)
		{
		    if (req.readyState == 4) 
		    {
		        var objStr = req.responseText;	       
		        var dataTemp=fromObjStrToObjectData(objStr);	
		        createBall(dataTemp);
                createshadow(dataTemp);
		    }
		} 
		//���صذ�ģ��
		function loaddbObjFile(url)
		{
		    var req = new XMLHttpRequest();
		    req.onreadystatechange = function () { processrectLoadObj(req) };
		    req.open("GET", url, true);
		    req.responseType = "text";
		    req.send(null);
		}
		
		function createrect(objDataIn)
		{
		   if(shaderProgArray[0])
		   {
		      //���������õ�����
           //    console.log("!!!");
          rectdb =new ObjObject(gl,objDataIn.vertices,objDataIn.normals,objDataIn.texcoords,shaderProgArray[0]); 
		   }
		   else
		   {
		      setTimeout(function(){createrect(objDataIn);},10); //��ʱ����createBall����������ֻ����һ�� 
		   }
		}
		
		function processrectLoadObj(req)
		{
		    if (req.readyState == 4) 
		    {
		        var objStr = req.responseText;	       
		        var dataTemp=fromObjStrToObjectData(objStr);	
		        createrect(dataTemp);
		    }
		} 