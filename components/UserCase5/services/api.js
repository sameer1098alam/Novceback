import { getCurrentChecker } from "./auth";

let QUEUE = [
  { applicationId: 200101, fullName: "Ramkumar",  loanType: "Home Loan",     loanAmount: 48000,  submittedAt: Date.now()-86400000,   status: "PENDING_REVIEW" },
  { applicationId: 200102, fullName: "Sita Meda", loanType: "Personal Loan", loanAmount: 250000, submittedAt: Date.now()-86400000*2, status: "PENDING_REVIEW" }
];

let HISTORY = [
  { applicationId: 200001, fullName: "Anil Rao",  loanType: "Vehicle Loan", loanAmount: 780000, decision: "APPROVED", timestamp: Date.now()-86400000*7, checker: "Rakesh T" },
  { applicationId: 200002, fullName: "Meera Shah",loanType: "Home Loan",    loanAmount: 650000, decision: "REJECTED", timestamp: Date.now()-86400000*5, checker: "Rakesh T" }
];

let NOTIFS = [
  { title:"New submission", message:"Application #200102 by Sita Meda is ready for review.", type:"info", ts: Date.now()-3600000*5 },
  { title:"Approved", message:"Application #200001 approved successfully.", type:"success", ts: Date.now()-3600000*20 }
];

const addNotification = (type, title, message) => { NOTIFS.unshift({ type, title, message, ts: Date.now() }); };

export async function getLoans(){ return [...QUEUE]; }
export async function getHistory(){ return [...HISTORY]; }
export async function getNotifications(){ return [...NOTIFS]; }

export async function getLoanById(id){
  const q = QUEUE.find(x=>x.applicationId===id);
  const h = HISTORY.find(x=>x.applicationId===id);
  const base = q || h || {};
  const status = q ? "PENDING_REVIEW" : h ? h.decision : "UNKNOWN";

  return {
    applicationId:id,
    status,
    fullName: base.fullName || "Ramkumar",
    dob:"12/06/1963", gender:"Male", maritalStatus:"Married",
    phone:"+91 9876543210", email:"ram@example.com",
    address:{ current:"Kelambakkam, Chennai", permanent:"Same" },
    loanType: base.loanType || "Home Loan",
    loanAmount: base.loanAmount || 48000, loanDuration:120, purpose:"Flat purchase",
    documents:[
      { name:"ITR_2023.pdf",   tag:"ITR",            url:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
      { name:"Bank_6M.pdf",    tag:"Bank Statement", url:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
      { name:"Offer_Letter.jpg",tag:"Employment",     url:"https://picsum.photos/seed/offer/600/360" }
    ],
    cibil:{ score:768, risk:"Low" },
    makerComment: "Income proofs verified by Maker; confirm employer tenure."
  };
}

export async function approveLoan(id, body){
  const idx = QUEUE.findIndex(x => x.applicationId === id);
  if (idx >= 0) {
    const item = QUEUE.splice(idx,1)[0];
    const checker = getCurrentChecker().name;
    HISTORY.unshift({
      applicationId:item.applicationId, fullName:item.fullName, loanType:item.loanType, loanAmount:item.loanAmount,
      decision:"APPROVED", timestamp:Date.now(), checker, comments: body?.comments || ""
    });
    addNotification("success","Loan approved",`Application #${id} (${item.fullName}) approved.`);
  }
  return { ok:true, message:`Application ${id} approved.` };
}

export async function rejectLoan(id, body){
  if(!body?.comments) return { ok:false, message:"Comments required." };
  const idx = QUEUE.findIndex(x => x.applicationId === id);
  if (idx >= 0) {
    const item = QUEUE.splice(idx,1)[0];
    const checker = getCurrentChecker().name;
    HISTORY.unshift({
      applicationId:item.applicationId, fullName:item.fullName, loanType:item.loanType, loanAmount:item.loanAmount,
      decision:"REJECTED", timestamp:Date.now(), checker, comments: body.comments
    });
    addNotification("info","Loan rejected",`Application #${id} (${item.fullName}) rejected.`);
  }
  return { ok:true, message:`Application ${id} rejected.` };
}


