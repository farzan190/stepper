import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const CheckoutStepper = ({stepsConfig=[]}) => {

    const [currentStep, setCurrentStep] = useState(1);
    const [isComplete, setIsComplete] = useState(false);


if(!stepsConfig)
return <> </>;

const handleNext=()=>{
   setCurrentStep((currStep)=>{
      if(currStep===stepsConfig.length) {
          setIsComplete(true);
          return currStep;
      }
      else{

        return currStep+1;
      }


   })
}

const ActiveComponent=  stepsConfig[currentStep-1]?.Component;
  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  };
return(
    <>
    <div className="stepper">  {
    stepsConfig.map((step,index)=>{
    return (
     <div key={step.name} className={`step ${ currentStep > index + 1 || isComplete ? "complete" : "" } ${currentStep === index + 1 ? "active" : ""} `} > 
     <p className="step-number" >  {currentStep > index + 1 || isComplete ? (
                  <span>&#10003;</span>
                ) : (
                  index + 1
                )} </p> 
     <p className="step-name">{step.name}</p>
     </div> )    
        })
    
    }
 <div className="Progress-bar"  
          >
        <div className="progress"  style={{width: `${calculateProgressBarWidth()}%`}}></div>
            
        </div>
    </div>

   
      
    <ActiveComponent/>;
  {!isComplete &&  <button onClick={handleNext}>{currentStep==stepsConfig.length?"finish" :"next"}</button> }
    </>
    
    
    
    )


}


export default CheckoutStepper;