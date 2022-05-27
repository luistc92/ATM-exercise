const ATMDeposit = ({ onChange, isDeposit, validTransaction: isValid }) => {
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input disabled = {!isValid} type="submit" width="200" value="Submit" id="submit-input"></input>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState.toLocaleString()} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    if(event.target.value <= 0) {
      setValidTransaction(false);
      return
    } 
    
    if(atmMode=='Cash Back'&& event.target.value >= totalState){
      setValidTransaction(false);
      return
    }
    setValidTransaction(true);
    setDeposit(Number(event.target.value));
  };
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    //setValidTransaction(false);
    event.preventDefault();
  };

  const handleModeSelect= function(e){
    setAtmMode(e.target.value);
    setIsDeposit( (e.target.value == 'Deposit') ? true : false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>

      <label>Select an action below to continue</label>
      <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
      <option id="no-selection" value=""></option>
      <option id="deposit-selection" value="Deposit">Deposit</option>
      <option id="cashback-selection" value="Cash Back">Cash Back</option>
      </select>

      {atmMode && <ATMDeposit onChange={handleChange} isDeposit={isDeposit} validTransaction = {validTransaction}></ATMDeposit>}
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
