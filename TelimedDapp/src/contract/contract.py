from pyteal import *

def approval_program():

  # Checks to protect against certain logic
  creator = Txn.sender() == App.globalGet(Bytes("Creator"))
  doctor_validator = Txn.sender() == App.globalGet(Bytes("Doctor"))
  pharmacist_validator = Txn.sender() == App.globalGet(Bytes("Pharmacist"))
  insurer_validator = Txn.sender() == App.globalGet(Bytes("Insurer"))

  amount = Btoi(Txn.application_args[1])
  contract_address = Global.current_application_address()
  message = Txn.application_args[2]

  # Check Account balance
  patient_balance = Balance(Txn.sender()) # Balance of patient
  doctor_balance = Balance(Txn.sender())
  pharmacist_balance = Balance(Txn.sender())
  insurer_balance = Balance(Txn.sender())

  # Check Account sependable balance  
  spendable_balance = Balance(Txn.accounts[3]) - MinBalance(Txn.sender())  

  # Account info
  doctor_account = Txn.accounts[1]
  pharmacist_account = Txn.accounts[2]
  insurer_account = Txn.accounts[3]

  on_create = Seq([
    App.globalPut(Bytes("Creator"), Txn.sender()),
    App.globalPut(Bytes("Doctor"), doctor_account ),
    App.globalPut(Bytes("Pharmacist"), pharmacist_account),
    App.globalPut(Bytes("Insurer"), insurer_account),
    Return(Int(1))
  ])

  def paymentTransaction():
    return Seq([
        # Assert(spendable_balance != Int(0)),
        Assert(Global.group_size() == Int(2)),
        Assert(Txn.application_args.length() == Int(2)), 
        Assert(Gtxn[0].type_enum() == TxnType.Payment),
        Assert(Gtxn[0].receiver() == Global.current_application_address()),

        InnerTxnBuilder.Begin(),
        InnerTxnBuilder.SetFields({
          TxnField.type_enum: TxnType.Payment,
          # TxnField.sender : Txn.sender(),
          TxnField.receiver:  Txn.accounts[1],
          TxnField.amount: amount,
          # TxnField.note: note,
          TxnField.fee : Int(0),
          # TxnField.rekey_to: rekeyAddress
        }),
        InnerTxnBuilder.Submit(),
        Approve()
      ])

  # Payment transaction by the patient to book appointment and consult with the doctor
  # Patient deposit some algo with the insurer
  def patient():
    return Seq([
      paymentTransaction(),
      Approve()
    ])

  # Payment transaction by the doctor to the pharmacist
  # Check is the appoved doctor
  def doctor():
    return Seq([
      Assert(doctor_validator),
      paymentTransaction(),
      Approve()
    ])

  # Payment transaction by the pharmacist to the insurance company
  # Check is the approved pharmacist
  def pharmacist():
    return Seq([
      Assert(pharmacist_validator),
      paymentTransaction(),
      Approve()
    ])

       #The following allows for the withdrawl of ALGO's from the contract
  withdrawal = Seq([
      Assert(insurer_validator), #Ensures only liquidity admin can make this call
      InnerTxnBuilder.Begin(),
      InnerTxnBuilder.SetFields({
          TxnField.type_enum: TxnType.Payment,
          TxnField.receiver: Txn.sender(),
          TxnField.amount: amount,
      }),
      InnerTxnBuilder.Submit(),
      Approve(),
  ])

  # Payment transaction by the Insurance company to the pharmacist onbehalf of the  patient
  #Conditions: 
  # Check that the patient has some balance deposited with the insurance company
  # and enough to pay the bills on his behalf
  # Check that the patient authorizes the payment
  # Check is the appoved insurance company
  # Insurer checks to confirm that the patient has deposited some amount and 
  # checks what's left each time he makes payment to the pharmacist

  # Read from an account's local state for an application.
  get_account_balance_of_sender = App.localGetEx(Int(0), App.id(), Bytes("patient_balance")) 
  # balance = Txn.application_args[3]
  # patient_balance = App.globalGet(balance)

  # def balance(): 
  #   return Seq([
  #   Assert(Balance(Txn.accounts[3]) > 0), 
  #   Approve()
  # ])

  # def new_balance(): 
  #   return Seq([
  #   Assert(Balance(Txn.accounts[3]) - MinBalance(Txn.sender()) > 0), 
  #   Approve()
  # ])

  def insurer():
    return Seq([
      Assert(insurer_validator),
      Assert(spendable_balance > Int(0)), 
      # get_account_balance_of_sender,
      # If(get_account_balance_of_sender.hasValue(), Return(Int(1))),
      # App.globalPut(Bytes("PatientBalance"), spendable_balance),
      # App.localPut(Int(0), Bytes("patient_balance"), spendable_balance),
      paymentTransaction(),
      Approve()
  ])

  on_call = Cond(
      [Txn.application_args[0] == Bytes("payment"), paymentTransaction()],
      [Txn.application_args[0] == Bytes("patient"), patient()],
      [Txn.application_args[0] == Bytes("doctor"), doctor()],
      [Txn.application_args[0] == Bytes("pharmacist"), pharmacist()],
      [Txn.application_args[0] == Bytes("insurer"), insurer()],
    )

  program = Cond(
      [Txn.application_id() == Int(0), on_create],
      [Txn.on_completion() == OnComplete.NoOp, on_call],
      # [Txn.on_completion() == OnComplete.OptIn, Return(Int(1))],
      [Txn.on_completion() == OnComplete.UpdateApplication, Return(creator)],
      [Txn.on_completion() == OnComplete.DeleteApplication, Return(creator)],
        [
            Or(
            Txn.on_completion() == OnComplete.OptIn,
            Txn.on_completion() == OnComplete.CloseOut,
            ),
            Reject(),
        ]
    )
  return program

def clear_program():
  return Int(1)

with open("approval.teal", "w") as f :
  compiled = compileTeal(approval_program(), mode=Mode.Application, version=6)
  f.write(compiled)

with open("clear.teal", "w") as f :
  compiled = compileTeal(clear_program(), mode=Mode.Application, version=6)
  f.write(compiled)