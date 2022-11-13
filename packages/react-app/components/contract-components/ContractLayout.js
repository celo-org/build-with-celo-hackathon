import { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useCelo } from "@celo/react-celo";

import {
  ContractFields,
  ContractFuncTypeTag,
} from "@/components/contract-components";

//Sub Components Import
import Box from "@mui/material/Box";

export function ContractLayout({ contractName, contractData }) {
  const [viewFunctions, setViewFunctions] = useState([]);
  const [stateFunctions, setStateFunctions] = useState([]);
  const [contractFunctions, setContractFunctions] = useState([]);
  const { kit, network } = useCelo();
  const [contract, setContract] = useState({});




  useEffect(() => {
    const abi = contractData.abi;
    if (abi) {
      setViewFunctions(
        abi.filter(
          (contract) =>
            contract.type === "function" && contract.stateMutability === "view"
        )
      );

      setStateFunctions(
        abi.filter(
          (contract) =>
            contract.type === "function" &&
            ["nonpayable", "payable"].includes(contract.stateMutability)
        )
      );

      setContractFunctions([...viewFunctions, ...stateFunctions]);

      try {
        const contract = new kit.connection.web3.eth.Contract(
          contractData.abi,
          contractData.address
        );

        setContract(contract);
      } catch (error) {
        cnsole.log(error);
      }
    }
  }, [contractData]);

  useEffect(() => {

  }, []);

  const fetchWages = () => {
    const contracterEle = document.getElementById("ContracterId");
    const contracterSkillEle = document.getElementById("ContracterSkill");
    const hoursEle = document.getElementById("Hours");
    const loaderEle = document.getElementById("loader2");
    loaderEle.style.display="";
    var fetchObj = {};
    fetchObj.type = "ConnectCelo";
    fetchObj.QueryType = "Pay-Construction-Wages";
    fetchObj.ContracterId = contracterEle.value;
    fetchObj.ContracterSkillId = contracterSkillEle.value;
    fetchObj.Hours = parseInt(hoursEle.value);
    let url = "https://chart-api-6httuqd2wq-uc.a.run.app?dbParams=" + JSON.stringify(fetchObj);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        loaderEle.style.display="none";
        document.getElementById("ContracterName").value = data.Name;
        let amountEle = document.querySelector("input[name=amount]");
        var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(amountEle, data.Amount);

        var ev2 = new Event('input', { bubbles: true });
        amountEle.dispatchEvent(ev2);

        let toEle = document.querySelector("input[name=to]");
        var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(toEle, data.Account);

        var ev2 = new Event('input', { bubbles: true });
        toEle.dispatchEvent(ev2);
      });



    //console.log("Amount",finalAmount);
  }

  const fetchSuppliers = () => {
    const supplierEle = document.getElementById("SupplierId");
    const productEle = document.getElementById("Product");
    const quantityEle = document.getElementById("Quantity");
    const loaderEle = document.getElementById("loader1");
    loaderEle.style.display="";
    var fetchObj = {};
    fetchObj.type = "ConnectCelo";
    fetchObj.QueryType = "Pay-Construction-Suppliers";
    fetchObj.SupplierId = supplierEle.value;
    fetchObj.ProductId = productEle.value;
    fetchObj.Quantity = parseInt(quantityEle.value);
    let url = "https://chart-api-6httuqd2wq-uc.a.run.app?dbParams=" + JSON.stringify(fetchObj);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        loaderEle.style.display="none";
        document.getElementById("SupplierName").value = data.Name;
        let amountEle = document.querySelector("input[name=amount]");
        var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(amountEle, data.Amount);

        var ev2 = new Event('input', { bubbles: true });
        amountEle.dispatchEvent(ev2);

        let toEle = document.querySelector("input[name=to]");
        var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(toEle, data.Account);

        var ev2 = new Event('input', { bubbles: true });
        toEle.dispatchEvent(ev2);
      });



    //console.log("Amount",finalAmount);
  }

  const fetchServices = () => {
    const serviceCompanyEle = document.getElementById("ServiceCompanyId");
    const serviceEle = document.getElementById("Service");
    const loaderEle = document.getElementById("loader3");
    loaderEle.style.display="";
    var fetchObj = {};
    fetchObj.type = "ConnectCelo";
    fetchObj.QueryType = "Pay-Construction-Services";
    fetchObj.ServiceCompanyId = serviceCompanyEle.value;
    let url = "https://chart-api-6httuqd2wq-uc.a.run.app?dbParams=" + JSON.stringify(fetchObj);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        loaderEle.style.display="none";
        document.getElementById("ServiceCompanyName").value = data.Name;

        let toEle = document.querySelector("input[name=to]");
        var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(toEle, data.Account);

        var ev2 = new Event('input', { bubbles: true });
        toEle.dispatchEvent(ev2);
      });

      



    //console.log("Amount",finalAmount);
  }
  const fetchWaste = () => {
    const serviceCompanyEle = document.getElementById("ServiceCompanyId");
    const serviceEle = document.getElementById("Service");
    const loaderEle = document.getElementById("loader3");
    loaderEle.style.display="";
    var fetchObj = {};
    fetchObj.type = "ConnectCelo";
    fetchObj.QueryType = "Pay-Construction-Services";
    fetchObj.ServiceCompanyId = "SC1";
    let url = "https://chart-api-6httuqd2wq-uc.a.run.app?dbParams=" + JSON.stringify(fetchObj);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        loaderEle.style.display="none";
        document.getElementById("DisposalServiceCompanyName").value = "Alpha Disposal Services";

        let toEle = document.querySelector("input[name=to]");
        var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(toEle, data.Account);

        var ev2 = new Event('input', { bubbles: true });
        toEle.dispatchEvent(ev2);
      });

      



    //console.log("Amount",finalAmount);
  }

  return (
    <div>
      <h6>
        {contractName} deployed at{" "}
        <a
          target="_blank"
          href={`${network.explorer}/address/${contractData.address}`}
        >
          {contractData.address}
        </a>
      </h6>
      {contractName === "Pay-Construction-Wages" &&
        <div style={{ marginBottom: "10px" }}>
          <input type="text" className="form-control mb-2" id="ContracterId" placeholder="Enter Contracter Id(Celo Account details are populated based on id)" />
          <select className="form-select mb-2" id="ContracterSkill" style={{ marginRight: "10px" }}>
            <option hidden>--Select Contracter Skill Level--</option>
            <option value="Unskilled">Unskilled</option>
            <option value="Skilled">Skilled</option>
            <option value="Specialized">Specialized</option>
          </select>
          <input className="form-control mb-2" id="Hours" type="number" placeholder="Enter number of hours" style={{ marginRight: "10px" }} />
          <input className="btn btn-info mb-2" type="button" id="FetchAmount" value="Fetch Details" onClick={fetchWages} />
          <div class="spinner-border text-info m-2" style={{display:"none"}} role="status" id="loader2">
            <span class="visually-hidden">Loading...</span>
          </div>
          <input type="text" className="form-control mb-2" id="ContracterName" placeholder="Contracter Name" readOnly/>
          <br />
        </div>}
        {contractName === "Pay-Construction-Suppliers" &&
        <div style={{ marginBottom: "10px" }}>
          <input type="text" className="form-control mb-2" id="SupplierId" placeholder="Enter Supplier Id(Celo Account details are populated based on id)" />
          <select className="form-select mb-2" id="Product" style={{ marginRight: "10px" }}>
            <option hidden>--Select Construction Product--</option>
            <option value="Cement">Cement</option>
            <option value="Sand">Sand</option>
            <option value="Stone">Stone</option>
            <option value="Steel">Steel</option>
          </select>
          <input className="form-control mb-2" id="Quantity" type="number" placeholder="Enter quantity in tons" style={{ marginRight: "10px" }} />
          <input className="btn btn-info mb-2" type="button" id="FetchSupplierAmount" value="Fetch Details" onClick={fetchSuppliers} />
          <div class="spinner-border text-info m-2" style={{display:"none"}} role="status" id="loader1">
            <span class="visually-hidden">Loading...</span>
          </div>
          <input type="text" className="form-control mb-2" id="SupplierName" placeholder="Supplier Name" readOnly/>
          <br />
        </div>}
        {contractName === "Pay-Construction-Services" &&
        <div style={{ marginBottom: "10px" }}>
          <input type="text" className="form-control mb-2" id="ServiceCompanyId" placeholder="Enter Service Company Id(Celo Account details are populated based on id)" />
          <select className="form-select mb-2" id="Service" style={{ marginRight: "10px" }}>
            <option hidden>--Select Service--</option>
            <option value="Architecture">Architecture</option>
            <option value="Agreements">Agreements</option>
            <option value="QualityAudits">Quality Audits</option>
          </select>
          <input className="btn btn-info mb-2" type="button" id="FetchServiceAmount" value="Fetch Details" onClick={fetchServices} />
          <div class="spinner-border text-info m-2" style={{display:"none"}} role="status" id="loader3">
            <span class="visually-hidden">Loading...</span>
          </div>
          <input type="text" className="form-control mb-2" id="ServiceCompanyName" placeholder="Service Company Name" readOnly/>
          <br />
        </div>}
        {contractName === "Waste-Disposal" &&
        <div style={{ marginBottom: "10px" }}>
          <input type="date" className="form-control mb-2" id="ServiceCompanyId" placeholder="Enter Date" />
          <select className="form-select mb-2" id="Service" style={{ marginRight: "10px" }}>
            <option hidden>--Type Of Waste--</option>
            <option value="Architecture">Lead</option>
            <option value="Agreements">Asbestos</option>
            <option value="QualityAudits">Plaster Board</option>
            <option value="Architecture">Paint Thinners</option>
            <option value="Agreements">Strippers</option>
            <option value="QualityAudits">Mercury</option>
            <option value="QualityAudits">Fluorescent Bulbs</option>
            <option value="Architecture">Aerosol Cans</option>
            
            
          </select>
          <select className="form-select mb-2" id="Service" style={{ marginRight: "10px" }}>
            <option hidden>--Disposal Method--</option>
            <option value="Architecture">Landfills</option>
            <option value="Agreements">Incenarators</option>
            <option value="QualityAudits">Ocean Dumping</option>
          </select>
          <input type="text" className="form-control mb-2" id="ServiceCompanyId" value="Michael Adams (Chief Supervisor)" placeholder="Authorized By" />
          <input type="text" className="form-control mb-2" id="ServiceCompanyId" value="Jane Smith (Compliance Team)" placeholder="Verified By" />
          <input type="text" className="form-control mb-2" id="ServiceCompanyId" placeholder="Amount In Celo" />
          <input className="btn btn-info mb-2" type="button" id="FetchServiceAmount" value="Fetch Details" onClick={fetchWaste} />
          <div class="spinner-border text-info m-2" style={{display:"none"}} role="status" id="loader3">
            <span class="visually-hidden">Loading...</span>
          </div>
          <input type="text" className="form-control mb-2" id="DisposalServiceCompanyName" placeholder="Disposal Service Company Name" readOnly/>
          <br />
        </div>}
      <div>
        {viewFunctions.map(
          ({ inputs, name, outputs, stateMutability }, key) => {
            return (
              <Accordion key={key}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={"panel" + key + "-content"}
                  id={"panel" + key + "-header"}
                >
                  <Typography mr={1}>{name}</Typography>
                  <ContractFuncTypeTag funcType={stateMutability} />
                </AccordionSummary>
                <AccordionDetails>
                  <ContractFields
                    funcName={name}
                    inputs={inputs}
                    outputs={outputs}
                    contract={contract}
                    stateMutability={stateMutability}
                  />
                </AccordionDetails>
              </Accordion>
            );
          }
        )}
        {stateFunctions.map(
          ({ inputs, name, outputs, stateMutability }, key) => {
            return (
              <Accordion key={key}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={"panel" + key + "-content"}
                  id={"panel" + key + "-header"}
                >
                  <Typography mr={1}>{name}</Typography>
                  <ContractFuncTypeTag funcType={stateMutability} />
                </AccordionSummary>
                <AccordionDetails>
                  <ContractFields
                    funcName={name}
                    inputs={inputs}
                    outputs={outputs}
                    contract={contract}
                    stateMutability={stateMutability}
                  />
                </AccordionDetails>
              </Accordion>
            );
          }
        )}
      </div>
    </div>
  );
}
