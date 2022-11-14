import styled from 'styled-components'

export const Hero = styled.div`

  display: flex;
  justify-content: space-around;
  align-items: center;

  h1 {
    font-size: 50px;
  }    
  
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;
    
    img {
      width: 100%;
      height: auto;
    }
  }                    
`

export const Flow = styled.div`
  padding: 100px 30px;
  background: #5C1A8D;
  color: #fefefe;
  
  .flow-text {
    width: 60%;
    margin: 0 auto;
    
     h1 {
      font-size: 30px;
      text-align: center;
    }  
    
    p {
      text-align: center;
    } 
    
    @media (max-width: 768px) {
      width: 90%;
    }
  }
  
  .flow-details {
    display: grid;
    grid-gap: 30px;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
    align-items: center;
    

    
      @media (max-width: 768px) {
        display: grid;
        grid-template-columns: 1fr;
        
        img {
           width: 100%;
          height: auto;
        }
      }  
    }
  
  @media (max-width: 768px) {
    padding: 100px 12px;
  }               
`

export const Step = styled.div`
  width: 3em;
  height: 3em;
  line-height: 3em;
  text-align: center;
  padding: 5px;
  font-size: 11px;
  background: ${props => props.color};
  border-radius: 50%;
  color: #333;
`

export const WhyContainer = styled.div`
  position: relative;
  h1 {
    position: absolute;
    left: 0;
    top: 40px;
    width: 100%;
    //padding: 70px 0;
  }
  .why {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    justify-items: center;
    
    .why-right {
      padding-top: 160px; 
      padding-bottom: 80px; 
      background: #E5E5E5;
      div {
        width: 40%;
        padding-left: 80px;
        padding-bottom: 40px;
        
        @media (max-width: 768px) {
          width: 90%;
          padding-left: 10px;
        }
      }
      
      @media (max-width: 768px) {
        padding: 60px 0 20px 16px;
      }
    }
    
    .why-left {
      background: rgba(167, 146, 254, 0.07); 
      padding-top: 160px; 
      padding-bottom: 80px; 
      div {
        margin-left: auto;
        margin-right: 0;
        width: 40%;
        padding-right: 70px;
        padding-bottom: 40px;
        
        @media (max-width: 768px) {
          width: 90%;
          padding-right: 10px;
        }
      }
      
      @media (max-width: 768px) {
        padding-bottom: 20px;
      }
    }
    
      @media (max-width: 768px) {
        display: grid;
        grid-template-columns: 1fr;
        
        img {
          width: 10%;
          height: auto;
        }
      }  
  }
  
`
export const Signup = styled.div`
  text-align: center;
  padding: 70px 0;
  background: #F2C94C;
  .signup-content {
    width: 60%;
    margin: 0 auto;
    text-align: center;
    
    @media (max-width: 768px) {
      width: 90%;
    }
    
    input {
      padding: 10px 20px;
      background: #F2C94C;
      border: 2px solid #fefefe;
      
      ::placeholder {
        color: #fefefe;
      }
    }
    
    input:focus {
      border: 2px solid #fefefe;
    }
    
    button {
      background: #233533;
      border-color: #233533;
      padding: 10px 20px;
      color: #fefefe;
      margin-left: 15px;
    }
  }
  
  @media (max-width: 424px) {
    .sub {
      display: grid;
      grid-template-columns: 1fr;
      justify-content: center;
    }
    .sub > * {
      margin-bottom: 12px;
    }
    .sub button {
      margin-left: -1px;
    }
  }
  
`