   function MatrixState()
   {
   	  this.mProjMatrix = new Array(16);
   	  this.mVMatrix = new Array(16);
   	  this.currMatrix=new Array(16);
   	  this.mStack=new Array(100);
	  this.cx=0;
	  this.cy=0;
	  this.cz=0;
   	  
   	  //��ȡ���任��ʼ����
   	  this.setInitStack=function()
	    {
	    	this.currMatrix=new Array(16);
	    	setIdentityM(this.currMatrix,0);
	    }
	    
	    //�����任����
	    this.pushMatrix=function()
	    {	    	
	    	this.mStack.push(this.currMatrix.slice(0));
	    }
	    
	    //�ָ��任����
	    this.popMatrix=function()
	    {
	    	this.currMatrix=this.mStack.pop();
	    }
	    
	    //ִ��ƽ�Ʊ任
	    this.translate=function(x,y,z)//������xyz���ƶ�
	    {
	    	translateM(this.currMatrix, 0, x, y, z);
	    }
	    
	    //ִ����ת�任
	    this.rotate=function(angle,x,y,z)//������xyz���ƶ�
	    {
	    	rotateM(this.currMatrix,0,angle,x,y,z);
	    }
	    
	    //ִ�����ű任
	    this.scale=function(x,y,z)//������xyz���ƶ�
	    {
	    	scaleM(this.currMatrix,0,x,y,z) 
	    }
	    
	    //���������
	    this.setCamera=function
	    (
	    		cx,	//�����λ��x
	    		cy,   //�����λ��y
	    		cz,   //�����λ��z
	    		tx,   //�����Ŀ���x
	    		ty,   //�����Ŀ���y
	    		tz,   //�����Ŀ���z
	    		upx,  //�����UP����X����
	    		upy,  //�����UP����Y����
	    		upz   //�����UP����Z����		
	    )
	    {
	      setLookAtM
	      (
	        		this.mVMatrix,0, 
	        		cx,cy,cz,
	        		tx,ty,tz,
	        		upx,upy,upz
	      );
		  this.cx=cx;
		  this.cy=cy;
		  this.cz=cz;
	    }
	    
	    //����͸��ͶӰ����
	    this.setProjectFrustum=function
	    (
	    	left,		//near���left
	    	right,    //near���right
	    	bottom,   //near���bottom
	    	top,      //near���top
	    	near,		//near�����
	    	far       //far�����
	    )
	    {
	    	 frustumM(this.mProjMatrix, 0, left, right, bottom, top, near, far);    	
	    }
	    
	    //��������ͶӰ����
	    this.setProjectOrtho=function
	    (
	    	left,		//near���left
	    	right,    //near���right
	    	bottom,   //near���bottom
	    	top,      //near���top
	    	near,		//near�����
	    	far       //far�����
	    )
	    {    	
	    	orthoM(this.mProjMatrix, 0, left, right, bottom, top, near, far);
	    }  
	    
	    //��ȡ����������ܱ任����
	    this.getFinalMatrix=function()
	    {
	    	var mMVPMatrix=new Array(16);
	    	multiplyMM(mMVPMatrix, 0, this.mVMatrix, 0, this.currMatrix, 0);
	      multiplyMM(mMVPMatrix, 0, this.mProjMatrix, 0, mMVPMatrix, 0);        
	      return mMVPMatrix;
	    } 
	    
	    //��ȡ��������ı任����
	    this.getMMatrix=function()
	    {       
	        return this.currMatrix;
	    }

       this.getViewProjMatrix = function ()
       {
           var mMVPMatrix=new Array(16);
           multiplyMM(mMVPMatrix, 0, this.mProjMatrix, 0, this.mVMatrix, 0);
           return mMVPMatrix;
       }
   }
