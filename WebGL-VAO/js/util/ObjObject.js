//加载的用于绘制的3D物体
	    function ObjObject
	    (
	       gl,						  //GL上下文
	       vertexDataIn,    //顶点坐标数组
	       vertexNormalIn,   //顶点法向量数组
	       vertexTexCoorIn,	//顶点纹理坐标数组
	       programIn				//着色器程序对象
	    )
	    {
            //加载着色器程序
            this.program=programIn;
            this.ext = gl.getExtension("OES_vertex_array_object");
            //create VAO
            this.vao = this.ext.createVertexArrayOES();
            // bind vao
            this.ext.bindVertexArrayOES(this.vao);

	    	  //接收顶点数据
	    	  this.vertexData=vertexDataIn;
	    	  //得到顶点数量
	    	  this.vcount=this.vertexData.length/3;
	    	  //创建顶点数据缓冲
	    	  this.vertexBuffer=gl.createBuffer();

          gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);
          gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.vertexData),gl.STATIC_DRAW);

            var apos = gl.getAttribLocation(this.program, "aPosition");
            gl.vertexAttribPointer(apos, 3, gl.FLOAT, false, 0, 0);
            //启用顶点数据
            gl.enableVertexAttribArray(apos);

            //接收顶点法向量数据
          this.vertexNormal=vertexNormalIn;
          //创建顶点法向量数据缓冲
	    	  this.vertexNormalBuffer=gl.createBuffer();
	    	  //将顶点法向量数据送入缓冲
          gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexNormalBuffer);
          gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.vertexNormal),gl.STATIC_DRAW);
            var nor = gl.getAttribLocation(this.program, "aNormal");
            gl.vertexAttribPointer(nor, 3, gl.FLOAT, false, 0, 0);
            // 启用法向量数据
            gl.enableVertexAttribArray(nor);

          //接收顶点纹理坐标数据
          this.vertexTexCoor=vertexTexCoorIn;
          //创建顶点纹理坐标缓冲
			this.vertexTexCoorBuffer=gl.createBuffer();
	    	  //将顶点纹理坐标数据送入缓冲
          gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexTexCoorBuffer);
          gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.vertexTexCoor),gl.STATIC_DRAW);
            var tex = gl.getAttribLocation(this.program, "aTexCoor");
            //将顶点纹理坐标数据送入渲染管线
            gl.vertexAttribPointer(tex, 2, gl.FLOAT, false, 0, 0);
            //启用纹理坐标数据
            gl.enableVertexAttribArray(tex);

            this.ext.bindVertexArrayOES(null);
	        this.drawSelf=function(ms,texture)
	        {
                gl.useProgram(this.program);//指定使用某套着色器程序(重要)
		      //送入总矩阵
			  var uMVPMatrixHandle=gl.getUniformLocation(this.program, "uMVPMatrix");   
			  gl.uniformMatrix4fv(uMVPMatrixHandle,false,new Float32Array(ms.getFinalMatrix())); 

              //送入变换矩阵
              var uMMatrixHandle=gl.getUniformLocation(this.program, "uMMatrix");
              gl.uniformMatrix4fv(uMMatrixHandle,false,new Float32Array(ms.currMatrix)); 
              
              //送入光源位置
              var uLightLocationHandle=gl.getUniformLocation(this.program, "uLightLocation");
              gl.uniform3fv(uLightLocationHandle,new Float32Array([lightManager.lx,lightManager.ly,lightManager.lz]));
              
              //送入摄像机位置
              var uCameraHandle=gl.getUniformLocation(this.program, "uCamera");
              gl.uniform3fv(uCameraHandle,new Float32Array([ms.cx,ms.cy,ms.cz]));

                //绑定纹理
                gl.bindTexture(gl.TEXTURE_2D, texture);
                this.ext.bindVertexArrayOES(this.vao);

			  //用顶点法绘制物体
		      gl.drawArrays(gl.TRIANGLES, 0, this.vcount); 
	        }      
	    }