//���ص����ڻ��Ƶ�3D����
	    function ObjObject
	    (
	       gl,						  //GL������
	       vertexDataIn,    //������������
	       vertexNormalIn,   //���㷨��������
	       vertexTexCoorIn,	//����������������
	       programIn				//��ɫ���������
	    )
	    {
            //������ɫ������
            this.program=programIn;
            this.ext = gl.getExtension("OES_vertex_array_object");
            //create VAO
            this.vao = this.ext.createVertexArrayOES();
            // bind vao
            this.ext.bindVertexArrayOES(this.vao);

	    	  //���ն�������
	    	  this.vertexData=vertexDataIn;
	    	  //�õ���������
	    	  this.vcount=this.vertexData.length/3;
	    	  //�����������ݻ���
	    	  this.vertexBuffer=gl.createBuffer();

          gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);
          gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.vertexData),gl.STATIC_DRAW);

            var apos = gl.getAttribLocation(this.program, "aPosition");
            gl.vertexAttribPointer(apos, 3, gl.FLOAT, false, 0, 0);
            //���ö�������
            gl.enableVertexAttribArray(apos);

            //���ն��㷨��������
          this.vertexNormal=vertexNormalIn;
          //�������㷨�������ݻ���
	    	  this.vertexNormalBuffer=gl.createBuffer();
	    	  //�����㷨�����������뻺��
          gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexNormalBuffer);
          gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.vertexNormal),gl.STATIC_DRAW);
            var nor = gl.getAttribLocation(this.program, "aNormal");
            gl.vertexAttribPointer(nor, 3, gl.FLOAT, false, 0, 0);
            // ���÷���������
            gl.enableVertexAttribArray(nor);

          //���ն���������������
          this.vertexTexCoor=vertexTexCoorIn;
          //���������������껺��
			this.vertexTexCoorBuffer=gl.createBuffer();
	    	  //���������������������뻺��
          gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexTexCoorBuffer);
          gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.vertexTexCoor),gl.STATIC_DRAW);
            var tex = gl.getAttribLocation(this.program, "aTexCoor");
            //������������������������Ⱦ����
            gl.vertexAttribPointer(tex, 2, gl.FLOAT, false, 0, 0);
            //����������������
            gl.enableVertexAttribArray(tex);

            this.ext.bindVertexArrayOES(null);
	        this.drawSelf=function(ms,texture)
	        {
                gl.useProgram(this.program);//ָ��ʹ��ĳ����ɫ������(��Ҫ)
		      //�����ܾ���
			  var uMVPMatrixHandle=gl.getUniformLocation(this.program, "uMVPMatrix");   
			  gl.uniformMatrix4fv(uMVPMatrixHandle,false,new Float32Array(ms.getFinalMatrix())); 

              //����任����
              var uMMatrixHandle=gl.getUniformLocation(this.program, "uMMatrix");
              gl.uniformMatrix4fv(uMMatrixHandle,false,new Float32Array(ms.currMatrix)); 
              
              //�����Դλ��
              var uLightLocationHandle=gl.getUniformLocation(this.program, "uLightLocation");
              gl.uniform3fv(uLightLocationHandle,new Float32Array([lightManager.lx,lightManager.ly,lightManager.lz]));
              
              //���������λ��
              var uCameraHandle=gl.getUniformLocation(this.program, "uCamera");
              gl.uniform3fv(uCameraHandle,new Float32Array([ms.cx,ms.cy,ms.cz]));

                //������
                gl.bindTexture(gl.TEXTURE_2D, texture);
                this.ext.bindVertexArrayOES(this.vao);

			  //�ö��㷨��������
		      gl.drawArrays(gl.TRIANGLES, 0, this.vcount); 
	        }      
	    }