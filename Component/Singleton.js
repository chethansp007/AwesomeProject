import React, { Component } from 'react';

class ErrorClass {
	 errorString = "";
	 
	 constructor() {
	 	return this;
	 }
}

module.exports = ErrorClass;


var Intelligence  = require('intelligence-react-native');
var customData = require('./IntelligenceConfiguration.json');


let instance = null;

class Singleton{  


    intelligence = null;  

    authToken = null;

    constructor() {

        if(!instance){
              instance = this;
        }
        
        return instance;
      }

      authenticate(username,password,callback){

           intelligence = new Intelligence(customData);
           intelligence.authenticate(username.toLowerCase(), password, false, function(err, token){
           
            if (err) {
                callback(err,token);
            }
            else
            {
              instance.authToken = token;
              callback(err,instance.authToken);   
            }
          });          
        }

      initlizeIntelligence(callback){
      
          debugger;
        intelligence = new Intelligence(customData);
        
        intelligence.authenticate(function(err, token) 
                                            {
                                                if(err)
                                                {                                                     
                                                     callback(err,token);
                                                }
                                                else
                                                {
                                                     instance.authToken = token;
                                                     callback(err,instance.authToken);                                            
                                                }     
                                            }
               );
    }

    logout(){
          intelligence = null;
          authToken = null;
          instance = null;
    } 
    

   postEvent(eventname,metadata,callback){
       
        if (instance.authToken != undefined){

	        instance.authToken.now(eventname,metadata,()=>{
              callback(null);
           }); 
        }
        else{

        	let error = new ErrorClass();
        	error.errorString = "Auth token is empty!  Please initialize Intelligence first."; 		
        	callback(error)
        }
  }
}

module.exports = Singleton;