import React from "react";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import Borrow from "./borrow/Borrow";
import Home from "./home/Home";
import Token from "./home/Token";
import Mobile from "./customer/onboarding/Mobile";
import VerifyNumber from "./customer/onboarding/VerifyNumber";
import ChooseLanguage from "./customer/onboarding/ChooseLanguage";
import LoadingScreen from "./customer/onboarding/LoadingScreen";
import LocationPermission from "./customer/onboarding/LocationPermission";

import SignIn from "./user/SignIn";
import DashboardMain from "./user/DashboardMain";
import Logout from "./user/Logout";
import DashboardRepayment from "./user/DashboardRepayment";
import LoanStatement from "./user/LoanStatement";
import DashboardReview from "./user/DashboardReview";
import LandingPage from "./investor/LandingPage";
import CompanyInfo from "./investor/CompanyInfo";
import KYC from "./investor/KYC";
import Wallet from "./investor/Wallet";
import Dashboard from "./investor/Dashboard";
import Disbursement from "./investor/Disbursement";
import Welcome from "./customer/onboarding/Welcome";
import Docs from "./customer/onboarding/Docs";
import PanOption from "./customer/onboarding/PanOption";
import PanProof from "./customer/onboarding/PanProof";
import PanUpload from "./customer/onboarding/panProofComponents/PanUpload";
import BusinessProof from "./customer/onboarding/BusinessProof";
import BusinessOption from "./customer/onboarding/BusinessOption";
import Borrower from "./borrower/Borrower";
import Drawdown from "./borrower/Drawdown";
import LoadApp from "./home/LoadApp";
import AuditorDashboard from "./auditor/AuditorDashboard";
import LoanForm from "./pages/LoanForm/LoanForm";
import OpportunityDetails from "./pages/OpportunityDetails/OpportunityDetails";
import OpportunityPage from "./pages/OpportunityDetails/OpportunityPage";
import Test from "./pages/LoanForm/Test";
import InvestorDashboard from "./pages/Investor/InvestorDashboard";
import ApprovedOpportunities from "./pages/Investor/ApprovedOpportunities";
import Repayment from "./borrower/Repayment";
import Withdrawal from "./pages/Investor/Withdrawal";
import ToolTest from "./tools/ToolTest";
import BorrowerDashboard from "./pages/Borrower/BorrowerDashboard";
import Overview from "./pages/Borrower/Overview";
import BorrowList from "./pages/Borrower/BorrowList";
import InvestorDashboardNew from "./pages/Investor/InvestorDashboardNew";

import InvestorOverview from "./pages/Investor/InvestorOverview";
import Invest from "./pages/Investor/Invest";
import Withdraw from "./pages/Investor/Withdraw";
import ViewPool from "./pages/Investor/ViewPool";
import UnderwriterDashboard from "./pages/Underwriters/UnderwriterDashboard";
import BorrowRequest from "./pages/Underwriters/BorrowRequest";
import PoolDetails from "./pages/Underwriters/PoolDetails";
import ApprovalHistory from "./pages/Underwriters/ApprovalHistory";
import Transactions from "./pages/Investor/Transactions";
import ViewSeniorPool from "./pages/Investor/ViewSeniorPool";
import Transaction from "./pages/Borrower/Transaction";
import BorrowerProfile from "./pages/Borrower/BorrowerProfile";
import EditBorrowerProfile from "./pages/Borrower/EditBorrowerProfile";
import UnderwriterQueries from "./pages/Borrower/UnderwriterQueries";
import QueriesPoolDetails from "./pages/Borrower/QueriesPoolDetails";

const Paths = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pool" element={<Home />} />
        <Route path="/borrow" element={<Borrow />} />
        <Route path="/token" element={<Token />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/sign" element={<DashboardMain />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/info" element={<CompanyInfo />} />
        <Route path="/info/:id" element={<CompanyInfo />} />
        <Route path="/kyc" element={<KYC />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/disbursement" element={<Disbursement />} />
        <Route path="/sale" element={<PanProof />} />
        <Route path="/pan" element={<PanUpload />} />
        <Route path="/mobile" element={<Mobile />} />
        <Route path="/VerifyNumber" element={<VerifyNumber />} />
        <Route path="/Borrower" element={<Borrower />} />
        <Route path="/drawdown/:id" element={<Drawdown />} />
        <Route path="/repayment/:id" element={<Repayment />} />
        <Route path="/withdrawal/:id" element={<Withdrawal />} />
        <Route path="/LoadApp" element={<LoadApp />} />
        <Route path="/auditor" element={<AuditorDashboard />} />
        <Route path="/loan-form" element={<LoanForm />} />
        <Route path="/test" element={<Test />} />
        <Route path="/opportunities" element={<OpportunityPage />} />
        <Route
          path="/opportunity-details/:id"
          element={<OpportunityDetails />}
        />
        <Route path="/loan-details/:id" element={<ApprovedOpportunities />} />
        <Route path="/investor-dashboard" element={<InvestorDashboard />} />

        <Route path="/investor-dashboardN" element={<InvestorDashboardNew />}>
          <Route index element={<InvestorOverview />} />
          <Route path="invest" element={<Invest />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="transaction" element={<Transactions />} />
          <Route path="viewPool" element={<ViewPool />} />
          <Route path="viewSeniorPool" element={<ViewSeniorPool />} />
        </Route>

        <Route path="/underwriterDashboard" element={<UnderwriterDashboard />}>
          <Route index element={<BorrowRequest />} />
          <Route path="poolDetail" element={<PoolDetails />} />
          <Route path="approvalHistory" element={<ApprovalHistory />} />
        </Route>
        <Route path="/transaction" element={<Transaction />} />
        {/* <Route path="/transaction-history" element={<TransactionHistory />} /> */}
        <Route path="/toolTest" element={<ToolTest />} />

        <Route path="/borrower_dashboard" element={<BorrowerDashboard />}>
          <Route index element={<Overview />}></Route>

          <Route path="borrow_list" element={<BorrowList />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="borrower_profile" element={<BorrowerProfile />} />
          <Route path="underwriterQueries" element={<UnderwriterQueries />} />
          <Route path="queriesPoolDetail" element={<QueriesPoolDetails />} />

          <Route path="edit_profile" element={<EditBorrowerProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Paths;
